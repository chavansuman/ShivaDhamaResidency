/**
 * API Configuration
 * Centralized configuration for all API endpoints
 */

const API_CONFIG = {
    // AWS API Gateway endpoints
    aws: {
        baseUrl: 'https://iq6wije0mf.execute-api.us-east-1.amazonaws.com',
        endpoints: {
            login: '/login',
            listProperties: '/list-properties',
            updateProperty: '/update-property',
            uploadImage: '/upload-image',
            // deleteProperty: '/delete-property',
            // addProperty: '/add-property',
        }
    },

    // Default headers for API requests
    headers: {
        'Content-Type': 'application/json',
    },

    // Request timeout in milliseconds
    timeout: 10000,
};

/**
 * Helper function to get full API URL
 * @param {string} endpoint - The endpoint key from API_CONFIG.aws.endpoints
 * @returns {string} Full URL
 */
export const getApiUrl = (endpoint) => {
    const endpointPath = API_CONFIG.aws.endpoints[endpoint];
    if (!endpointPath) {
        console.warn(`Endpoint "${endpoint}" not found in API configuration`);
        return '';
    }
    return `${API_CONFIG.aws.baseUrl}${endpointPath}`;
};

/**
 * Helper function to get default headers
 * @returns {Object} Headers object
 */
export const getApiHeaders = () => {
    return { ...API_CONFIG.headers };
};

export default API_CONFIG;
