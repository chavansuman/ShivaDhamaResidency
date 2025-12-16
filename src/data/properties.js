
// Initial data source - This acts as the default database for the downloaded website.
// Reordered: G1, G2, G3, then F1, F2, F3, S2.

export const initialProperties = [
  {
    id: 'G1',
    title: 'Ground Floor Unit G1',
    bhk: '1BHK',
    floor: 'Ground Floor',
    floorNumber: 0,
    rent: 19000,
    deposit: 190000,
    maintenance: 2000,
    area: 646.91,
    carpetArea: 481.44,
    bathrooms: 1,
    status: 'Available',
    availableFrom: '2025-12-15',
    displayOrder: 1,
    furnishingNote: "Owner can make fully furnished based on tenant requirement.",
    virtualTourImage: 'https://horizons-cdn.hostinger.com/c7893375-0cf3-4f10-8d29-acc57933d7b2/5ea36751a97286d1c9a3f36ce66bad7b.jpg',
    virtualTour: {
      rooms: [
        { 
          id: 'bathroom', 
          name: 'Bathroom', 
          image: 'https://horizons-cdn.hostinger.com/c7893375-0cf3-4f10-8d29-acc57933d7b2/70587a1866814cc7533fc2d7ae8dadd0.jpg',
          description: 'Clean bathroom with modern sanitary fittings, geyser provision, and anti-skid tiles.'
        },
        { 
          id: 'utility', 
          name: 'Utility Room', 
          image: 'https://horizons-cdn.hostinger.com/c7893375-0cf3-4f10-8d29-acc57933d7b2/ffd895d0af0490af2936581acc6200c8.jpg',
          description: 'Spacious utility area with separate washing stone and washing machine point.'
        },
        { 
          id: 'kitchen', 
          name: 'Kitchen', 
          image: 'https://horizons-cdn.hostinger.com/c7893375-0cf3-4f10-8d29-acc57933d7b2/e5d8a85eb060fab5a618ee5f787652ac.jpg',
          description: 'L-shaped modular kitchen with granite platform, stainless steel sink, and ample storage cabinets.'
        },
        { 
          id: 'living-1', 
          name: 'Living Room', 
          image: 'https://horizons-cdn.hostinger.com/c7893375-0cf3-4f10-8d29-acc57933d7b2/5ea36751a97286d1c9a3f36ce66bad7b.jpg',
          description: 'Bright and airy living hall featuring large windows for natural light and cross ventilation.'
        },
        { 
          id: 'living-2', 
          name: 'Living Room View 2', 
          image: 'https://horizons-cdn.hostinger.com/c7893375-0cf3-4f10-8d29-acc57933d7b2/a4463ae04d0f8282d890f0b22f493d4a.jpg',
          description: 'Spacious layout allowing for flexible furniture arrangements and dining space.'
        },
        { 
          id: 'bedroom', 
          name: 'Bedroom', 
          image: 'https://horizons-cdn.hostinger.com/c7893375-0cf3-4f10-8d29-acc57933d7b2/1e1c9a931207f35a94cca1031e4575cd.jpg',
          description: 'Cozy master bedroom with built-in wardrobe space and large window.'
        }
      ]
    },
    amenities: ['Semi-Furnished', 'Non-veg allowed', 'Pets not allowed', 'No power backup in building', 'Bike Parking', 'Utility Area'],
    features: {
      furnishing: 'Semi-Furnished',
      facing: 'East',
      waterSupply: 'Kaveri water + bore well + corporation water',
      parking: 'Bike',
      petAllowed: 'No',
      nonVegAllowed: 'Yes',
      security: 'No',
      floorCount: 3
    },
    images: [
      'https://horizons-cdn.hostinger.com/c7893375-0cf3-4f10-8d29-acc57933d7b2/5ea36751a97286d1c9a3f36ce66bad7b.jpg',
      'https://horizons-cdn.hostinger.com/c7893375-0cf3-4f10-8d29-acc57933d7b2/e5d8a85eb060fab5a618ee5f787652ac.jpg',
      'https://horizons-cdn.hostinger.com/c7893375-0cf3-4f10-8d29-acc57933d7b2/1e1c9a931207f35a94cca1031e4575cd.jpg',
      'https://horizons-cdn.hostinger.com/c7893375-0cf3-4f10-8d29-acc57933d7b2/70587a1866814cc7533fc2d7ae8dadd0.jpg'
    ],
    roomAreas: [
      { room: 'Hall', area: 234.61 },
      { room: 'Kitchen', area: 34.50 },
      { room: 'Kitchen Cabinet', area: 26.83 },
      { room: 'Utility', area: 36.00 },
      { room: 'Bedroom 1', area: 114.26 },
      { room: 'Bathroom 1', area: 35.23 }
    ]
  },
  {
    id: 'G2',
    title: 'Ground Floor Unit G2',
    bhk: '2BHK',
    floor: 'Ground Floor',
    floorNumber: 0,
    rent: 20000,
    deposit: 20000,
    maintenance: 3000,
    area: 1012.07,
    carpetArea: 813.40,
    bathrooms: 2,
    status: 'Occupied',
    availableFrom: '2026-03-01',
    displayOrder: 2,
    furnishingNote: "Owner can make fully furnished based on tenant requirement.",
    virtualTourImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    virtualTour: null,
    amenities: ['Semi-Furnished', 'Non-veg allowed', 'Pets not allowed', 'No power backup in building', 'Car Parking', 'Balcony'],
    features: {
      furnishing: 'Semi-Furnished',
      facing: 'North',
      waterSupply: 'Kaveri water + bore well + corporation water',
      parking: 'Car',
      petAllowed: 'No',
      nonVegAllowed: 'Yes',
      security: 'No',
      floorCount: 3
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80'
    ],
    roomAreas: [
      { room: 'Hall', area: 321.56 },
      { room: 'Balcony', area: 43.75 },
      { room: 'Kitchen', area: 55.64 },
      { room: 'Kitchen Cabinet', area: 23.67 },
      { room: 'Utility', area: 35.00 },
      { room: 'Master Bedroom', area: 142.50 },
      { room: 'Master Bathroom', area: 40.00 },
      { room: 'Bedroom 2', area: 97.50 },
      { room: 'Bedroom 2 Wardrobe', area: 7.50 },
      { room: 'Bathroom 2', area: 36.94 },
      { room: 'Bathroom 2 Extension', area: 9.33 }
    ]
  },
  {
    id: 'G3',
    title: 'Ground Floor Unit G3',
    bhk: '3BHK',
    floor: 'Ground Floor',
    floorNumber: 0,
    rent: 25500,
    deposit: 25500,
    maintenance: 4500,
    area: 1100.18,
    carpetArea: 893.49,
    bathrooms: 2, 
    status: 'Available',
    availableFrom: '2025-12-10',
    displayOrder: 3,
    furnishingNote: "Owner can make fully furnished based on tenant requirement.",
    virtualTourImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    virtualTour: null,
    amenities: ['Semi-Furnished', 'Non-veg allowed', 'Pets not allowed', 'No power backup in building', 'Car Parking', 'Large Balcony'],
    features: {
      furnishing: 'Semi-Furnished',
      facing: 'East',
      waterSupply: 'Kaveri water + bore well + corporation water',
      parking: 'Car',
      petAllowed: 'No',
      nonVegAllowed: 'Yes',
      security: 'No',
      floorCount: 3
    },
    images: [
      'https://horizons-cdn.hostinger.com/c7893375-0cf3-4f10-8d29-acc57933d7b2/ae3faa25a37ebce31bbf1fa76daa4718.png',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
      'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800&q=80'
    ],
    roomAreas: [
      { room: 'Hall', area: 295.31 },
      { room: 'Balcony', area: 80.75 },
      { room: 'Kitchen', area: 80.17 },
      { room: 'Kitchen Cabinet', area: 34.67 },
      { room: 'Bedroom 1', area: 119.88 },
      { room: 'Bathroom 1', area: 40.25 },
      { room: 'Bedroom 2', area: 96.52 },
      { room: 'Bedroom 2 Wardrobe', area: 16.89 },
      { room: 'Bedroom 3', area: 103.33 },
      { room: 'Common Bathroom', area: 25.73 }
    ]
  },
  {
    id: 'F1',
    title: 'First Floor Unit F1',
    bhk: '1BHK',
    floor: 'First Floor',
    floorNumber: 1,
    rent: 15000,
    deposit: 15000,
    maintenance: 2000,
    area: 646.91,
    carpetArea: 481.44,
    bathrooms: 1,
    status: 'Available',
    availableFrom: '2025-12-14',
    displayOrder: 4,
    furnishingNote: "Owner can make fully furnished based on tenant requirement.",
    virtualTourImage: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80',
    virtualTour: null,
    amenities: ['Semi-Furnished', 'Non-veg allowed', 'Pets not allowed', 'No power backup in building', 'Bike Parking', 'Utility Area'],
    features: {
      furnishing: 'Semi-Furnished',
      facing: 'East',
      waterSupply: 'Kaveri water + bore well + corporation water',
      parking: 'Bike',
      petAllowed: 'No',
      nonVegAllowed: 'Yes',
      security: 'No',
      floorCount: 3
    },
    images: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80',
      'https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?w=800&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80',
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&q=80'
    ],
    roomAreas: [
      { room: 'Hall', area: 234.61 },
      { room: 'Kitchen', area: 34.50 },
      { room: 'Kitchen Cabinet', area: 26.83 },
      { room: 'Utility', area: 36.00 },
      { room: 'Bedroom 1', area: 114.26 },
      { room: 'Bathroom 1', area: 35.23 }
    ]
  },
  {
    id: 'F2',
    title: 'First Floor Unit F2',
    bhk: '2BHK',
    floor: 'First Floor',
    floorNumber: 1,
    rent: 20000,
    deposit: 20000,
    maintenance: 3000,
    area: 1012.07,
    carpetArea: 813.40,
    bathrooms: 2,
    status: 'Occupied',
    availableFrom: '2026-06-01',
    displayOrder: 5,
    furnishingNote: "Owner can make fully furnished based on tenant requirement.",
    virtualTourImage: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80',
    virtualTour: null,
    amenities: ['Semi-Furnished', 'Non-veg allowed', 'Pets not allowed', 'No power backup in building', 'Bike Parking', 'Balcony'],
    features: {
      furnishing: 'Semi-Furnished',
      facing: 'North',
      waterSupply: 'Kaveri water + bore well + corporation water',
      parking: 'Bike',
      petAllowed: 'No',
      nonVegAllowed: 'Yes',
      security: 'No',
      floorCount: 3
    },
    images: [
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80',
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80',
      'https://images.unsplash.com/photo-1560185127-6a6f7d2f32b5?w=800&q=80',
      'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80'
    ],
    roomAreas: [
      { room: 'Hall', area: 321.56 },
      { room: 'Balcony', area: 43.75 },
      { room: 'Kitchen', area: 55.64 },
      { room: 'Kitchen Cabinet', area: 23.67 },
      { room: 'Utility', area: 35.00 },
      { room: 'Master Bedroom', area: 142.50 },
      { room: 'Master Bathroom', area: 40.00 },
      { room: 'Bedroom 2', area: 97.50 },
      { room: 'Bedroom 2 Wardrobe', area: 7.50 },
      { room: 'Bathroom 2', area: 36.94 },
      { room: 'Bathroom 2 Extension', area: 9.33 }
    ]
  },
  {
    id: 'F3',
    title: 'First Floor Unit F3',
    bhk: '3BHK',
    floor: 'First Floor',
    floorNumber: 1,
    rent: 25500,
    deposit: 25500,
    maintenance: 4500,
    area: 1100.18,
    carpetArea: 893.49,
    bathrooms: 2,
    status: 'Available',
    availableFrom: '2025-12-20',
    displayOrder: 6,
    furnishingNote: "Owner can make fully furnished based on tenant requirement.",
    virtualTourImage: 'https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=800&q=80',
    virtualTour: null,
    amenities: ['Semi-Furnished', 'Non-veg allowed', 'Pets not allowed', 'No power backup in building', 'Car Parking', 'Large Balcony'],
    features: {
      furnishing: 'Semi-Furnished',
      facing: 'East',
      waterSupply: 'Kaveri water + bore well + corporation water',
      parking: 'Car',
      petAllowed: 'No',
      nonVegAllowed: 'Yes',
      security: 'No',
      floorCount: 3
    },
    images: [
      'https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=800&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80'
    ],
    roomAreas: [
      { room: 'Hall', area: 295.31 },
      { room: 'Balcony', area: 80.75 },
      { room: 'Kitchen', area: 80.17 },
      { room: 'Kitchen Cabinet', area: 34.67 },
      { room: 'Bedroom 1', area: 119.88 },
      { room: 'Bathroom 1', area: 40.25 },
      { room: 'Bedroom 2', area: 96.52 },
      { room: 'Bedroom 2 Wardrobe', area: 16.89 },
      { room: 'Bedroom 3', area: 103.33 },
      { room: 'Common Bathroom', area: 25.73 }
    ]
  },
  {
    id: 'S2',
    title: 'Second Floor Unit S2',
    bhk: '2BHK',
    floor: 'Second Floor',
    floorNumber: 2,
    rent: 20000,
    deposit: 20000,
    maintenance: 3000,
    area: 1067.86,
    carpetArea: 864.12,
    bathrooms: 2,
    status: 'Available',
    availableFrom: '2025-12-18',
    displayOrder: 7,
    furnishingNote: "Owner can make fully furnished based on tenant requirement.",
    virtualTourImage: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&q=80',
    virtualTour: null,
    amenities: ['Semi-Furnished', 'Non-veg allowed', 'Pets not allowed', 'No power backup in building', 'Bike Parking', 'Terrace Access'],
    features: {
      furnishing: 'Semi-Furnished',
      facing: 'East',
      waterSupply: 'Kaveri water + bore well + corporation water',
      parking: 'Bike',
      petAllowed: 'No',
      nonVegAllowed: 'Yes',
      security: 'No',
      floorCount: 3
    },
    images: [
      'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&q=80',
      'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80'
    ],
    roomAreas: [
      { room: 'Hall', area: 321.56 },
      { room: 'Balcony', area: 43.75 },
      { room: 'Kitchen', area: 55.64 },
      { room: 'Kitchen Cabinet', area: 23.67 },
      { room: 'Utility', area: 35.00 },
      { room: 'Master Bedroom', area: 142.50 },
      { room: 'Master Bathroom', area: 40.00 },
      { room: 'Bedroom 2', area: 128.33 },
      { room: 'Bedroom 2 Wardrobe', area: 10.00 },
      { room: 'Bathroom 2', area: 42.29 },
      { room: 'Bathroom 2 Extension', area: 21.38 }
    ]
  }
];

export const getProperties = () => {
  const stored = localStorage.getItem('properties');
  if (stored) {
    try {
        const parsed = JSON.parse(stored);
        if(Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch(e) {
        console.error("Error parsing stored properties", e);
    }
  }
  return initialProperties;
};

export const saveProperties = (properties) => {
  localStorage.setItem('properties', JSON.stringify(properties));
  window.dispatchEvent(new Event('storage'));
};
