
import React from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Square, Calendar } from 'lucide-react'; 
import { Button } from '@/components/ui/button';

const PropertyCard = ({ property }) => {
  const formattedDate = property.availableFrom 
    ? new Date(property.availableFrom).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden group">
        {property.images && property.images.length > 0 ? (
          <img 
            src={property.images[0]} 
            alt={property.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
             No Image Available
          </div>
        )}
        
        {/* Status Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
          property.status === 'Available' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {property.status}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{property.title}</h3>
        </div>
        
        <div className="mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-600 text-sm">House Rent:</span>
            <span className="text-maroon font-bold text-lg">₹{(property.rent || 0).toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-xs">+ Maintenance:</span>
            <span className="text-gray-700 text-sm font-medium">₹{(property.maintenance || 0).toLocaleString()}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4 text-gray-600 text-sm">
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <Bed className="w-4 h-4 mb-1 text-maroon" />
            <span>{property.bhk}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <Bath className="w-4 h-4 mb-1 text-maroon" />
            <span>{property.bathrooms} Bath</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <Square className="w-4 h-4 mb-1 text-maroon" />
            <span>{property.area} ft²</span>
          </div>
        </div>

        
        {property.status === 'Available' ? (
          <div className="mb-4 flex items-center text-xs text-green-600 font-medium bg-maroon/5 p-2 rounded">
            Available now. Contact us to book this unit.
          </div>
        ) : (
          formattedDate && (
            <div className="mb-4 flex items-center text-xs text-maroon font-medium bg-maroon/5 p-2 rounded">
              <Calendar className="w-3 h-3 mr-2" />
              Available from: {formattedDate}
            </div>
          )
        )}      
        
        <div className="mt-auto">
          <Link to={`/property/${property.id}`} className="w-full block">
            <Button className="w-full bg-maroon hover:bg-maroon-dark" style={{
              color: "white",
            }}>
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
