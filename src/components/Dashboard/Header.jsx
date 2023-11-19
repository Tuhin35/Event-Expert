import React, { useContext } from 'react';
import DayNightToggle from 'react-day-and-night-toggle';
import { HiBars3BottomLeft } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import { themeContext } from '../../Contexts/ThemeProvider';
const Header = ({ sidebarOpen, setSidebarOpen }) => {
    const { isDark, toggleTheme } = useContext(themeContext)
    return (
        <header className='sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none'>
            <div className='flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11'>
                <div className='flex items-center gap-2 sm:gap-4 '>
                    {/* <!-- Hamburger Toggle BTN --> */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setSidebarOpen(!sidebarOpen)
                        }}
                        className='block z-[99999]  rounded-sm dark:border bg-white p-1.5 shadow-sm dark:border-dark-toned dark:bg-snow-white lg:hidden'
                    >
                        <HiBars3BottomLeft className=' text-2xl ' />
                    </button>
                    {/* <!-- Hamburger Toggle BTN --> */}

                    <Link to="/" title="home">
                        <img src="images/logo.svg" className="w-32" alt="EventHive logo" />
                    </Link>
                </div>



                <div className='flex items-center gap-3 '>
                    <ul className='flex items-center gap-2 '>
                        <DayNightToggle
                            onChange={() => toggleTheme()}
                            checked={isDark}
                            size={20}
                            shadows={true}

                        />
                        {/* <!-- Dark Mode Toggler --> */}
                        {/* <DarkModeSwitcher /> */}
                        {/* <!-- Dark Mode Toggler --> */}

                        {/* <!-- Notification Menu Area --> */}
                        {/* <DropdownNotification /> */}
                        {/* <!-- Notification Menu Area --> */}

                        {/* <!-- Chat Notification Area --> */}
                        {/* <DropdownMessage /> */}
                        {/* <!-- Chat Notification Area --> */}
                        <p>Opend dude!!!!!!!!!</p>
                    </ul>

                    {/* <!-- User Area --> */}
                    {/* <DropdownUser /> */}
                    {/* <!-- User Area --> */}
                </div>
            </div>
        </header>
    )
}

export default Header
