import React from 'react'
import { CgPlayListAdd } from "react-icons/cg"
import { MdOutlineBookmarkAdd } from "react-icons/md"
import { FaHandshake } from "react-icons/fa"
import { NavLink } from 'react-router-dom'
const BusinessOwnerMenu = () => {
    return (
        <>
            <li>
                <NavLink
                    to="my-bookings"
                    aria-label="become merchant"
                    className={({ isActive }) => `bg-gradient-to-r text-[14px]  relative flex items-center  space-x-6 rounded-md  px-4 py-3 font-inter  ${isActive ? 'from-sky-600 to-cyan-400 text-white ' : ' bg-snow-white-toned text-slate-900'} `}
                >
                    <MdOutlineBookmarkAdd size={24} />
                    <span className="-mr-1 font-medium">My Bookings</span>
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="add-costumes"
                    aria-label="add-costumes"
                    className={({ isActive }) => `bg-gradient-to-r text-[14px]  relative flex items-center  space-x-6 rounded-md  px-4 py-3 font-inter  ${isActive ? 'from-sky-600 to-cyan-400 text-white ' : ' bg-snow-white-toned text-slate-900'} `}
                >
                    <CgPlayListAdd size={24} />
                    <span className="-mr-1 font-medium">Add Events</span>
                </NavLink>
            </li>


        </>
    )
}

export default BusinessOwnerMenu
