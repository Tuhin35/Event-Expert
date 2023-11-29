
// save user to db

export const saveUser = async (userData) => {
    console.log(userData)
    const url = `${process.env.REACT_APP_API_URL}/user/${userData.email}`
    // const url = `http://localhost:5000/user/${userData.email}`
    console.log(url)
    const res = await fetch(url, {
        method: "PUT",
        headers: {
            'content-type': 'application/json',
            authorization: `bearer ${localStorage.getItem('Eventhive-token')}`,
        },
        body: JSON.stringify(userData),
    })
    const data = await res.json();
    console.log(data)
    return data
}









export const becomeMerchantRequest = async merchantData => {
    // console.log(merchantData)
    const url = `${process.env.REACT_APP_API_URL}/user/${merchantData.email}`;

    const res = await fetch(url, {
        method: "PUT",
        headers: {
            'content-type': 'application/json',
            authorization: `bearer ${localStorage.getItem('Eventhive-token')}`,
        },
        body: JSON.stringify(merchantData),
    })
    const data = await res.json();

    return data
}

export const uploadEvent = async eventData => {
   
    console.log(eventData)
    const url = `${process.env.REACT_APP_API_URL}/upload/${eventData.event}`;

    const res = await fetch(url, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            authorization: `bearer ${localStorage.getItem('Eventhive-token')}`,
        },
        body: JSON.stringify(eventData),
       
    })
    const data = await res.json();
    console.log(data)
    return data
}



// get role from db
export const getRole = async (email) => {
    const url = `${process.env.REACT_APP_API_URL}/user/${email}`;

    const res = await fetch(url)
    const data = await res.json();
    // console.log("role", data)
    return data
}



export const getAllUsers = async () => {

    const res = await fetch(`${process.env.REACT_APP_API_URL}/users`)
    const data = await res.json();
    console.log(data)
    return data


}

export const makeMerchant = async user => {

    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/${user?.email}`,
        {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('Eventhive-token')}`,
            },
            body: JSON.stringify({ role: 'merchant' }),
        }
    )
    const users = await response.json()

    return users
}