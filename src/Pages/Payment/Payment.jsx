import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigation, useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
// import Loading from '../Loader/Loading';

const stripePromise = loadStripe('pk_test_51N3foiGn4oE3WVXCXuWUa81lLAsKL1UKB57oDZDZLPCMn1oe5HJOsQAsk6G9PFRytzqIZTRXMCHwbSBHS4fhvDTA00eurMaCKb')

const Payment = () => {
   const [order,setOrder] = useState([])
   const {id} = useParams();
   useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/${id}`)
      .then(res => res.json())
      .then(data => setOrder(data))
      .catch(error => console.error('Error fetching order:', error));
  }, [id]);
    console.log(order)
     const navigation = useNavigation()
    // console.log('booking' , booking)
    const {_id,agencyName,price,event,email,contact} = order;
    if (navigation.state==="loading") {
        
    }
    return (
        <div>
            <h2 className="text-3xl">Payment For {agencyName} {event}</h2>
           
            <p className='text-xl'>Price {price} </p>
           
        <div className='w-96 my-6'>
            <Elements stripe={stripePromise}>
                <CheckoutForm
                order={order}
                ></CheckoutForm>
            </Elements>
        </div>
        </div>
    );
};

export default Payment;
