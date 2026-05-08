// Cloudinary Configuration
export const CLOUDINARY_CONFIG = {
  // Cloudinary credentials
  CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dqmhtibfx',
  UPLOAD_PRESET: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ompickles_preset',
  API_KEY: '347819315697656',
  API_SECRET: 'tQMhJ2mvg3xuHrErDnayR1wqh3Q',
  
  // Upload settings
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FORMATS: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
  
  // Transformation settings for product images
  TRANSFORMATIONS: {
    thumbnail: 'w_150,h_150,c_fill,q_auto,f_auto',
    medium: 'w_400,h_400,c_fill,q_auto,f_auto',
    large: 'w_800,h_800,c_fill,q_auto,f_auto'
  }
};

// Helper function to get upload URL
export const getCloudinaryUploadUrl = () => {
  return `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.CLOUD_NAME}/image/upload`;
};

// Helper function to transform image URL
export const transformImageUrl = (url, transformation = 'medium') => {
  if (!url || !url.includes('cloudinary.com')) return url;
  
  const transformationString = CLOUDINARY_CONFIG.TRANSFORMATIONS[transformation];
  if (!transformationString) return url;
  
  return url.replace('/upload/', `/upload/${transformationString}/`);
};