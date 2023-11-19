import React from 'react'
import Slider from 'react-slick'

export const Brands = () => {
    const imgs = [
        { src: 'https://www.svgrepo.com/show/303605/zara-logo.svg', name: 'zara' },
        { src: 'https://www.svgrepo.com/show/305958/dior.svg', name: 'dior' },
        { src: 'https://www.svgrepo.com/show/303252/chanel-2-logo.svg', name: 'channel' },
        { src: 'https://www.svgrepo.com/show/330039/bata.svg', name: 'bata' },
        { src: 'https://www.svgrepo.com/show/443275/brand-nike.svg', name: 'nike' },
        { src: 'https://www.svgrepo.com/show/303462/versace-medusa-2-logo.svg', name: 'Calvin Klein' },
        { src: 'https://www.svgrepo.com/show/303646/burberry-3-logo.svg', name: 'Burberry' },

    ]
    const settings = {
        // dots: true,
        infinite: true,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
    }
    return (

        <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 md:py-8">
            <div className="container relative z-[1] m-auto px-6 md:px-12">



                <Slider {...settings}>
                    {
                        imgs.map((img, i) => <div key={i}
                            className="max-w-[150px] group rounded-xl hover:border  hover:dark:border-slate-600 bg-white bg-opacity-5 py-2 px-4 hover:bg-opacity-10"
                        >
                            <img
                                src={img.src}
                                className="contrast-0 transition group-hover:contrast-100 w-full dark:hover:contrast-200"

                                alt={img.name}
                            />
                        </div>)
                    }
                </Slider>

            </div>
        </div>
    )
}

/*
 initial={{ y: 60, opacity: 0, }}
                        whileInView={{ y: 0, opacity: 100 }}
                        transition={{
                            delay: 0.2,
                            x: { type: 'spring', stiffness: 60, },
                            opacity: { duration: 1.6 },
                            ease: 'easeIn',
                            duration: 1
                        }}


*/