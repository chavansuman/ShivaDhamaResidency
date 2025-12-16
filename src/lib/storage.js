
import { supabase } from '@/lib/customSupabaseClient';

/**
 * Uploads a file to Supabase Storage
 * @param {File} file - The file object to upload
 * @param {string} bucket - The bucket name (default: 'property-images')
 * @returns {Promise<string>} - The public URL of the uploaded file
 */
export const uploadFile = async (file, bucket = 'property-images') => {
  try {
    // 1. Create a unique file name
    // Sanitize filename to remove special chars that might cause issues
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 10);
    const filePath = `${timestamp}-${randomString}-${sanitizedName}`;

    // 2. Upload the file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase storage upload error:', error);
      
      // Attempt to handle "Bucket not found" by creating it (if permissions allow)
      if (error.message && error.message.includes('Bucket not found')) {
        try {
           await supabase.storage.createBucket(bucket, { public: true });
           // Retry upload once
           const { data: retryData, error: retryError } = await supabase.storage
             .from(bucket)
             .upload(filePath, file);
             
           if (retryError) throw retryError;
        } catch (bucketError) {
           console.error('Failed to create bucket or retry upload:', bucketError);
           throw new Error('Storage bucket missing and could not be created. Please contact admin.');
        }
      } else {
        throw error;
      }
    }

    // 3. Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error(error.message || 'Failed to upload image. Please try again.');
  }
};
