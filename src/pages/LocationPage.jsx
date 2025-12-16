
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, School, ShoppingCart, Train, Trees } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageImages } from '@/lib/usePageImages';
import { useSiteContent } from '@/lib/useSiteContent';

const LocationPage = () => {
  const { images } = usePageImages();
  const { content } = useSiteContent();
  
  const amenities = [
    {
      category: "Shopping & Essentials",
      icon: ShoppingCart,
      items: [
        { name: "BM Habitat Mall", distance: "0.8 km", desc: "Premium shopping mall with cinema and food court" },
        { name: "More Supermarket", distance: "500 m", desc: "Daily groceries and household needs" },
        { name: "Loyal World Market", distance: "1.2 km", desc: "Gourmet grocery store" },
        { name: "Kalidasa Road Market", distance: "200 m", desc: "Local shops, bakeries, and pharmacies" }
      ]
    },
    {
      category: "Education",
      icon: School,
      items: [
        { name: "University of Mysore", distance: "1.8 km", desc: "Historic public university campus" },
        { name: "St. Joseph's School", distance: "1.5 km", desc: "Renowned primary and secondary school" },
        { name: "Mahajana College", distance: "1.0 km", desc: "Well-known degree college" },
        { name: "Multiple Play Homes", distance: "< 1 km", desc: "Little Elly, EuroKids, and more nearby" }
      ]
    },
    {
      category: "Nature & Recreation",
      icon: Trees,
      items: [
        { name: "Kukkarhalli Lake", distance: "1.5 km", desc: "Perfect for morning jogs and bird watching" },
        { name: "Cheluvamba Park", distance: "2.0 km", desc: "Green park ideal for evening walks" },
        { name: "Open Gym Parks", distance: "500 m", desc: "Several neighborhood parks with fitness equipment" }
      ]
    },
    {
      category: "Connectivity & Work",
      icon: Train,
      items: [
        { name: "Mysuru Railway Station", distance: "2.5 km", desc: "Main railway junction" },
        { name: "Infosys Campus", distance: "6.5 km", desc: "Major IT hub via Outer Ring Road" },
        { name: "KSRTC Bus Stand", distance: "4.0 km", desc: "Inter-city bus terminal" }
      ]
    }
  ];

  // Default attractions if not present in content yet
  const attractions = content.location?.attractions || [
    { name: "Mysuru Palace", distance: "4.5 km", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80", alt: "The majestic Mysore Palace" },
    { name: "Sri Chamundeshwari Temple", distance: "15 km", image: "https://images.unsplash.com/photo-1621833072559-0010834371b9?w=800&q=80", alt: "Chamundi Hill Temple" },
    { name: "Mysuru Zoo", distance: "5.5 km", image: "https://images.unsplash.com/photo-1557283626-d62f6b83f443?w=800&q=80", alt: "Animals at Mysore Zoo" },
    { name: "St. Philomena's Cathedral", distance: "4.0 km", image: "https://images.unsplash.com/photo-1605218427368-35b820a40237?w=800&q=80", alt: "St. Philomena's Church" }
  ];

  return (
    <>
      <Helmet>
        <title>No Broker Rental Homes Near Me Mysuru | Shivadhama Residency</title>
        <meta name="description" content="Looking for broker-free rental homes near me in Mysuru? Shiva Dhama Residency offers direct owner rentals in Jayalakshmipuram. 1BHK, 2BHK, 3BHK houses with zero brokerage. Near University & IT hubs." />
        <meta name="keywords" content="no broker houses in mysore, rental homes near me, broker free house for rent in mysore, house for rent in jayalakshmipuram mysore, direct owner rental mysore, 2bhk for rent in mysore without broker" />
      </Helmet>
      
      <Navbar />
      
      <div className="bg-white">
        {/* Hero Section - Fixed Contrast */}
        <div className="relative h-[450px] flex items-center justify-center bg-black overflow-hidden">
          <div className="absolute inset-0 z-0">
             <img 
               src={images.location?.heroImage}
               alt="Aerial view of Mysuru city greenery" 
               className="w-full h-full object-cover opacity-50" 
             />
             {/* Gradient overlay for text readability */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl pt-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg tracking-tight"
            >
              {content.location?.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-100 font-medium drop-shadow-md max-w-2xl mx-auto"
            >
              {content.location?.subtitle}
            </motion.p>
          </div>
        </div>

        {/* Introduction - SEO Rewritten */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{content.location?.descriptionTitle}</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                {content.location?.descriptionText}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-xl overflow-hidden shadow-2xl border-4 border-white"
            >
               <div className="relative h-[400px] bg-gray-100">
                 <img 
                   src={images.location?.mapImage}
                   alt="Map of Jayalakshmipuram area showing rental homes location" 
                   className="w-full h-full object-cover" 
                 />
                 <div className="absolute bottom-4 left-4 right-4 bg-white/95 p-4 rounded-lg shadow-lg backdrop-blur-sm">
                   <div className="flex items-start">
                     <MapPin className="w-6 h-6 text-maroon mt-1 mr-3 flex-shrink-0" />
                     <div>
                       <h3 className="font-bold text-gray-900">{content.global?.siteName}</h3>
                       <p className="text-sm text-gray-600">{content.global?.address}</p>
                       <p className="text-xs text-maroon font-bold mt-1">Prime Rental Location</p>
                     </div>
                   </div>
                 </div>
               </div>
            </motion.div>
          </div>
        </div>

        {/* Detailed Amenities Grid */}
        <div className="bg-[#F5F1ED] py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.location?.nearbyTitle || "What's Nearby?"}</h2>
              <p className="text-gray-600 text-lg">{content.location?.nearbyDesc || "Everything you need is just around the corner from your new rental home."}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {amenities.map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-maroon/10 rounded-full flex items-center justify-center mr-4">
                      <section.icon className="w-6 h-6 text-maroon" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{section.category}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {section.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex justify-between items-start border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                        <span className="text-sm font-bold text-maroon bg-maroon/5 px-2 py-1 rounded whitespace-nowrap ml-4">
                          {item.distance}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Local Attractions */}
        <div className="py-16 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.location?.attractionsTitle || "Famous Attractions"}</h2>
            <p className="text-gray-600">{content.location?.attractionsDesc || "Explore the heritage of the Royal City from your central location."}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {attractions.map((place, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-xl shadow-lg h-64"
              >
                <img 
                  src={place.image}
                  alt={place.alt || place.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-lg leading-tight mb-1">{place.name}</h3>
                  <p className="text-gray-300 text-sm font-medium">{place.distance}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default LocationPage;
