
// dealing with tokens in client side


export const setAuthToken = (user) => {

    // console.log(user)
    const currentUser = {
        email: user?.email

    }
    console.log(currentUser)
    fetch(`${process.env.REACT_APP_API_URL}/jwt?email=${user?.email}`)
        .then(res => res.json())
        .then(data => {
            console.log("token", data);
            // save to LS
            localStorage.setItem('Eventhive-token', data.token)
        })
}


//to set token every time user sign in or sign up