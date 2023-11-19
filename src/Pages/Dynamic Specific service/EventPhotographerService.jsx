import React, { useEffect, useState } from 'react'
import { getPhotographer } from '../../Service Operations/service';
import { Link } from 'react-router-dom';

const EventPhotographerService = () => {
    const [photography,setPhotography] = useState([])
    useEffect((()=>{
        window.scrollTo(0, 0);
        getPhotographer().then(data=>{
            setPhotography(data?.data)
        })
    }),[])
    return (
        <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 md:py-16 ">

            <header className="text-center">
                <h2 className="text-xl font-bold text-gray-900 sm:text-3xl dark:text-snow-white">
                Best Photographer
                </h2>

                <p className="max-w-md mx-auto mt-4 text-gray-500 dark:text-snow-white-toned">
                    Explore our collections from different reputed brands
                </p>
            </header>

            <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3">
                {
                    photography?.map( p => (
                        // cards
                        <Link to={`/photographers/${p?._id}`}>
                            <div className="service-card">
                                {/*  <!--  Image --> */}
                                <figure className='overflow-hidden'>
                                    <img
                                        src={p?.pictures?.[0]}
                                        className="aspect-video w-full object-cover duration-300 ease-out  hover:scale-105"
                                        alt={p?.name}
                                    />
                                </figure>
                                {/*  <!-- Body--> */}
                                <div className="p-6">
                                    <header className="">
                                        <h3 className="text-xl font-medium text-slate-700 dark:text-snow-white">
                                            {p?.agency?.agencyName}
                                        </h3>
                                        <p className="text-sm text-slate-400 dark:text-snow-white-toned font-inter">
                                            ❤ {p.Rating}

                                        </p>
                                        <p className="text-md font-inter text-indigo-500">{p.price} BDT</p>
                                    </header>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </ul>


        </div >
    )
}

export default EventPhotographerService
