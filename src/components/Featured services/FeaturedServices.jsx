import React from 'react'
import ServicesCard from '../Cards/ServicesCard'

const FeaturedServices = () => {



    const Featuredservices = [
        {
            slug: "costume",
            name: "Ceremony Costume",
            desc: "We offer a range of clothing options for various events. You can conveniently purchase suits, Panjabi attire, bridal sarees, and other essentials from us based on your event preferences, especially for weddings and similar occasions.",
            img: "https://cdn.pixabay.com/photo/2017/08/06/20/11/wedding-2595862_960_720.jpg"
        },
        {
            slug: "makeup",
            name: "Makeup & decoraion planning",
            desc: "We offer the services of experienced makeup artists and event decorators who will transform your event venue into a stunning setting. Our team will skillfully apply makeup to give your guests an attractive appearance. They are dedicated to creating a visually appealing atmosphere and ensuring a memorable experience for all attendees.",
            img: "https://cdn.pixabay.com/photo/2016/11/21/16/02/basket-1846135_960_720.jpg"
        },
        {
            slug: "photographers",
            name: "Photographers",
            desc: "We provide professional photographers who can capture and document your event. You can easily find photographers based on your location and hire them for your photography needs.",
            img: "https://cdn.pixabay.com/photo/2014/07/31/22/50/photographer-407068_960_720.jpg"
        },
        {
            slug: "venue",
            name: "Venue Reservation & food",
            desc: "We offer delightful event venues that are perfectly suited to host your event and create lasting memories. Additionally, we provide exceptional food services to complement the occasion.",
            img: "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },

    ]


    return (
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-2 text-center" id='#services'>
            <div className="py-5 px-8 max-w-screen-md mx-auto">
                <h1 className="text-4xl  text-center font-medium mb-6 dark:text-snow-white">
                    Streamline Your Event Planning with Our Comprehensive Services
                </h1>
                <p className="text-base font-inter dark:text-snow-white-toned">
                    From Venues to Vendors: Get Everything You Need for Your Next Event Here
                </p>
            </div>
            <div className="-m-1 flex flex-wrap md:-m-2">
                <div className="flex w-full md:w-1/2 flex-wrap">
                    <ServicesCard data={Featuredservices[0]} width="90%" full="full" alignment="md:mb-2 md:ml-auto md:mr-2 m-2 " />
                    <ServicesCard data={Featuredservices[1]} width="80%" full="full" alignment="md:mb-2 md:ml-auto md:mr-2 m-2 " />

                </div>
                <div className="flex  w-full md:w-1/2 flex-wrap">
                    <ServicesCard data={Featuredservices[2]} width="80%" full="full" alignment="md:mb-2 md:mr-auto md:mr-2 m-2 " />
                    <ServicesCard data={Featuredservices[3]} width="90%" full="full" alignment="md:mb-2 md:mr-auto md:mr-2 m-2 h-[500px]" />



                </div>
            </div>
        </div>
    )
}

export default FeaturedServices
