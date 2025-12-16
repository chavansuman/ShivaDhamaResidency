
export const initialPageImages = {
  home: {
    heroBackground: "", // Empty defaults to CSS pattern
  },
  location: {
    heroImage: "https://images.unsplash.com/photo-1658214039954-932c22eebc13",
    mapImage: "https://images.unsplash.com/photo-1624727945121-0e92bbc66a50"
  },
  about: {
    mainImage: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7"
  }
};

export const getPageImages = () => {
  const stored = localStorage.getItem('site_images');
  if (stored) return JSON.parse(stored);
  return initialPageImages;
};

export const savePageImages = (images) => {
  localStorage.setItem('site_images', JSON.stringify(images));
  window.dispatchEvent(new Event('storage-images'));
};
