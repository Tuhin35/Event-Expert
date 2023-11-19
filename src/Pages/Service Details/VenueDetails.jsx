import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams  } from "react-router-dom";
import { getSingleVenue } from "../../Service Operations/service";
import Order from "../Orders/Order/Order";
import { AuthContext } from "../../Contexts/AuthProvider";

const VenueDetails = () => {
  const [venue, setVenue] = useState({});
  const router = useParams();
  const costumeId = router.id;
  const {user} = useContext(AuthContext)
  const name = user?.displayName;
  const email = user?.email;

  useEffect(() => {
    window.scrollTo(0, 0);
    getSingleVenue(costumeId).then((data) => {
      setVenue(data.data);
    });
  }, [costumeId]);
  console.log(venue);
 const navigate = useNavigate();
  const postData = (e) => {
    e.preventDefault();
    const { event,  price, agency, rating } = venue;
    fetch(`${process.env.REACT_APP_API_URL}/orders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        event,    
        price,
        email,
        name,
        agencyName: agency?.vanueName,
        location: agency?.location?.address,
        contact:agency?.contact?.phone,
        rating,
      }),
    });
    navigate(`/orders`)
  };
 


  return (
    <div className="container  mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5">
      <div className="col-span-4 mx-auto">
        <p className="text-xl font-semibold">{venue?.des}</p>
        <p className="text-center text-3xl font-bold p-5">{venue?.vanueName}</p>
        <div className="grid grid-cols-2 text-center my-5">
          <p className="text-xl font-semibold">Price: {venue?.price} BDT</p>
          <p className="text-xl font-semibold">Rating: {venue?.rating}</p>
        </div>
        <Link>
          <button onClick={postData} className="btn btn-primary  h-8 mx-auto">
            Booking
          </button>
        </Link>
      </div>
      <div className="grid col-span-7">
        <div className="grid grid-cols-2 gap-4">
          {venue?.pictures?.map((img, i) => (
            <img className={`h-64 w-full `} alt={""} src={img}></img>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;
