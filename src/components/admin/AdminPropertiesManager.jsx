
import React, { useState, useRef } from 'react';
import { Plus, Edit, Trash2, Save, Search, Image as ImageIcon, Download, Upload, AlertCircle } from 'lucide-react';
import { useProperties } from '@/lib/useProperties';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ImageUploader from './ImageUploader';

const AdminPropertiesManager = () => {
  const { properties, updateProperty, addProperty, deleteProperty, setProperties } = useProperties();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProperty, setEditingProperty] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, propertyId: null, propertyTitle: '' });
  const fileImportRef = useRef(null);

  const filteredProperties = properties.filter(p => 
    (p.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
    (p.id?.toString().toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const handleEdit = (property) => {
    setEditingProperty({
      ...property,
      features: property.features || {},
      amenities: property.amenities || [],
      images: property.images || [],
      virtualTour: property.virtualTour || { rooms: [], externalLink: '' }
    });
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    setEditingProperty({
      title: 'New Property',
      bhk: '2BHK',
      floor: 'Ground Floor',
      rent: 15000,
      deposit: 150000,
      maintenance: 1000,
      area: 1000,
      carpetArea: 800,
      bathrooms: 2,
      status: 'Available',
      amenities: [],
      features: { 
        waterSupply: 'Kaveri water',
        petAllowed: 'No',
        balcony: 'No',
        utility: 'Yes',
        furnishing: 'Semi-Furnished',
        facing: 'East'
      },
      images: [],
      virtualTour: { rooms: [], externalLink: '' },
      roomAreas: []
    });
    setIsAddingNew(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (isAddingNew) {
        await addProperty(editingProperty);
        toast({ title: "Property Added", description: "New property has been created in the database." });
      } else {
        await updateProperty(editingProperty);
        toast({ title: "Changes Saved", description: "Property details updated successfully." });
      }
      setEditingProperty(null);
      setIsAddingNew(false);
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to save property. Please try again.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClick = (property) => {
    setDeleteConfirmation({
      isOpen: true,
      propertyId: property.id,
      propertyTitle: property.title
    });
  };

  const confirmDelete = async () => {
    if (deleteConfirmation.propertyId) {
      await deleteProperty(deleteConfirmation.propertyId);
      toast({ title: "Property Deleted", description: "The property has been permanently removed.", variant: "destructive" });
    }
    setDeleteConfirmation({ isOpen: false, propertyId: null, propertyTitle: '' });
  };

  const handleChange = (field, value) => {
    setEditingProperty(prev => ({ ...prev, [field]: value }));
  };
  
  const handleFeatureChange = (key, value) => {
    setEditingProperty(prev => ({
      ...prev,
      features: {
        ...(prev.features || {}),
        [key]: value
      }
    }));
  };

  const handleWaterSupplyChange = (checked, option) => {
    setEditingProperty(prev => {
      let currentSupply = prev.features?.waterSupply || "";
      // Split by +, remove extra spaces, remove empty strings
      let currentOptions = currentSupply.split("+").map(s => s.trim()).filter(Boolean);
      
      if (checked) {
        // Add only if not already present (case insensitive check)
        const exists = currentOptions.some(existing => existing.toLowerCase() === option.toLowerCase());
        if (!exists) {
          currentOptions.push(option);
        }
      } else {
        // Remove option (case insensitive)
        currentOptions = currentOptions.filter(item => item.toLowerCase() !== option.toLowerCase());
      }
      
      return {
        ...prev,
        features: {
          ...(prev.features || {}),
          waterSupply: currentOptions.join(" + ")
        }
      };
    });
  };

  const handleFloorChange = (value) => {
    const floorMap = {
      'Ground Floor': 0,
      'First Floor': 1,
      'Second Floor': 2,
      'Third Floor': 3
    };
    handleChange('floor', value);
    handleChange('floorNumber', floorMap[value] ?? 0);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(properties, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `properties_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({ title: "Export Successful", description: "Backup downloaded." });
  };

  const handleImportClick = () => {
    if (window.confirm("Warning: Importing data will OVERWRITE all current properties. This cannot be undone. Do you want to continue?")) {
        fileImportRef.current?.click();
    }
  };

  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
        try {
            const importedData = JSON.parse(event.target.result);
            if (Array.isArray(importedData)) {
                setProperties(importedData);
                toast({
                  title: "Import Loaded",
                  description: "Data loaded. Save individual changes to persist.",
                });
            }
        } catch (err) {
            console.error(err);
            toast({ title: "Import Failed", variant: "destructive" });
        }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const waterOptions = ["Kaveri water", "Corporation water", "Bore well"];

  if (editingProperty) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm animate-in slide-in-from-right-4 duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">{isAddingNew ? 'Add New Property' : 'Edit Property'}</h2>
          <div className="flex space-x-2">
  <Button
    variant="outline"
    onClick={() => setEditingProperty(null)}
    disabled={isSaving}
    className="flex items-center"
  >
    Cancel
  </Button>

  <Button
    onClick={handleSave}
    disabled={isSaving}
    className="flex items-center bg-maroon hover:bg-maroon-dark text-white"
  >
    <Save className="w-4 h-4 mr-2" />
    {isSaving ? 'Saving...' : 'Save Changes'}
  </Button>
</div>
        </div>

        <Tabs defaultValue="basic" className="w-full rounded-xl">
          <TabsList className="mb-6 bg-gray-100 p-1 flex-wrap h-auto rounded-xl">
            <TabsTrigger
              value="basic"
              className="px-4 py-2 rounded-md transition-colors data-[state=active]:bg-white data-[state=active]:text-maroon data-[state=active]:shadow-sm rounded-xl"
            >
              Basic Info
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="px-4 py-2 rounded-md transition-colors data-[state=active]:bg-white data-[state=active]:text-maroon data-[state=active]:shadow-sm rounded-xl"
            >
              Details & Rent
            </TabsTrigger>
            <TabsTrigger
              value="features"
              className="px-4 py-2 rounded-md transition-colors data-[state=active]:bg-white data-[state=active]:text-maroon data-[state=active]:shadow-sm rounded-xl"
            >
              Features
            </TabsTrigger>
            <TabsTrigger
              value="images"
              className="px-4 py-2 rounded-md transition-colors data-[state=active]:bg-white data-[state=active]:text-maroon data-[state=active]:shadow-sm rounded-xl"
            >
              Images
            </TabsTrigger>
            <TabsTrigger
              value="virtual-tour"
              className="px-4 py-2 rounded-md transition-colors data-[state=active]:bg-white data-[state=active]:text-maroon data-[state=active]:shadow-sm rounded-xl"
            >
              Virtual Tour
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Property Title</Label>
                <Input value={editingProperty.title} onChange={(e) => handleChange('title', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Unit ID</Label>
                <Input value={editingProperty.id} disabled={!isAddingNew} onChange={(e) => handleChange('id', e.target.value)} />
              </div>
              
              <div className="space-y-2">
                <Label>BHK Type</Label>
                <Select value={editingProperty.bhk} onValueChange={(val) => handleChange('bhk', val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select BHK" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1BHK">1BHK</SelectItem>
                    <SelectItem value="2BHK">2BHK</SelectItem>
                    <SelectItem value="3BHK">3BHK</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Floor</Label>
                <Select value={editingProperty.floor} onValueChange={handleFloorChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Floor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ground Floor">Ground Floor</SelectItem>
                    <SelectItem value="First Floor">First Floor</SelectItem>
                    <SelectItem value="Second Floor">Second Floor</SelectItem>
                    <SelectItem value="Third Floor">Third Floor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={editingProperty.status} onValueChange={(val) => handleChange('status', val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Occupied">Occupied</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Available From</Label>
                <Input 
                    type="date" 
                    value={editingProperty.availableFrom || ''} 
                    onChange={(e) => handleChange('availableFrom', e.target.value)} 
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Rent (₹)</Label>
                <Input 
                  type="number" 
                  value={editingProperty.rent} 
                  onChange={(e) => handleChange('rent', Number(e.target.value))} 
                />
              </div>
              <div className="space-y-2">
                <Label>Maintenance (₹)</Label>
                <Input type="number" value={editingProperty.maintenance} onChange={(e) => handleChange('maintenance', Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Deposit (₹)</Label>
                <Input 
                  type="number" 
                  value={editingProperty.deposit} 
                  onChange={(e) => handleChange('deposit', Number(e.target.value))} 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="space-y-2">
                <Label>Super Built-up Area (sq ft)</Label>
                <Input type="number" value={editingProperty.area} onChange={(e) => handleChange('area', Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Carpet Area (sq ft)</Label>
                <Input type="number" value={editingProperty.carpetArea} onChange={(e) => handleChange('carpetArea', Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Bathrooms</Label>
                <Input type="number" value={editingProperty.bathrooms} onChange={(e) => handleChange('bathrooms', Number(e.target.value))} />
              </div>
            </div>

            <div className="space-y-2">
               <Label>Furnishing Note</Label>
               <Textarea 
                 value={editingProperty.furnishingNote || ''} 
                 onChange={(e) => handleChange('furnishingNote', e.target.value)} 
               />
            </div>
          </TabsContent>
          
          <TabsContent value="features">
             <div className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Left Column */}
                 <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Furnished Status</Label>
                        <Select 
                            value={editingProperty.features?.furnishing || 'Semi-Furnished'} 
                            onValueChange={(val) => handleFeatureChange('furnishing', val)}
                        >
                            <SelectTrigger>
                            <SelectValue placeholder="Select furnishing" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="Semi-Furnished">Semi-Furnished</SelectItem>
                            <SelectItem value="Fully-Furnished">Fully-Furnished</SelectItem>
                            <SelectItem value="Unfurnished">Unfurnished</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Facing Direction</Label>
                        <Select 
                            value={editingProperty.features?.facing || 'East'} 
                            onValueChange={(val) => handleFeatureChange('facing', val)}
                        >
                            <SelectTrigger>
                              <SelectValue placeholder="Select facing" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="East">East</SelectItem>
                              <SelectItem value="West">West</SelectItem>
                              <SelectItem value="North">North</SelectItem>
                              <SelectItem value="South">South</SelectItem>
                              <SelectItem value="North-East">North-East</SelectItem>
                              <SelectItem value="South-East">South-East</SelectItem>
                              <SelectItem value="North-West">North-West</SelectItem>
                              <SelectItem value="South-West">South-West</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Pets Allowed</Label>
                        <Select 
                            value={editingProperty.features?.petAllowed || 'No'} 
                            onValueChange={(val) => handleFeatureChange('petAllowed', val)}
                        >
                            <SelectTrigger>
                            <SelectValue placeholder="Are pets allowed?" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                 </div>

                 {/* Right Column */}
                 <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Balcony</Label>
                        <Select 
                            value={editingProperty.features?.balcony || 'No'} 
                            onValueChange={(val) => handleFeatureChange('balcony', val)}
                        >
                            <SelectTrigger>
                            <SelectValue placeholder="Has balcony?" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Utility Area</Label>
                        <Select 
                            value={editingProperty.features?.utility || 'No'} 
                            onValueChange={(val) => handleFeatureChange('utility', val)}
                        >
                            <SelectTrigger>
                            <SelectValue placeholder="Has utility area?" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                       <Label>Parking</Label>
                       <Select 
                         value={editingProperty.features?.parking || 'None'} 
                         onValueChange={(val) => handleFeatureChange('parking', val)}
                       >
                         <SelectTrigger>
                           <SelectValue placeholder="Select parking" />
                         </SelectTrigger>
                         <SelectContent>
                           <SelectItem value="None">None</SelectItem>
                           <SelectItem value="Bike">Bike Only</SelectItem>
                           <SelectItem value="Car">Car Only</SelectItem>
                           <SelectItem value="Car & Bike">Car & Bike</SelectItem>
                         </SelectContent>
                       </Select>
                    </div>

                    <div className="space-y-3 p-4 border rounded-md bg-gray-50">
                        <Label className="mb-2 block">Water Supply</Label>
                        <div className="flex flex-col gap-2">
                            {waterOptions.map((option) => {
                                const currentSupply = editingProperty.features?.waterSupply || "";
                                // Case insensitive check
                                const isChecked = currentSupply.toLowerCase().includes(option.toLowerCase());
                                return (
                                    <div key={option} className="flex items-center space-x-2">
                                        <Checkbox 
                                            id={`water-${option}`} 
                                            checked={isChecked}
                                            onCheckedChange={(checked) => handleWaterSupplyChange(checked, option)}
                                        />
                                        <label 
                                            htmlFor={`water-${option}`} 
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                        >
                                            {option}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                        <p className="text-xs text-gray-500 mt-2 break-words">
                           Selected: {editingProperty.features?.waterSupply || "None"}
                        </p>
                    </div>
                 </div>
               </div>

               <div className="space-y-2">
                 <Label>Additional Amenities</Label>
                 <Textarea 
                   value={editingProperty.amenities?.join(', ') || ''} 
                   onChange={(e) => handleChange('amenities', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} 
                   placeholder="Gym, Swimming Pool, Security, etc. (Comma separated)"
                 />
               </div>
             </div>
           </TabsContent>
          
          <TabsContent value="images">
            <div className="space-y-4">
              <div className="p-4 border rounded bg-gray-50">
                 <h3 className="font-semibold mb-2">Property Images</h3>
                 <p className="text-sm text-gray-500 mb-4">Upload images for this property. The first image will be used as the cover.</p>
                 <ImageUploader 
                   images={editingProperty.images} 
                   onImagesChange={(newImages) => handleChange('images', newImages)} 
                   multiple={true}
                 />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="virtual-tour">
             <div className="space-y-6">
                {/* <div className="space-y-2">
                    <Label>External Virtual Tour URL</Label>
                    <Input 
                        placeholder="https://matterport.com/..." 
                        value={editingProperty.virtualTour?.externalLink || ''}
                        onChange={(e) => {
                            handleChange('virtualTour', {
                                ...editingProperty.virtualTour,
                                externalLink: e.target.value
                            });
                        }}
                    />
                    <p className="text-xs text-gray-500">Paste a link to an external virtual tour (Matterport, etc.)</p>
                </div> */}

               <div className="p-4 border rounded bg-gray-50">
                 <h3 className="font-semibold mb-2">Internal Virtual Tour Rooms</h3>
                 <p className="text-sm text-gray-500 mb-4">Or upload a panoramic image to create a virtual tour.</p>
                 {editingProperty.virtualTour?.rooms?.map((room, idx) => (
                   <div key={idx} className="flex flex-col md:flex-row gap-20 mb-4 items-start border-b pb-4">
                      <div className="w-full md:w-48">
                         <ImageUploader 
                             label="Add Panoramic Image"
                             multiple={false}
                             images={room.image ? [room.image] : []}
                             onImagesChange={(newImages) => {
                                const newRooms = [...(editingProperty.virtualTour?.rooms || [])];
                                newRooms[idx] = { ...newRooms[idx], image: newImages[0] || '' };
                                handleChange('virtualTour', { ...editingProperty.virtualTour, rooms: newRooms });
                             }}
                             multiple={false}
                         />
                      </div>
                      <div className="flex-grow space-y-1">
                        <Label>Name of the space</Label>
                        <Input 
                          placeholder="Room Name" 
                          value={room.name} 
                          onChange={(e) => {
                             const newRooms = [...(editingProperty.virtualTour?.rooms || [])];
                             newRooms[idx] = { ...newRooms[idx], name: e.target.value };
                             handleChange('virtualTour', { ...editingProperty.virtualTour, rooms: newRooms });
                          }}
                        />
                        <Label>Description</Label>
                        <Input  
                          placeholder="Description" 
                          value={room.description} 
                           onChange={(e) => {
                             const newRooms = [...(editingProperty.virtualTour?.rooms || [])];
                             newRooms[idx] = { ...newRooms[idx], description: e.target.value };
                             handleChange('virtualTour', { ...editingProperty.virtualTour, rooms: newRooms });
                          }}
                        />
                      </div>
                      <Button variant="ghost" size="icon" className="text-red-500" onClick={() => {
                          const newRooms = editingProperty.virtualTour?.rooms.filter((_, i) => i !== idx);
                          handleChange('virtualTour', { ...editingProperty.virtualTour, rooms: newRooms });
                      }}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                   </div>
                 ))}
                 <Button variant="outline" onClick={() => {
                    const newRooms = [...(editingProperty.virtualTour?.rooms || []), { id: Date.now(), name: 'New Room', image: '', description: '' }];
                    handleChange('virtualTour', { ...editingProperty.virtualTour, rooms: newRooms });
                 }}>
                   <Plus className="w-4 h-4 mr-2" /> Add Room
                 </Button>
               </div>
             </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search properties..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <input 
            type="file" 
            ref={fileImportRef} 
            onChange={handleImportFile} 
            accept=".json" 
            className="hidden"
          />
          <Button variant="outline" onClick={handleImportClick} className="flex-1 sm:flex-none border-gray-300" style={{ display: 'none' }}>
             <Upload className="w-4 h-4 mr-2" /> Import
          </Button>
          <Button variant="outline" onClick={handleExport} className="flex-1 sm:flex-none border-gray-300">
             <Download className="w-4 h-4 mr-2" /> Export
          </Button>
          <Button onClick={handleAddNew} className="flex-1 sm:flex-none bg-maroon hover:bg-maroon-dark" style={{ color: 'white' }}>
            <Plus className="w-4 h-4 mr-2" /> Add
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Property</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600 hidden md:table-cell">Rent</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Status</th>
              <th className="text-right py-3 px-4 font-semibold text-sm text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.map((property) => (
              <tr key={property.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-gray-200 mr-3 overflow-hidden flex-shrink-0">
                       {property.images && property.images[0] ? (
                          <img src={property.images[0]} alt="" className="w-full h-full object-cover" />
                       ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400"><ImageIcon className="w-4 h-4" /></div>
                       )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 line-clamp-1">{property.title}</p>
                      <p className="text-xs text-gray-500">{property.bhk}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-700 hidden md:table-cell">₹{property.rent.toLocaleString()}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    property.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {property.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(property)}>
                      <Edit className="w-4 h-4 text-gray-600" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(property)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertDialog open={deleteConfirmation.isOpen} onOpenChange={(isOpen) => !isOpen && setDeleteConfirmation({ isOpen: false, propertyId: null, propertyTitle: '' })}>
        <AlertDialogContent className="bg-white opacity-100">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-red-600">
                <AlertCircle className="w-5 h-5 mr-2" />
                Delete Property?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <span className="font-semibold text-gray-900">{deleteConfirmation.propertyTitle}</span>? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Yes, Delete It
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPropertiesManager;
