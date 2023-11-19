import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMakeupArtist } from "../../Service Operations/service";
import { AuthContext } from "../../Contexts/AuthProvider";

const MakeupServiceDetails = () => {
  const [makeupArtist, SetMakeupArtist] = useState([]);
  const { agency, category , pictures, price, rating } =
    makeupArtist;
  const router = useParams();
  const navigate = useNavigate();
  const costumeId = router.id;
  useEffect(() => {
    window.scrollTo(0, 0);
    getMakeupArtist(costumeId).then((data) => {
      console.log(data.data);
      SetMakeupArtist(data.data);
    });
  }, [costumeId]);

  const {user} = useContext(AuthContext)
  const name = user?.displayName;
  const email = user?.email;

  const postData = (e) => {
    e.preventDefault();
    const { event, price, agency, Rating } = makeupArtist;
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
        agencyName: agency?.agencyName,
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
          <div className="grid gap-8 lg:grid-cols-4 lg:items-start">
            <div className="lg:col-span-3">
              {/* <div className="relative mt-4">
                <figure className="overflow-hidden">
                  <img
                    alt={agency?.agencyName}
                    src={pictures && pictures[0]}
                    className="h-72 w-full rounded-xl object-cover lg:h-[540px] hover:scale-110 duration-300 cursor-pointer"
                  />
                </figure>

                <div className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full bg-black/75 px-3 py-1.5 text-white">
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>

                  <span className="ms-1.5 text-xs"> Hover to zoom </span>
                </div>
              </div> */}

              <ul className="mt-1 grid grid-cols-3 gap-1">
                {pictures?.map((pic, i) => {
                  console.log(pic);

                  return (
                    <li li key={i}>
                      <img
                        alt={agency?.agencyName}
                        src={pic}
                        className="h-64 w-full rounded-md object-cover"
                      />
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="lg:sticky lg:top-0">
              <form className="space-y-4 lg:pt-8">
                <>
                  <div>
                    <h1 className="text-2xl font-bold lg:text-3xl dark:text-snow-white">
                      {agency?.agencyName}
                    </h1>

                    <p className="mt-1 text-sm text-gray-500 font-inter dark:text-snow-white-toned">
                      Makeup Type: {category}
                    </p>
                  </div>
                </>

                <div className="rounded border bg-gray-100 p-4">
                  <p className="text-sm ">
                    <span className="block font-semibold dark:text-snow-white-toned">
                      {" "}
                      Rating-❤{rating}
                    </span>
                    <span className="block dark:text-snow-white-toned font-inter">
                      {" "}
                      📞 {agency?.contact?.phone}.{" "}
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
                  onClick={postData}
                  type="submit"
                  className="btn-primary"
                >
                  Hire now
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

export default MakeupServiceDetails;
