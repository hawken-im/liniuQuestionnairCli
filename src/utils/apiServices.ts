// apiService.ts
// import { md5 } from 'js-md5'

// const dataSalt = 'shepipi';

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

    try {
      const response = await fetch('http://192.168.0.112:8080/liliu/invest/info/save', {
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