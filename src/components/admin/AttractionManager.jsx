
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, MapPin } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

const AttractionManager = ({ attractions = [], onChange }) => {
  const handleAdd = () => {
    const newAttractions = [
      ...attractions,
      { 
        name: 'New Place', 
        distance: '0 km', 
        image: 'https://images.unsplash.com/photo-1596436889106-11843372277f?w=800&q=80',
        alt: 'Attraction Image' 
      }
    ];
    onChange(newAttractions);
  };

  const handleRemove = (index) => {
    const newAttractions = attractions.filter((_, i) => i !== index);
    onChange(newAttractions);
  };

  const updateAttraction = (index, field, value) => {
    const newAttractions = [...attractions];
    newAttractions[index] = { ...newAttractions[index], [field]: value };
    onChange(newAttractions);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {attractions.map((attraction, index) => (
          <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-6 relative group">
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-4 right-4 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemove(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Place Name</Label>
                  <Input 
                    value={attraction.name}
                    onChange={(e) => updateAttraction(index, 'name', e.target.value)}
                    placeholder="e.g. Mysuru Palace"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Distance / Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                    <Input 
                      className="pl-9"
                      value={attraction.distance}
                      onChange={(e) => updateAttraction(index, 'distance', e.target.value)}
                      placeholder="e.g. 4.5 km"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                   <Label>Alt Text (SEO)</Label>
                   <Input 
                     value={attraction.alt || ''}
                     onChange={(e) => updateAttraction(index, 'alt', e.target.value)}
                     placeholder="Describe the image for SEO"
                   />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Attraction Image</Label>
                <div className="bg-white p-2 rounded-lg border border-gray-200">
                    <ImageUploader 
                        images={attraction.image ? [attraction.image] : []}
                        onImagesChange={(newImages) => updateAttraction(index, 'image', newImages.length ? newImages[0] : '')}
                        multiple={false}
                        label=""
                    />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={handleAdd} className="w-full bg-maroon hover:bg-maroon-dark text-white border-dashed border-2 border-white/20">
        <Plus className="w-4 h-4 mr-2" /> Add New Attraction
      </Button>
    </div>
  );
};

export default AttractionManager;
