/**
 * Uploads a file to a custom API that accepts base64-encoded images
 * @param {File} file - The file object to upload
 * @param {string} apiUrl - The API endpoint to send the image to
 * @returns {Promise<string>} - The public URL of the uploaded file
 */
export const uploadFile = async (file, apiUrl) => {
  try {
    // 1. Convert file to Base64
    const base64Data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Remove the "data:<type>;base64," prefix
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });

    // 2. Create JSON payload
    const payload = {
      content: base64Data,
      filename: file.name,
      content_type: file.type,
    };

    // 3. Send POST request using simple fetch
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${errorText}`);
    }

    const data = await response.json();

    if (!data.uploaded_image || !data.uploaded_image.url) {
      throw new Error('API response does not contain uploaded image URL');
    }

    // 4. Return the uploaded image URL
    return data.uploaded_image.url;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error(error.message || 'Failed to upload image. Please try again.');
  }
};
