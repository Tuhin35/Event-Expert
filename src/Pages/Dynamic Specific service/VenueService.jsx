import React, { useEffect, useState } from "react";
import { getVenues } from "../../Service Operations/service";
import { Link } from "react-router-dom";

const VenueService = () => {
  const [venue, setVenue] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getVenues().then((data) => {
      console.log(data);
      setVenue(data.data);
    });
  }, []);
  console.log(venue);

  return (
    <div className="container mx-auto  grid grid-cols-1 lg:grid-cols-3 gap-5">
      {venue?.map((v, i) => (
        <div className="card w-96 bg-base-100 shadow-xl image-full">
          <figure>
            <img className="w-96 h-64" src={v?.bgPicture} alt={v?.event} />
          </figure>
          <div className="card-body text-center p-2">
            <p className="text-2xl font-bold">{v?.agency?.vanueName}</p>
            <h2 className="text-xl font-semibold">Price : {v?.price} BDT</h2>
            <div className="card-actions justify-end">
              <Link to={`/venue/${v._id}`}> <button className="btn btn-primary mx-auto ">Details </button> </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VenueService;
