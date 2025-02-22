import axios from 'axios';

const axiosInstance = axios.create({ 
    baseURL: "http://192.168.1.8:3000", // Change this URL based on your backend
    timeout: 10000, // Timeout after 10 seconds
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      // You can modify request headers here (e.g., add Authorization token)
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API Error:", error.response?.data || error.message);
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;