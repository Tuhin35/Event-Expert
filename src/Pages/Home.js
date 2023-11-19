import React from 'react'
import About from '../components/About/About'
import Banner from '../components/Banner/Banner'
import { Brands } from '../components/Brands/Brands'
import { Faq } from '../components/Faq/Faq'
import FeaturedServices from '../components/Featured services/FeaturedServices'
import { Pricing } from '../components/Pricing/Pricing'
import Testimonials from '../components/Testimonials/Testimonials'




export const Home = () => {
    return (
        <div className="min-h-screen max-w-screen-2xl mx-auto transition-colors duration-[2000ms] ease-in-out">
            <Banner />
            <Brands />
            <About />
            <FeaturedServices />
            <Testimonials />
            <Pricing />
            <Faq />
        </div>
    )
}
