import React from 'react';
import bannerVdo from '../../Assets/videos/coverr-family-waving-sparklers-around-4496-1080p.mp4';
import { Link } from 'react-router-dom';
const Banner = () => {
    return (
        <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 md:py-16 ">
            <div className="p-1 flex flex-col sm:flex-col md:flex-row gap-8 justify-between items-center">
                <h1 className="text-4xl  lg:text-6xl tracking-normal md:leading-[1.4em] lg:leading-[1.2em] capitalize dark:text-snow-white">
                    Your <span className='gradient-text'>One-Stop-Shop</span> for Memorable Events.

                </h1>
                <div className="">
                    <i className='font-medium block text-lg text-black dark:text-snow-white'> " Find Everything You Need Here "</i>
                    <p className="text-base mb-4 font-inter text-dark-toned dark:text-snow-white-toned">

                        we aims to simplify the entire event planning process for customers and event planners by providing a platform that helps them with everything they need for an event, including event space or venue catering, event dress decoration, and budget planning.
                    </p>

                    <Link to='service' className="btn-primary w-1/2 mx-auto">
                        {/* <svg className="w-5 h-5 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                        </svg> */}

                        <span className="mx-auto">Get started</span>
                    </Link>
                </div>
            </div>


            <div className="max-w-full mx-auto my-12 lg:my-16  shadow-lg ">
                <video src={bannerVdo} autoPlay className='w-full' loop></video>
            </div>

        </div>
    );
};

export default Banner;


// 