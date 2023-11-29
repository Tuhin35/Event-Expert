/*
we need here:
- name 
- phone no:
- mail:
- NID:
- businestype(drop)
- description:
- Address
- district
- Featured_servcice_image

*/

import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Contexts/AuthProvider";
import { getImageUrl } from "../../../Service Operations/ImageUpload";
import {
  becomeMerchantRequest,
  getRole,
  uploadEvent,
} from "../../../Service Operations/manageusers";
import SmallSpinner from "../../../components/Spinners/SmallSpinner";

const BecomeMerchant = () => {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    getRole(user?.email).then((data) => {
      setRole(data?.role);
      setLoading(false);
    });
  }, [user?.email]);

  const { register, reset, handleSubmit } = useForm();

  const uploadEventData = async (data) => {
    try {
      const { address, businessCategory, agencyEmail, district, phoneNum, price, rating, agencyName, serviceCategory, pictures } = data;
  
     let collection = []
      console.log(businessCategory)
     for (let index = 0; index < pictures.length; index++) {
       const imageUrl = await getImageUrl(pictures[index]); 
       
        console.log(index)
        collection.push(imageUrl)
        console.log(collection)
     }
     
     const eventData = {
              rating,
              price,
              category: serviceCategory,
              event: businessCategory,
              pictures:collection,
              agency: {
                agencyName,
                location: {
                  address,
                  district
                },
                contact: {
                  phone: phoneNum,
                  email: agencyEmail
                }
              }
            };
      
            setLoading(true);
      
            const uploadResult = await uploadEvent(eventData);
      
            if (uploadResult.acknowledged) {
              toast.success("Your data is uploaded");
              setLoading(false);
            }
        
    
    } catch (error) {
      console.error('Error uploading event data:', error.message);
     
    }
  };
  






  const handleBecomeMerchant = async(data) => {
    const {NID , address, businessCategory, agencyEmail, district, phoneNum, price, rating, agencyName, serviceCategory, pictures } = data;
    const image = data.image[0];
    const formData = new FormData();
    console.log("formData",formData)
    formData.append("image", image);
    getImageUrl(image).then( async (data) => {
      setLoading(true);
      console.log(data);
     
      let collection = []
      console.log(businessCategory)
     for (let index = 0; index < pictures.length; index++) {
       const imageUrl = await getImageUrl(pictures[index]); 
       
        console.log(index)
        collection.push(imageUrl)
        console.log(collection)
     }
      const merchantRequestData = {
        email: user.email,
        name: user?.displayName,
        image: user?.photoURL,
        role: "requested",
        merchantData: {
           eventData:{
            NID,
            rating,
            price,
            category: serviceCategory,
            event: businessCategory,
            pictures:collection,
            agency: {
              agencyName,
              location: {
                address,
                district
              },
              contact: {
                phone: phoneNum,
                email: agencyEmail
              }
            }
          },
          lisenceImage: data,
        },
      };
      console.log(merchantRequestData);
      becomeMerchantRequest(merchantRequestData).then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success(
            "Request to become merchant has been sent to Admin. wait for accpetence! "
          );
          setLoading(false);
        }
      });
      console.log(merchantRequestData);
    });
  };
  return (
    <>
      <h1 className="text-3xl font-medium tracking-normal dark:text-snow-white py-2.5 mb-4">
        Fill up this form to become a merchant in our system
      </h1>
      <hr className="h-[2px] bg-gradient-to-t from-cyan-400 to-indigo-500 w-[100px]" />
      <div className="flex justify-center py-10">
        <div className="w-full max-w-md p-8 space-y-3 text-gray-800 rounded-xl bg-gray-50 shadow">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(handleBecomeMerchant)}
          >
            <div className="space-y-1 text-sm">
              <label
                htmlFor="NID no"
                className="block text-gray-600 dark:text-snow-white"
              >
                NID no{" "}
              </label>
              <input
                className="form-input-dashboard"
                name="NID no"
                id="NID no"
                type="text"
                placeholder="88803*********"
                {...register("NID")}
              />
            </div>
            <div className="flex justify-between items-center gap-5">
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="Agency Name"
                  className="block text-gray-600 dark:text-snow-white"
                >
                  Agency Name{" "}
                </label>
                <input
                  className="form-input-dashboard"
                  name="Agency Name"
                  id="Agency Name"
                  type="text"
                  placeholder="88803*********"
                  {...register("agencyName")}
                />
              </div>{" "}
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="Agency Email"
                  className="block text-gray-600 dark:text-snow-white"
                >
                  Agency Email{" "}
                </label>
                <input
                  className="form-input-dashboard"
                  name="Agency Email"
                  id="Agency Email"
                  defaultValue={user?.email}
                  type="text"
                  placeholder=""
                  {...register("agencyEmail")}
                />
              </div>
            </div>
            <div className="flex justify-between items-center gap-5">
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="Phone number"
                  className="block text-gray-600 dark:text-snow-white"
                >
                  Phone number
                </label>
                <input
                  className="form-input-dashboard"
                  name="Phone number"
                  id="Phone number"
                  type="tel"
                  placeholder="+8801*********"
                  {...register("phoneNum")}
                />
              </div>
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="service Category"
                  className="block text-gray-600 dark:text-snow-white"
                >
                  service Category{" "}
                </label>
                <input
                  className="form-input-dashboard"
                  name="service Category"
                  id="service Category"
                  type="text"
                  placeholder="Enter service category type"
                  {...register("serviceCategory")}
                />
              </div>
            </div>
            <div className="flex justify-between items-center gap-5">
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="price"
                  className="block text-gray-600 dark:text-snow-white"
                >
                  Price{" "}
                </label>
                <input
                  className="form-input-dashboard"
                  name="price"
                  id="price"
                  type="number"
                  placeholder="Enter price in BDT"
                  {...register("price")}
                />
              </div>
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="rating"
                  className="block text-gray-600 dark:text-snow-white"
                >
                  Rating{" "}
                </label>
                <input
                  className="form-input-dashboard"
                  name="rating"
                  id="rating"
                  type="text"
                  placeholder="Google rating in your agency"
                  {...register("rating")}
                />
              </div>
            </div>
            <div className="flex justify-between items-center gap-5">
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="business category"
                  className="block text-gray-600 dark:text-snow-white"
                >
                  Business Category{" "}
                </label>
                <select
                  className="form-input-dashboard"
                  {...register("businessCategory")}
                >
                  <option selected disabled>
                    Service category
                  </option>
                  <option className="text-slate-800 bg-white text-md dark:bg-opacity-10">
                    Photographer
                  </option>
                  <option className="text-slate-800 bg-white text-md dark:bg-opacity-10">
                    Venue & food
                  </option>
                  <option className="text-slate-800 bg-white text-md dark:bg-opacity-10">
                    Costumes
                  </option>
                  <option className="text-slate-800 bg-white text-md dark:bg-opacity-10">
                    Makeup & decoration
                  </option>
                </select>
              </div>
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="district"
                  className="block text-gray-600 dark:text-snow-white"
                >
                  District{" "}
                </label>
                <select
                  className="form-input-dashboard"
                  {...register("district")}
                >
                  <option selected disabled>
                    Select District
                  </option>
                  <option className="text-slate-800 bg-white text-md dark:bg-opacity-10">
                    Bogura
                  </option>
                  <option className="text-slate-800 bg-white text-md dark:bg-opacity-10">
                    Rajshahi
                  </option>
                  <option className="text-slate-800 bg-white text-md dark:bg-opacity-10">
                    Khulna
                  </option>
                  <option className="text-slate-800 bg-white text-md dark:bg-opacity-10">
                    Chittagong
                  </option>
                </select>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <label
                htmlFor="Address"
                className="block text-gray-600 dark:text-snow-white"
              >
                Address
              </label>
              <input
                className="form-input-dashboard"
                name="Address"
                id="Address"
                type="text"
                placeholder="Dhaka 1002, 2no sector ,10 no road"
                {...register("address")}
              />
            </div>

            <div className="space-y-1 text-sm">
              <>
                <label
                  htmlFor=""
                  className="text-base block  text-gray-900 py-2 dark:text-snow-white-toned"
                >
                  Upload your event Pictures
                </label>
                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                  <span className="sr-only">
                    Upload your event related pictures
                  </span>
                  <input
                    type="file"
                    className="block w-full text-sm text-gray-500 dark:text-snow-white-toned file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white dark:file:text-white hover:file:bg-blue-600"
                    {...register("pictures", {
                      required: "At least one picture is required.",
                    })}
                    multiple // Allow multiple file selection
                  />
                </div>
              </>
            </div>
            <div className="space-y-1 text-sm">
              <>
                <label
                  for=""
                  className="text-base block  text-gray-900 py-2 dark:text-snow-white-toned"
                >
                  {" "}
                  Upload your business lisence
                </label>
                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                  <span className="sr-only">Upload your business lisence</span>
                  <input
                    type="file"
                    className="block w-full text-sm text-gray-500 dark:text-snow-white-toned file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white dark:file:text-white hover:file:bg-blue-600"
                    {...register("image")}
                  />
                </div>
              </>
            </div>

            <div>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" required />
                <span className="block ml-2 text-xs font-medium text-gray-700 cursor-pointer dark:text-snow-white-toned">
                  Agree to Privacy Policy
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="block w-full p-3 text-center 
              font-medium tracking-wide text-white
               transition duration-200 rounded shadow-md 
               primary-gradient hover:bg-gray-200 
               hover:text-gray-700 focus:shadow-outline
                focus:outline-none"
            >
              {loading ? <SmallSpinner /> : "Submit Request"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BecomeMerchant;
