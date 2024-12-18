// apiService.ts
//import { API_BASE_URL, API_ENDPOINT } from "@/apiConfig";
import config from "@/resources/config.json";

export const postData = async (data: any) => {
    //read the url from config.json:
    const { API_BASE_URL, API_ENDPOINT } = config;

    console.log('url:', `${API_BASE_URL}${API_ENDPOINT}`);
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //stringify the data
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Post request successful:', result);
      return result; // Return the response data
    
    } catch (error) {
      console.error('Error posting data:', error);
      if (error instanceof TypeError) {
        // Network error or fetch API error
        return { success: false, error: 'Network error' }; 
      } else if (error instanceof Error) {
        // HTTP error or other errors
        return { success: false, error: error.message };
      } else {
        // Unknown error
        return { success: false, error: 'An unknown error occurred' };
      }
  }
  };