
export const initialSiteContent = {
  global: {
    siteName: "Shivadhama Residency",
    contactPhone: "+91 98860 00624",
    contactEmail: "shivadhamamysuru@gmail.com",
    address: "Shivadhama Residency, 53, 2nd Cross Road, 4th Block, Jayalakshmipuram, Mysuru, Karnataka 570012",
    googleMapsUrl: "https://www.google.com/maps/dir/Shivadhama+Residency,+53,+2nd+Cross+Road,+4th+Block,+Jayalakshmipuram,+Mysuru,+Karnataka+570012/@12.3225958,76.6272425,17z/data=!4m16!1m7!3m6!1s0x3baf7a9033cfe2c9:0x5f95e6a0b830538b!2sShivadhama+Residency!8m2!3d12.3225958!4d76.6272425!16s%2Fg%2F11f_b_0qf1!4m7!1m0!1m5!1m1!1s0x3baf7a9033cfe2c9:0x5f95e6a0b830538b!2m2!1d76.6271845!2d12.3226516?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D",
    footerAbout: "Your trusted partner for broker-free rental homes in Mysuru. We offer premium apartments with modern amenities in the heart of Jayalakshmipuram."
  },
  home: {
    heroTitle: "Welcome to Shivadhama Residency",
    heroSubtitle: "Premium Rental Apartments in the Heart of Mysuru",
    whyChooseTitle: "Why Choose Shivadhama Residency?",
    whyChooseSubtitle: "We don't just rent apartments; we provide homes. Experience a hassle-free lifestyle in Mysuru's most prestigious neighborhood."
  },
  about: {
    title: "About Shivadhama Residency",
    subtitle: "Modern, spacious rental homes—100% broker-free—right in Mysuru",
    features: [
      "Affordable Rent",
      "Safe & Secure Living",
      "Well-Maintained Units",
      "Prime Residential Location"
    ],
    welcomeParagraph1: "Welcome to Shivadhama Residency, a peaceful and family-friendly rental community in Mysuru. We believe that finding a home should be simple, transparent, and free from brokerage. That's why we offer direct-owner rental houses, allowing you to save money and enjoy complete clarity in rent, deposit, and agreements.",
    welcomeParagraph2: "Our property is thoughtfully designed for comfort and convenience. Every house is well-ventilated, naturally lit, and located in a calm neighbourhood with easy access to schools, shops, hospitals, transportation, and daily essentials. Whether you are a working professional, a couple, or a family looking for long-term stay, Shivadhama Residency provides a safe and comfortable living experience. At Shivadhama Residency, we value honesty, cleanliness, and trust. We maintain all units personally, ensuring a smooth and hassle-free renting process. With us, you don't deal with agents — you connect directly with the owner for clear communication and a stress-free stay.",
    valuesTitle: "Our Values",
    values: [
      { name: "Transparency", description: "No brokerage, no hidden charges." },
      { name: "Comfort", description: "Clean, spacious, and well-maintained homes." },
      { name: "Safety", description: "A peaceful locality ideal for families." },
      { name: "Trust", description: "Direct dealing with the property owner." }
    ],
    closingParagraph: "We are committed to offering rental homes that bring peace, comfort, and happiness to every family.",
    finalLine: "Your new home in Mysuru begins here — at Shivadhama Residency."
  },
  contact: {
    title: "Get in Touch",
    subtitle: "Have questions about our apartments? We'd love to hear from you.",
    hours: "9:00 AM - 7:00 PM (Daily)",
    emailTo: "shivadhamamysuru@gmail.com"
  },
  location: {
    title: "The Heart of Mysuru",
    subtitle: "Discover premium, broker-free rental homes in the prestigious Jayalakshmipuram neighborhood.",
    descriptionTitle: "Prime Location, Zero Brokerage",
    descriptionText: "Searching for 'rental homes near me' or 'no broker house for rent in Mysore'? Look no further. Shivadhama Residency is strategically located in Jayalakshmipuram, offering the perfect balance of serenity and city connectivity. By renting directly from the owner, you avoid unnecessary brokerage fees while securing a home in one of Mysuru's safest and most upscale localities. Whether you need a 1BHK, 2BHK, or 3BHK, our homes provide easy access to the Outer Ring Road, Mysore University, and major IT hubs, making your daily commute effortless.",
    nearbyTitle: "What's Nearby?",
    nearbyDesc: "Everything you need is just around the corner from your new rental home.",
    attractionsTitle: "Famous Attractions",
    attractionsDesc: "Explore the heritage of the Royal City from your central location.",
    attractions: [
      { name: "Mysuru Palace", distance: "4.5 km", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80", alt: "The majestic Mysore Palace" },
      { name: "Sri Chamundeshwari Temple", distance: "15 km", image: "https://images.unsplash.com/photo-1621833072559-0010834371b9?w=800&q=80", alt: "Chamundi Hill Temple" },
      { name: "Mysuru Zoo", distance: "5.5 km", image: "https://images.unsplash.com/photo-1557283626-d62f6b83f443?w=800&q=80", alt: "Animals at Mysore Zoo" },
      { name: "St. Philomena's Cathedral", distance: "4.0 km", image: "https://images.unsplash.com/photo-1605218427368-35b820a40237?w=800&q=80", alt: "St. Philomena's Church" }
    ]
  },
  pages: {
    home: [
      { id: 'hero', component: 'HeroSection' },
      { id: 'properties', component: 'PropertiesSection' },
      { id: 'why-love', component: 'WhyTenantsLove' },
      { id: 'map', component: 'MapSection' }
    ],
    about: [],
    location: [],
    contact: [],
    blog: []
  }
};

export const getSiteContent = () => {
  const stored = localStorage.getItem('site_content');
  if (stored) return JSON.parse(stored);
  return initialSiteContent;
};

export const saveSiteContent = (content) => {
  localStorage.setItem('site_content', JSON.stringify(content));
  window.dispatchEvent(new Event('storage-content'));
};
