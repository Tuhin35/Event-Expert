import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCostumes } from '../../Service Operations/service';

const CostumeService = () => {
    const [costumes, setCostumes] = useState([])
    const router = useParams();
    const { id } = (router)
    useEffect(() => {
        window.scrollTo(0, 0);
        getCostumes().then(data => {
            console.log(data)
            setCostumes(data.data)
        })

    }, [])



    return (
        <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 md:py-16 ">

            <header className="text-center">
                <h2 className="text-xl font-bold text-gray-900 sm:text-3xl dark:text-snow-white">
                    Costumes Collection
                </h2>

                <p className="max-w-md mx-auto mt-4 text-gray-500 dark:text-snow-white-toned">
                    Explore our collections from different reputed brands
                </p>
            </header>

            <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3 ">
                {
                    costumes?.map(costume => (
                        // cards
                        <Link to={`/costumes/${costume?._id}`}>
                            <div className="overflow-hidden rounded bg-white dark:bg-opacity-10 dark:shadow-none text-slate-500 shadow-md shadow-slate-200">
                                {/*  <!--  Image --> */}
                                <figure className='overflow-hidden'>
                                    <img
                                        src={costume?.picture?.[0]}
                                        className="aspect-video w-full object-cover duration-300 ease-out  hover:scale-105"
                                        alt={costume?.clothName}
                                    />
                                </figure>
                                {/*  <!-- Body--> */}
                                <div className="p-6">
                                    <header className="">
                                        <h3 className="text-xl font-medium text-slate-700 dark:text-snow-white">
                                            {costume?.agency?.agencyName}
                                        </h3>
                                        <p className="text-sm font-bold text-green-300 dark:text-snow-white-toned font-inter">
                                            {costume?.category}

                                        </p>
                                        <p className="text-md font-inter text-indigo-500">{costume.price} BDT</p>
                                    </header>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </ul>


        </div >
    );
};

export default CostumeService;