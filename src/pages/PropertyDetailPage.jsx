
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Home, Bed, Bath, Square, Compass, School, ShoppingBag, Train, Sofa, Droplets, Building, PawPrint, Utensils, ShieldAlert, Heart, CheckCircle2, Ban, Calendar, Info } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageGallery from '@/components/ImageGallery';
import ContactCard from '@/components/ContactCard';
import VirtualTour from '@/components/VirtualTour';
import { Button } from '@/components/ui/button';
import { useProperties } from '@/lib/useProperties';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import PanoramaViewer from '@/components/PanoramaViewer';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { properties } = useProperties();
  
  const property = properties.find(p => p.id === id);

  const locationHighlights = [
    { text: "Off Kalidasa Road", icon: Compass },
    { text: "500m from supermarket", icon: ShoppingBag },
    { text: "<1km from BM Habitat mall", icon: ShoppingBag },
    { text: "<2km from Kukkarhalli lake", icon: MapPin },
    { text: "<2km from Mysuru University", icon: School },
    { text: "<3km Railway station", icon: Train },
    { text: "<5km Mysuru palace", icon: MapPin },
    { text: "<7km Infosys campus", icon: MapPin },
    { text: "Multiple schools/colleges nearby", icon: School },
    { text: "Close to temples", icon: MapPin },
  ];

  const handleShortlist = () => {
    toast({
      title: "Shortlisted! ❤️",
      description: `${property.title} has been added to your shortlist.`,
    });
  };

  if (properties.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading property details...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!property) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Property not found</h2>
          <Link to="/" className="text-maroon hover:underline mt-4 inline-block">Return to Home</Link>
        </div>
        <Footer />
      </>
    );
  }

  const isAvailable = property.status === 'Available';
  
  // Format the available from date
  const availableDate = property.availableFrom 
    ? new Date(property.availableFrom).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : null;

  return (
    <>
      <Helmet>
        <title>{property.title} | Shivadhama Residency</title>
        <meta name="description" content={`Check out this ${property.bhk} apartment in Jayalakshmipuram, Mysuru. ${property.area} sqft, ${property.bathrooms} bath. Rent: ₹${property.rent.toLocaleString()}. No broker fee.`} />
      </Helmet>
      
      <Navbar />
      
      <div className="bg-white py-4 border-b">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="inline-flex items-center text-maroon hover:text-[#6d3535] transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Properties
          </Link>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleShortlist}
            className="flex items-center border-maroon text-maroon hover:bg-maroon hover:text-white"
          >
            <Heart className="w-4 h-4 mr-2" />
            Shortlist
          </Button>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex flex-col gap-2">
                   <div className="flex items-center gap-2">
                     <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{property.title}</h1>
                   </div>
                   <div className="flex flex-wrap items-center gap-4 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-maroon" />
                      <span>Jayalakshmipuram, Mysuru</span>
                    </div>
                    <div className="flex items-center">
                      <Home className="w-5 h-5 mr-2 text-maroon" />
                      <span>
                        {property.floor} 
                        {(property.floorNumber !== undefined && property.floorNumber !== null) && property.features?.floorCount 
                          ? ` ${property.floorNumber} out of ${property.features.floorCount}` 
                          : ''}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <div className={cn(
                    "inline-flex items-center px-4 py-2 rounded-full text-sm font-bold border w-fit h-fit",
                    isAvailable ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"
                  )}>
                    {isAvailable ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Ban className="w-4 h-4 mr-2" />}
                    Status: {property.status}
                  </div>
                  {isAvailable ? (
                      <div className="text-sm font-medium text-green-600 flex items-center bg-maroon/5 px-3 py-1 rounded-full" >
                        Available now. Contact us to book this unit.
                      </div>
                    ) : (
                      availableDate && (
                        <div className="text-sm font-medium text-maroon flex items-center bg-maroon/5 px-3 py-1 rounded-full">
                          <Calendar className="w-3.5 h-3.5 mr-2" />
                          Available from: {availableDate}
                        </div>
                      )
                    )}
                </div>
              </div>

              {property.furnishingNote && (
                 <div className="bg-blue-50 text-blue-800 px-4 py-3 rounded-md mb-6 text-sm flex items-start md:items-center border border-blue-100">
                    <Info className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 md:mt-0" />
                    <span className="font-medium">{property.furnishingNote}</span>
                 </div>
              )}
              
              <ImageGallery images={property.images} />
              <div className="flex justify-center mt-6">
                <Button
                  variant="outline"
                  className="text-maroon hover:text-white hover:bg-maroon border-maroon"
                  onClick={() => {
                    document.getElementById('virtual-tour')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Compass className="w-4 h-4 mr-2" />
                  Take Virtual Tour
                </Button>
              </div>

              <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                <h6 className="text-xl font-bold text-gray-900 mb-4">Rent & Area Details</h6>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <p className="text-gray-600 mb-1">Monthly Rent</p>
                    <p className="text-2xl font-bold text-maroon">₹{property.rent.toLocaleString()}</p>
                  </div>
                   <div>
                    <p className="text-gray-600 mb-1">Maintenance</p>
                    <p className="text-2xl font-bold text-gray-900">₹{property.maintenance.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Security Deposit</p>
                    <p className="text-2xl font-bold text-gray-900">₹{property.deposit.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 mb-1 text-sm">Carpet Area</p>
                    <p className="text-xl font-bold text-gray-900">{property.carpetArea} sq.ft</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 mb-1 text-sm">Super Built-up Area</p>
                    <p className="text-xl font-bold text-gray-900">{property.area} sq.ft</p>
                  </div>
                </div>
              </div>

              {/* Overview Section */}
              <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-maroon pb-2 inline-block">Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <div className="flex items-center text-gray-600">
                      <Sofa className="w-5 h-5 mr-3 text-gray-400" />
                      <span>Furnishing Status</span>
                    </div>
                    <span className="font-semibold text-gray-900">{property.features?.furnishing || 'Semi'}</span>
                  </div>
                  
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <div className="flex items-center text-gray-600">
                      <Compass className="w-5 h-5 mr-3 text-gray-400" />
                      <span>Facing</span>
                    </div>
                    <span className="font-semibold text-gray-900">{property.features?.facing || 'East'}</span>
                  </div>
                  
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <div className="flex items-center text-gray-600">
                      <Droplets className="w-5 h-5 mr-3 text-gray-400" />
                      <span>Water Supply</span>
                    </div>
                    <span className="font-semibold text-gray-900">{property.features?.waterSupply || 'Corporation'}</span>
                  </div>
                  
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <div className="flex items-center text-gray-600">
                      <Building className="w-5 h-5 mr-3 text-gray-400" />
                      <span>No. of Floors</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {property.features?.floorCount || 'N/A'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <div className="flex items-center text-gray-600">
                      <Bath className="w-5 h-5 mr-3 text-gray-400" />
                      <span>Bathroom</span>
                    </div>
                    <span className="font-semibold text-gray-900">{property.bathrooms}</span>
                  </div>
                  
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <div className="flex items-center text-gray-600">
                      <PawPrint className="w-5 h-5 mr-3 text-gray-400" />
                      <span>Pet Allowed</span>
                    </div>
                    <span className="font-semibold text-gray-900">{property.features?.petAllowed || 'No'}</span>
                  </div>
                  
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <div className="flex items-center text-gray-600">
                      <Utensils className="w-5 h-5 mr-3 text-gray-400" />
                      <span>Non-Veg Allowed</span>
                    </div>
                    <span className="font-semibold text-gray-900">{property.features?.nonVegAllowed || 'No'}</span>
                  </div>
                  
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <div className="flex items-center text-gray-600">
                      <ShieldAlert className="w-5 h-5 mr-3 text-gray-400" />
                      <span>Gated Security</span>
                    </div>
                    <span className="font-semibold text-gray-900">{property.features?.security || 'No'}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Highlights</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Bed className="w-5 h-5 mr-3 text-maroon" />
                    <span>{property.bhk}</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-5 h-5 mr-3 text-maroon" />
                    <span>{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="w-5 h-5 mr-3 text-maroon" />
                    <span>{property.area} SBA</span>
                  </div>
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-maroon rounded-full mr-3"></div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Location Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {locationHighlights.map((highlight, index) => (
                    <div key={index} className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <highlight.icon className="w-5 h-5 mr-3 text-maroon flex-shrink-0" />
                      <span className="text-gray-700">{highlight.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Room-wise Area</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-maroon">
                        <th className="text-left py-3 px-4 font-semibold">Room</th>
                        <th className="text-right py-3 px-4 font-semibold">Area (sq.ft)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {property.roomAreas.map((room, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="py-3 px-4">{room.room}</td>
                          <td className="text-right py-3 px-4">{room.area}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50 font-semibold text-gray-900">
                        <td className="py-3 px-4">Carpet Area</td>
                        <td className="text-right py-3 px-4">{property.carpetArea} sq.ft</td>
                      </tr>
                      <tr className="bg-maroon/10 font-bold text-maroon">
                        <td className="py-3 px-4">Super Built-up Area</td>
                        <td className="text-right py-3 px-4">{property.area} sq.ft</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-8 bg-white rounded-lg shadow-md p-6" id="virtual-tour">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Compass className="w-6 h-6 text-maroon" /> 
                  Virtual Tour
                </h2>
                <p className="text-gray-600 mb-4">Explore {property.title} room by room with our immersive 360-like view.</p>
                {/* {property.virtualTour ? (
                  <VirtualTour tourData={property.virtualTour} />
                ) : property.virtualTourImage ? (
                  <div className="rounded-lg overflow-hidden relative group">
                    <img 
                      alt="Virtual Tour 360 View" 
                      className="w-full h-auto object-cover" 
                      src={property.virtualTourImage} 
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                        <span className="bg-white/90 text-maroon px-4 py-2 rounded-full font-bold shadow-lg">360° View</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No virtual tour available.</p>
                )} */}
              <PanoramaViewer
                image="https://cdn-ilblmij.nitrocdn.com/DLIZsQDvOcOKWcuSosUGkNHekDNKXxlQ/assets/images/optimized/rev-8feb66c/threesixty.tours/wp-content/uploads/2024/10/traditionalimage_upload-170913_1505326171212-scaled.jpg"
                height="500px"
                autoLoad={true}
                showZoomCtrl={true}
                showFullscreenCtrl={true}
              />
              </div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-1">
             {/* Conditionally render Contact Card or Occupied Message */}
            {isAvailable ? (
               <ContactCard property={property} />
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 shadow-sm sticky top-24">
                 <h3 className="text-xl font-bold text-red-700 mb-2 flex items-center">
                   <Ban className="w-6 h-6 mr-2" /> This Unit is Occupied
                 </h3>
                 <p className="text-gray-700 mb-4">
                   This property is currently occupied.
                 </p>
                 {availableDate && (
                    <div className="mb-4 bg-white p-3 rounded border border-red-100 text-sm font-medium text-red-800 flex items-center">
                       <Calendar className="w-4 h-4 mr-2" />
                       Available again from: {availableDate}
                    </div>
                 )}
                 <Link to="/">
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      View Other Available Units
                    </Button>
                 </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default PropertyDetailPage;
