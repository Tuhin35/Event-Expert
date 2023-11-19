import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCostume } from "../../Service Operations/service";
import { AuthContext } from "../../Contexts/AuthProvider";

const CostumeDetails = () => {
  const [costumesData, SetCostumesData] = useState({});
  const {
    
    event,
    agency,
    picture,
    price,
    rating,
    size,
    _id,
    category,
  } = costumesData;
  const router = useParams();
  const { user } = useContext(AuthContext);
  const name = user?.displayName;
  const email = user?.email;
  const navigate = useNavigate();
  const costumeId = router.id;
  const agencyName = agency?.agencyName;
  useEffect(() => {
    window.scrollTo(0, 0);
    getCostume(costumeId).then((data) => {
      // console.log(data.data);
      SetCostumesData(data.data);
    });
  }, [costumeId]);
  const postData = (e) => {
    e.preventDefault();
    // const { event, clothName , brandName , price, location, contact, rating } = costumesData;
   
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
        agencyName,
        location: agency?.location?.address,
        contact: agency?.contact?.phone,
        rating,
      }),
    });
    navigate(`/orders`);
  };
  return (
    <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 md:py-16 ">
      <section>
        <div className="relative mx-auto max-w-screen-xl px-4 py-8">
          <div>
            <h1 className="text-2xl font-bold lg:text-3xl dark:text-snow-white">
              {agencyName}
            </h1>

            <p className="mt-1 text-sm text-gray-500 font-inter dark:text-snow-white-toned">
              Category: {category}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-4 lg:items-start">
            <div className="lg:col-span-3">
              <div className="relative mt-4">
                <ul className="mt-1 grid grid-cols-3 gap-1">
                  {picture?.map((pic, i) => {
                    console.log(pic);

                    return (
                      <li li key={i}>
                        <img
                          alt={''}
                          src={pic}
                          className="h-64 w-full rounded-md object-cover"
                        />
                      </li>
                    );
                  })}
                </ul>

               
              </div>
            </div>

            <div className="lg:sticky lg:top-0">
              <form className="space-y-4 lg:pt-8">
                <fieldset>
                  <legend className="text-lg font-bold dark:text-snow-white">
                    {agencyName}
                  </legend>

                  <div className="mt-2 flex flex-wrap gap-1 flex items-center gap-4">
                    <p className="cursor-pointer ">
                      <span className="font-medium tracking-wide bg-amber-400 block rounded-full   px-3 py-1 text-xs peer-checked:bg-gray-100">
                        {agencyName}
                      </span>
                    </p>
                    <p className="">
                      <span className=" border border-cyan-300 block rounded-full   px-3 py-1 text-xs dark:text-snow-white-toned">
                        ❤ {rating}
                      </span>
                    </p>
                  </div>
                </fieldset>

                <div className="rounded border bg-gray-100 p-4">
                  <p className="text-sm ">
                    <span className="block dark:text-snow-white-toned">
                      {" "}
                      Size-{size}
                    </span>
                    <span className="block dark:text-snow-white-toned">
                      {" "}
                      Delivery charge 200 BDT.{" "}
                    </span>

                    {/* <a href="" className="mt-1 inline-block underline"> Find out more </a> */}
                  </p>
                </div>

                <div>
                  <p className="text-xl font-bold font-inter dark:text-snow-white">
                    {price} BDT
                  </p>
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  onClick={postData}
                >
                  Buy now
                </button>
              </form>
            </div>

            <div className="lg:col-span-3">
              <div className="prose max-w-none dark:text-snow-white-toned">
                <p>built with best quality materials</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CostumeDetails;
