
import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SearchFilterBar = ({ filters, onFilterChange }) => {
  
  const handleReset = () => {
    onFilterChange('reset', null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-6 mb-8"
    >
      <div className="flex items-center mb-4">
        <Search className="w-5 h-5 text-maroon mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Find Your Perfect Home</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Availability</label>
          <Select 
            value={filters.status} 
            onValueChange={(value) => onFilterChange('status', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Occupied">Occupied</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">BHK Type</label>
          <Select 
            value={filters.bhk} 
            onValueChange={(value) => onFilterChange('bhk', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select BHK" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="1BHK">1 BHK</SelectItem>
              <SelectItem value="2BHK">2 BHK</SelectItem>
              <SelectItem value="3BHK">3 BHK</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Floor</label>
          <Select 
            value={filters.floor} 
            onValueChange={(value) => onFilterChange('floor', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Floor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Floors</SelectItem>
              <SelectItem value="Ground Floor">Ground Floor</SelectItem>
              <SelectItem value="First Floor">First Floor</SelectItem>
              <SelectItem value="Second Floor">Second Floor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Budget</label>
          <Select 
            value={filters.budget} 
            onValueChange={(value) => onFilterChange('budget', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Budgets</SelectItem>
              <SelectItem value="0-8000">Under ₹8,000</SelectItem>
              <SelectItem value="8000-12000">₹8,000 - ₹12,000</SelectItem>
              <SelectItem value="12000-20000">₹12,000 - ₹20,000</SelectItem>
              <SelectItem value="20000-99999">Above ₹20,000</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-end">
          <Button
            onClick={handleReset}
            variant="outline"
            className="w-full border-maroon text-maroon hover:bg-maroon hover:text-white"
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchFilterBar;
