export const getImageUrl = async image => {
    console.log('Images data:', image);
    
   
    try{
        const formData = new FormData()
        formData.append('image', image)
    
        const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_key}`
    
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        })
        const data = await response.json()
        console.log(data);
        return data.data.display_url
    }
    catch (error) {
        console.error('Error uploading images:', error.message);
        // Handle the error as needed (e.g., show a user-friendly message)
        throw error; // Propagate the error to the caller
      }
}
export const getPictureUrl = async (images) => {
    console.log('Images data:', images);
    const imageUrls = [];
  
    try {
      for (const image of images) {
        const formData = new FormData();
        formData.append('image', image);
  
        const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_key}`;
  
        const response = await fetch(url, {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error(`Image upload failed with status ${response.status}`);
        }
  
        const data = await response.json();
  
        if (!data || !data.data || !data.data.display_url) {
          throw new Error('Invalid response from ImgBB API');
        }
  
        console.log(data);
        imageUrls.push(data.data.display_url);
      }
  
      return imageUrls;
    } catch (error) {
      console.error('Error uploading images:', error.message);
      // Handle the error as needed (e.g., show a user-friendly message)
      throw error; // Propagate the error to the caller
    }
  };
  