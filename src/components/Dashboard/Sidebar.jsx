import { useContext, useEffect, useState } from 'react'
import { RxCross1 } from "react-icons/rx"
import { toast } from 'react-toastify'
import { AuthContext } from '../../Contexts/AuthProvider'
import { getRole } from '../../Service Operations/manageusers'
import Spinner from '../Spinners/Spinner'
import AdminMenus from './Menus/AdminMenus'
import BusinessOwnerMenu from './Menus/BusinessOwnerMenu'
import UserMenus from './Menus/UserMenus'
import { useLocation } from 'react-router-dom'
const Sidebar = ({ sidebarOpen, setSidebarOpen, }) => {
    const [role, setRole] = useState("")
    const { user, loading, logout } = useContext(AuthContext)

    useEffect(() => {

        getRole(user?.email).then(data => {
            setRole(data?.role)
        })
    }, [user])
    const logoutUser = () => {
        logout()
            .then(() => {
                toast.success("successfully logged out")
            })
            .catch(err => console.log(err.message))
    }
    const location = useLocation();
    const isOrderPage = location.pathname.includes('orders')

    return (
        <>
            {
                loading ? <Spinner />
                    :
                    <aside
                        // ref={sidebar}
                        className={`fixed left-0 top-0 z-[9999]  flex  flex-col overflow-y-hidden gap-10  shadow-md shadow-slate-400  bg-white px-6 pb-3 duration-300 ease-linear dark:bg-dark-toned md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] lg:static lg:translate-x-0 ${sidebarOpen ? 'ml-[0%]' : '-ml-[100%]'}`
                        }
                    >

                        <div>
                            <div className="-mx-6 px-6 py-4 flex ">
                                <button
                                    // ref={trigger}
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    aria-controls='sidebar'
                                    aria-expanded={sidebarOpen}
                                    className='block lg:hidden'
                                >
                                    <RxCross1 />
                                </button>
                            </div>

                            <div className="mt-8 text-center">
                                <img
                                    src={user && user?.photoURL}
                                    alt={user && user?.displayName}
                                    className="m-auto h-10 w-10 rounded-full object-cover lg:h-28 lg:w-28"
                                />
                                <h5 className="mt-4 hidden text-xl font-semibold text-gray-600 lg:block dark:text-gray-300">{user && user?.email ? user?.email : "Unknown Access"}</h5>
                                <span className=" text-gray-400 block">{role}</span>
                            </div>

                            { !isOrderPage &&
                                <ul className="mt-8 space-y-2 tracking-wide">
                                {/* menu goes here */}
                                {(!role || role === "requested") && <UserMenus />}
                                {role === "admin" && <AdminMenus />}
                                {role === "merchant"  && <BusinessOwnerMenu />}

                            </ul>}
                        </div>


                        {/* logout */}
                        <div className="-mx-6 flex items-center justify-between border-t border-slate-300 px-6 pt-4 dark:border-gray-700 mt-auto">
                            <button className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 dark:text-gray-300"
                                onClick={logoutUser}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                <span className="group-hover:text-gray-700 dark:group-hover:text-white" >Logout</span>
                            </button>
                        </div>


                    </aside >


            }
        </>
    )
}


export default Sidebar;
