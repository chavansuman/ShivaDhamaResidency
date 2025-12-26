
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon, Trash2, Loader2, Plus, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { uploadFile } from '@/lib/storage';

const ImageUploader = ({ images = [], onImagesChange, label = "Images", multiple = true }) => {
  const fileInputRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const { toast } = useToast();

  // Ensure images is always an array for rendering
  const displayImages = Array.isArray(images) ? images : (images ? [images] : []);

  const handleUrlSubmit = () => {
    const url = urlInput.trim();
    if (!url) return;

    if (!url.match(/^https?:\/\/.+/)) {
        toast({
            title: "Invalid URL",
            description: "Please enter a valid HTTP/HTTPS URL.",
            variant: "destructive"
        });
        return;
    }

    if (!multiple) {
        onImagesChange([url]);
    } else {
        onImagesChange([...displayImages, url]);
    }
    
    setUrlInput('');
    toast({ title: "Image URL added" });
  };

  const handleUrlKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUrlSubmit();
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsProcessing(true);
    const newUrls = [];
    let errorCount = 0;

    try {
      for (const file of files) {
        // Validation
        if (file.size > 5 * 1024 * 1024) { 
          toast({ 
              title: "File too large", 
              description: `${file.name} is larger than 5MB.`,
              variant: "destructive" 
          });
          errorCount++;
          continue;
        }

        if (!file.type.startsWith('image/')) {
          toast({
            title: "Invalid file type",
            description: `${file.name} is not an image.`,
            variant: "destructive"
          });
          errorCount++;
          continue;
        }
        
        try {
          const publicUrl = await uploadFile(file);
          if (publicUrl) {
              newUrls.push(publicUrl);
          }
        } catch (err) {
          console.error("Upload error details:", err);
          errorCount++;
        }
      }

      if (newUrls.length > 0) {
        if (!multiple) {
          // Replace existing for single mode
          onImagesChange([newUrls[newUrls.length - 1]]);
        } else {
          // Append for multiple mode
          onImagesChange([...displayImages, ...newUrls]);
        }
        toast({ 
            title: "Upload Successful", 
            description: `Uploaded ${newUrls.length} image(s).` 
        });
      } else if (errorCount > 0) {
          toast({
            title: "Upload Failed",
            description: "Could not upload selected files. Check console for details.",
            variant: "destructive"
          });
      }

    } catch (error) {
      console.error("Batch upload error:", error);
      toast({ title: "Error", description: "Something went wrong during upload.", variant: "destructive" });
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (index) => {
    const newImages = displayImages.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      {label && <Label>{label}</Label>}
      
      {/* Upload Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-grow flex gap-2" style={{ display: 'none' }}>
            <div className="relative flex-grow">
                <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                    placeholder="Paste image URL..." 
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={handleUrlKeyDown}
                    className="pl-9"
                />
            </div>
            <Button 
                type="button" 
                variant="secondary"
                onClick={handleUrlSubmit}
                disabled={!urlInput}
            >
                <Plus className="w-4 h-4" />
            </Button>
        </div>
        
        <div className="flex-shrink-0">
             <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/png, image/jpeg, image/jpg, image/webp" 
                multiple={multiple}
                onChange={handleFileUpload}
            />
            <Button 
                type="button" 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
                className="w-full sm:w-auto"
            >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" /> Upload Files
                  </>
                )}
            </Button>
        </div>
      </div>

      {/* Preview Grid */}
      {displayImages.length > 0 ? (
        <div className={`grid gap-4 mt-4 ${multiple ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5' : 'grid-cols-1 md:grid-cols-2 max-w-sm'}`}>
          {displayImages.map((img, index) => (
            <div key={index} className="relative group bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm aspect-square flex items-center justify-center">
              <img 
                src={img} 
                alt={`Preview ${index + 1}`} 
                className="w-full h-full object-cover" 
                onError={(e) => {e.target.src = "https://via.placeholder.com/150?text=Error"}}
              />
              
              <div className="absolute top-1 right-1 z-10">
                 <Button 
                    type="button" 
                    variant="destructive" 
                    size="icon" 
                    onClick={() => removeImage(index)}
                    className="h-7 w-7 opacity-90 hover:opacity-100 shadow-sm"
                    title="Remove image"
                 >
                    <Trash2 className="w-3 h-3" />
                 </Button>
              </div>

              {!multiple && (
                <div className="absolute bottom-0 inset-x-0 bg-black/60 py-1 text-center z-10">
                    <span className="text-white text-[10px] uppercase font-medium">Selected</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/50 text-gray-400">
            <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
            <span className="text-sm">No images selected</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
