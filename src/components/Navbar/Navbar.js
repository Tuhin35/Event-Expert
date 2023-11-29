import { useContext, useState } from "react";
import DayNightToggle from 'react-day-and-night-toggle';
import { Link } from "react-router-dom";
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
      isAdmin[0] && { url: '/dashboard', name: 'Dashboard' },
      ! isAdmin[0] && { url: '/become-merchant', name: 'Add Product' },
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
                    
                        <img className="h-16 w-16 rounded" src="data:image/png;base64,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" alt="" />
                    
                    <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 dark:text-white-toned uppercase">
                        Company
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
                                            <svg
                                                className="w-8 text-deep-purple-accent-400"
                                                viewBox="0 0 24 24"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeMiterlimit="10"
                                                stroke="currentColor"
                                                fill="none"
                                            >
                                                <rect x="3" y="1" width="7" height="12" />
                                                <rect x="3" y="17" width="7" height="6" />
                                                <rect x="14" y="1" width="7" height="6" />
                                                <rect x="14" y="11" width="7" height="12" />
                                            </svg>
                                            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                                                Company
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
                                        <li>
                                            <DayNightToggle
                                                onChange={() => toggleTheme()}
                                                checked={isDark}
                                                size={20}
                                                shadows={true}

                                            />
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