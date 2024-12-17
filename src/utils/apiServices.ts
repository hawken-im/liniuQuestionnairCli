// apiService.ts
import { API_BASE_URL, API_ENDPOINT, API_PROD_URL } from "@/apiConfig";
// import { md5 } from 'js-md5'
// const dataSalt = 'shepi';

export const postData = async (data: any) => {
    // Add a salt to the data
    // const saltedData = { ...data, salt: dataSalt };
    // //sort the data
    // const sortedData = Object.keys(saltedData).sort().reduce((acc: { [key: string]: any }, key) => {
    //   acc[key] = data[key];
    //   return acc;
    // }, {});
    // // md5 hash the data
    // // TODO:注意按照utf8编码的顺序对data进行md5加密
    // const hash = md5(JSON.stringify(sortedData));
    console.log('url:', `${API_BASE_URL}${API_ENDPOINT}`);
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Post request successful:', result);
      return result; // Return the response data
    } catch (error) {
      console.error('Error posting data:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  };