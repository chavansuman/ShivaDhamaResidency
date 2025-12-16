
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import SearchFilterBar from '@/components/SearchFilterBar';
import PropertyCard from '@/components/PropertyCard';
import WhyTenantsLove from '@/components/WhyTenantsLove';
import MapSection from '@/components/MapSection';
import DynamicSection from '@/components/DynamicSection';
import { useProperties } from '@/lib/useProperties';
import { useSiteContent } from '@/lib/useSiteContent';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  const { getPageSections } = useSiteContent();
  const pageSections = getPageSections('home');
  const { properties } = useProperties();
  const [filters, setFilters] = useState({
    bhk: 'all',
    status: 'all', 
    floor: 'all',
    budget: 'all'
  });

  const handleFilterChange = (key, value) => {
    if (key === 'reset') {
      setFilters({
        bhk: 'all',
        status: 'all',
        floor: 'all',
        budget: 'all'
      });
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  const filteredProperties = properties.filter(property => {
    if (filters.bhk !== 'all' && property.bhk !== filters.bhk) return false;
    if (filters.status !== 'all' && property.status !== filters.status) return false;
    if (filters.floor !== 'all' && property.floor !== filters.floor) return false;
    if (filters.budget !== 'all') {
      const [min, max] = filters.budget.split('-').map(Number);
      if (property.rent < min || property.rent > max) return false;
    }
    return true;
  });

  const getSectionTitle = () => {
    switch (filters.status) {
      case 'Available':
        return 'Available Residences';
      case 'Occupied':
        return 'Occupied Residences';
      default:
        return 'All Residences';
    }
  };

  // Internal component for the complex Properties section to keep main loop clean
  const PropertiesSection = () => (
    <>
      <div className="container mx-auto px-4 -mt-20 relative z-20 mb-16">
        <SearchFilterBar filters={filters} onFilterChange={handleFilterChange} />
      </div>

      <div id="properties" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{getSectionTitle()}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our range of well-maintained apartments. Whether you need a cozy 1BHK or a spacious 3BHK, we have the perfect home for you.
          </p>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-medium text-gray-900">No properties match your filters</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search criteria to see more results.</p>
            <Button 
              variant="link" 
              onClick={() => handleFilterChange('reset')}
              className="mt-4 text-maroon"
            >
              Clear all filters
            </Button>
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link to="/contact">
            <Button variant="outline" className="border-maroon text-maroon hover:bg-maroon hover:text-white transition-colors">
              Schedule a Visit <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Helmet>
        <title>Shivadhama Residency | Premium Rental Homes in Jayalakshmipuram, Mysuru</title>
        <meta name="description" content="Find your perfect rental home in Jayalakshmipuram, Mysuru. Premium 1, 2 & 3 BHK apartments with modern amenities. No broker, direct owner." />
      </Helmet>
      
      <Navbar />
      
      {pageSections.map((section) => {
        if (section.type === 'custom') {
          return <DynamicSection key={section.id} data={section} />;
        }
        
        // Render system components
        switch (section.component) {
          case 'HeroSection':
            return <HeroSection key={section.id} />;
          case 'PropertiesSection':
            return <PropertiesSection key={section.id} />;
          case 'WhyTenantsLove':
            return <WhyTenantsLove key={section.id} />;
          case 'MapSection':
            return <MapSection key={section.id} />;
          default:
            return null;
        }
      })}
      
      <Footer />
    </>
  );
};

export default HomePage;
