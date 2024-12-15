// apiService.ts

export const postData = async (data: any) => {
    try {
      const response = await fetch('localhost:8080/liliu/invest/info/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
      throw error; // Re-throw the error to be handled by the caller
    }
  };