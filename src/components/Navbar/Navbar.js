import { useContext, useState } from "react";
import DayNightToggle from 'react-day-and-night-toggle';
import { Link } from "react-router-dom";
import logo from './logo.png'
import { toast } from "react-toastify";
import { AuthContext } from "../../Contexts/AuthProvider";
import { themeContext } from "../../Contexts/ThemeProvider";
import UseAdmin from "./UseAdmin";
export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isDark, toggleTheme } = useContext(themeContext);
    const { user, logout } = useContext(AuthContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const isAdmin = UseAdmin(user?.email)

    const allLinks = [
        { url: '/', name: 'Home' },
        {
            url: 'service', name: 'Services', sublink: [
                { url: '/Venue', name: 'Venue' },
                { url: '/Photographers', name: 'Photographers' },
                { url: '/costume', name: 'Custume' },
                { url: '/makeup', name: 'Mackup' },
            ]
        },
        { url: '/orders', name: 'Orders' },
        { url: '/contact', name: 'Contact' },
        !isAdmin[0] && { url: '/become-merchant', name: 'Add Product' },
        isAdmin[0] && { url: '/dashboard', name: 'Dashboard' },
    ]


    window.onscroll = () => {
        // console.log(window.pageYOffset); /*defines the scroll offset */
        const value = window.pageYOffset;
        setIsScrolled(value === 0 ? false : true);
        return () => window.onscroll = null;

    }

    const logoutUser = () => {
        logout()
            .then(() => {
                toast.success("successfully logged out")
            })
            .catch(err => console.log(err.message))
    }

    return (
        <div className={`container px-4 py-5 mx-auto sm:max-w-xl md:max-w-full z-[999]  md:px-24 lg:px-8 sticky top-0 left-0 right-0  ${isScrolled && 'dark:bg-black bg-white/80  bg-blur-xl'} transition duration-300 ease-linear  bg-gradient-to-t from-transparent to-gray-400`}>
            <div className="relative flex items-center justify-between" >
                <a
                    href="/"
                    aria-label="Company"
                    title="Company"
                    className="inline-flex items-center"
                >

                    <img className="h-16 w-16 rounded" src={logo} alt="" />

                    <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 dark:text-white-toned uppercase">
                        Event-Expert
                    </span>
                </a>
                <ul className="flex items-center hidden space-x-8 lg:flex">
                    {
                        allLinks?.map((link, i) => (
                            <li key={i}>
                                <Link
                                    to={link.url}
                                    aria-label={link.name}
                                    title={link.name}
                                    className="font-medium tracking-wide text-gray-700 dark:text-snow-white-toned transition-colors duration-200 hover:text-indigo-700 "
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))
                    }

                </ul>
                <ul className="flex items-center hidden space-x-8 lg:flex">
                    <li>
                        <DayNightToggle
                            onChange={() => toggleTheme()}
                            checked={isDark}
                            size={20}
                            shadows={true}

                        />
                    </li>

                    {
                        user && user?.email ? <>
                            <button onClick={logoutUser}><img src="https://cdn-icons-png.flaticon.com/512/8602/8602349.png" alt="" className="w-12" title="logout" /></button>
                            <img className="inline-block h-[2.875rem] w-[2.875rem] rounded-full ring-2 ring-white dark:ring-gray-800 object-cover" src={user?.photoURL} alt={user?.displayName}></img>
                        </>
                            :
                            <li >
                                <Link
                                    to="/signup"
                                    className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none"
                                    aria-label="Sign up"
                                    title="Sign up"
                                >
                                    Sign up
                                </Link>
                            </li>
                    }

                </ul>
                <div className="lg:hidden">
                    <button
                        aria-label="Open Menu"
                        title="Open Menu"
                        className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <svg className="w-5 text-gray-600 dark:text-snow-white" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                            />
                            <path
                                fill="currentColor"
                                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                            />
                            <path
                                fill="currentColor"
                                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                            />
                        </svg>
                    </button>
                    {isMenuOpen && (
                        <div className="absolute top-0 left-0 w-full">
                            <div className="p-5 bg-white dark:bg-slate-300  rounded-md shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <a
                                            href="/"
                                            aria-label="Company"
                                            title="Company"
                                            className="inline-flex items-center"
                                        >

                                            <img className="h-16 w-16 rounded" src={logo} alt="" />

                                            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 dark:text-white-toned uppercase">
                                                Event-Expert
                                            </span>
                                        </a>
                                    </div>
                                    <div>
                                        <button
                                            aria-label="Close Menu"
                                            title="Close Menu"
                                            className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <svg className="w-5 text-gray-600 " viewBox="0 0 24 24">
                                                <path
                                                    fill="currentColor"
                                                    d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <nav>
                                    <ul className="space-y-4">
                                        <li className="flex flex-row items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-slate-800 transition duration-200 rounded  focus:shadow-outline focus:outline-none">
                                            <li className="mx-auto">
                                                <DayNightToggle
                                                    onChange={() => toggleTheme()}
                                                    checked={isDark}
                                                    size={20}
                                                    shadows={true}

                                                />
                                            </li>
                                            <li className="mx-auto">
                                                {
                                                    user && user?.email ? <>
                                                        <button onClick={logoutUser}><img src="https://cdn-icons-png.flaticon.com/512/8602/8602349.png" alt="" className="w-12" title="logout" /></button>
                                                        <img className="inline-block mx-auto h-[2.875rem] w-[2.875rem] rounded-full ring-2 ring-white dark:ring-gray-800 object-cover" src={user?.photoURL} alt={user?.displayName}></img>
                                                    </>
                                                        :
                                                        <li className="mx-auto">
                                                            <Link
                                                                to="/signup"
                                                                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none"
                                                                aria-label="Sign up"
                                                                title="Sign up"
                                                            >
                                                                Sign up
                                                            </Link>
                                                        </li>
                                                }
                                            </li>
                                        </li>
                                        {
                                            allLinks.map((link, i) => (
                                                <li key={i}>
                                                    <Link
                                                        to={link.url}
                                                        className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-slate-800 transition duration-200 rounded  focus:shadow-outline focus:outline-none"
                                                        aria-label={link.name}
                                                        title={link.name}
                                                    >
                                                        {link.name}
                                                    </Link>
                                                </li>

                                            ))
                                        }


                                    </ul>
                                </nav>
                            </div>
                        </div>
                    )}
                </div>
            </ div>
        </div >
    );
};