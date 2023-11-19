import React from 'react'
import { FaHandshake } from 'react-icons/fa'
import { MdOutlineBookmarkAdd } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

const UserMenus = () => {
    return (
        <>
           
            <li>
                <NavLink
                    to="my-bookings"
                    aria-label="become admin"
                    className={({ isActive }) => `bg-gradient-to-r text-[14px]  relative flex items-center  space-x-6 rounded-md  px-4 py-3 font-inter  ${isActive ? 'from-sky-600 to-cyan-400 text-white ' : ' bg-snow-white-toned text-slate-900'} `}
                >
                    <MdOutlineBookmarkAdd size={24} />
                    <span className="-mr-1 font-medium">All Bookings</span>
                </NavLink>
            </li>
        </>
    )
}

export default UserMenus
