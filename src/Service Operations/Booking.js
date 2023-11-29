

export const BookService = async bookingsData => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/items`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            authorization: `bearer ${localStorage.getItem('Eventhive-token')}`,
        },
        body: JSON.stringify(bookingsData),
    })

    const data = await response.json()
    return data
}

export const makeAdmin = async id => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/user/admin/${id}`,
        {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('Eventhive-token')}`
            },
            body: JSON.stringify({ role: 'admin' }),

        }
    )
    const data = await response.json()
    return data

}