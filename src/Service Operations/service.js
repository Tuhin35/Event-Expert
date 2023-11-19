

// get all costumes data
export const getCostumes = async () => {

      const response = await fetch(`${process.env.REACT_APP_API_URL}/costumes`);
      const data = await response.json()
      return data
    
}

// get all makeupservice data 
export const getMakeupArtists = async () => {

      const response = await fetch(`${process.env.REACT_APP_API_URL}/makeup-artists`);
      const data = await response.json()
      return data
    
}
//all venue
export const getVenues = async () =>{
    const response = await fetch(`${process.env.REACT_APP_API_URL}/venue`);
    const data = await response.json();
    return data
}
//single person orders
export const getOrder = async (user) =>{
    const response = await fetch(`${process.env.REACT_APP_API_URL}/order?email=${user?.email}`);
    const data = await response.json();
    return data
}
// all orders
export const getOrders = async () =>{
    const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`);
    const data = await response.json();
    return data
}
//get single id
export const getSingleVenue = async (artistId) => {

      const response = await fetch(`${process.env.REACT_APP_API_URL}/venue/${artistId}`);
      const data = await response.json()
      return data
    
}

// get all makeupservice data 
export const getMakeupArtist = async (artistId) => {

      const response = await fetch(`${process.env.REACT_APP_API_URL}/makeup-artists/${artistId}`);
      const data = await response.json()
      return data
    
}
//   get single costumes
export const getCostume = async (costumeId) => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/costumes/${costumeId}`);
      const data = await response.json()
      return data
    
}
// photoGraphy data 

export const getPhotographer = async()=>{
      const response = await fetch(`${process.env.REACT_APP_API_URL}/photography`)
      const data = await response.json()
      return data
}
export const getPhotographerSingle = async(photographerId)=>{
      const response = await fetch(`${process.env.REACT_APP_API_URL}/photography/${photographerId}`)
      const data = await response.json()
      return data
}


// export const getCostumes = async homeData => {
//     const url = `${process.env.REACT_APP_API_URL}/costumnes`

//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json',
//       },
//       body: JSON.stringify(homeData),
//     })

//     const data = await response.json()

//     return data
//   }
