import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Save, Search, Image as ImageIcon, Download, Upload, AlertCircle } from 'lucide-react';
import ImageUploader from './ImageUploader';

const AdminImageManager = ({ images, onDelete }) => {
  if (!images || images.length === 0) {
    return <p>No images to display.</p>;
  }

  return (
    <div className="image-list-view grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div className="col-span-4 flex items-center justify-center">
        <ImageUploader 
                   images={[]} 
                   onImagesChange={(newImages) => onChange('images', newImages)} 
                   multiple={true}
                 />
      </div>
      {images.map((image, index) => (
        <div key={image.id || index} className="image-item rounded-lg overflow-hidden shadow-sm relative group">
          <img
            src={image.url}
            alt={image.alt || `Image ${index + 1}`}
            className="w-full h-48 object-cover"
          />
          {image.caption && (
            <p className="p-2 text-sm text-gray-600 truncate" style={{ display: 'none' }}>{image.caption}</p>
          )}
          <button
            onClick={() => onDelete(image.id)}
            className="absolute top-2 right-2 bg-white text-white p-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-60"
            aria-label={`Delete image ${image.alt || `Image ${index + 1}`}`}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminImageManager;
