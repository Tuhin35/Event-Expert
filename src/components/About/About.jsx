import React from 'react';

const About = () => {
    return (
        <section className="py-10  sm:py-16 lg:py-24">
            <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="grid items-center md:grid-cols-2 gap-y-10 md:gap-x-20">
                    <div className="pr-12 sm:pr-0 ">
                        <div className="relative max-w-xs mb-12">
                            <img className="object-left-top rounded-md" src="https://images.pexels.com/photos/3321796/pexels-photo-3321796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />

                            <img className="absolute origin-bottom-right scale-75 rounded-md -bottom-12 -right-[7rem]" src="https://images.pexels.com/photos/4345104/pexels-photo-4345104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl dark:text-snow-white">Grow business with us.</h2>
                        <p className="mt-4 text-base leading-relaxed text-dark-toned dark:text-snow-white-toned font-inter ">We are not only solution providers but also proving opportunities to other to do business with us.Basically they will be our solution source like venue 💒, dressing costume 💍, food service 🍽 etc.</p>



                        <div className="grid gap-10 row-gap-8 lg:grid-cols-3 py-10">
                            <div>
                                <div className="flex">
                                    <h6 className="mr-2 text-4xl font-bold md:text-5xl text-slate-800
                                    dark:text-snow-white">
                                        20+
                                    </h6>
                                    <div className="flex items-center justify-center rounded-full bg-teal-400 w-7 h-7 ">
                                        <svg
                                            className="text-blue-900 w-7 h-7"
                                            stroke="currentColor"
                                            viewBox="0 0 52 52"
                                        >
                                            <polygon
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                fill="none"
                                                points="29 13 14 29 25 29 23 39 38 23 27 23"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <p className="mb-2 font-bold md:text-lg text-dark-toned dark:text-snow-white-toned">Successfull Events</p>

                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </section>


    );
};

export default About;


// put star in bg or png