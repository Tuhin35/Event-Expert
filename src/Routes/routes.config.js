import { createBrowserRouter } from "react-router-dom"
import DashboardLayout from "../Layout/DashboardLayout"
import Main from "../Layout/Main"
import About from "../Pages/About/About"
import { Blogs } from "../Pages/Blogs/Blogs"
import Contact from "../Pages/Contact/Contact"
import AddCostumes from "../Pages/Dashboard/Add Costumes/AddCostumes"
import AllUsers from "../Pages/Dashboard/All users/AllUsers"
import BecomeMerchant from "../Pages/Dashboard/Become Business owner/BecomeMerchant"
import DashboardHome from "../Pages/Dashboard/DashboardHome"
import MyBookings from "../Pages/Dashboard/My booking/MyBookings"
import CostumeService from "../Pages/Dynamic Specific service/CostumeService"
import EventPhotographerService from "../Pages/Dynamic Specific service/EventPhotographerService"
import MakeupService from "../Pages/Dynamic Specific service/MakeupService"
import VenueService from "../Pages/Dynamic Specific service/VenueService"
import ErrorPage from "../Pages/ErrorPage"
import { Home } from "../Pages/Home"
import { default as CostumeDetails } from "../Pages/Service Details/CostumeDetails"
import MakeupServiceDetails from "../Pages/Service Details/MakeupServiceDetails"
import { Login } from "../Pages/login/Login"
import Signup from "../Pages/signup/Signup"
import PrivateRoute from "./PrivateRoute"
import VenueDetails from "../Pages/Service Details/VenueDetails"
import FeaturedServices from "../components/Featured services/FeaturedServices"
import Order from "../Pages/Orders/Order/Order"
import DashBoardAllUser from "../components/Dashboard/DashboardAllUser/DashBoardAllUser"
import PhotographerDetails from "../Pages/Service Details/PhotographerDetails"
import BusinessOwnerMenu from "../components/Dashboard/Menus/BusinessOwnerMenu"
import Payment from "../Pages/Payment/Payment"
import CheckoutForm from "../Pages/Payment/CheckoutForm"

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/home',
                element: <Home />,
            },
            {
                path: '/signup',
                element: <Signup />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path:'/service',
                element:<FeaturedServices/>
            },
            {
                path: '/services/costume',
                element: <CostumeService />,
            },
            {
                path: '/service/services/costume',
                element: <CostumeService />,
            },
            {
                path: '/costumes/:id',
                element: <CostumeDetails />,
            },
            {
                path: '/services/photographers',
                element: <EventPhotographerService />
            },
            {
                path: '/services/makeup',
                element: <MakeupService />,
            },
            {
                path: '/service/services/photographers',
                element: <EventPhotographerService />
            },
            {
                path: '/service/services/photographers/:id',
                element: <PhotographerDetails/>
            },
            {
                path: '/services/photographers/:id',
                element: <PhotographerDetails/>
            },
            {
                path: '/photographers/:id',
                element: <PhotographerDetails/>
            },
            {
                path: '/service/services/makeup',
                element: <MakeupService />,
            },
            {
                path: '/makeup/:id',
                element: <MakeupServiceDetails />,
            },
            {
                path: '/services/venue',
                element: <VenueService />,
            },
            {
                path: '/service/services/venue',
                element: <VenueService />,
            },
            {
                path: '/venue/:id',
                element: <VenueDetails/>
            },
           
            {
                path: '/blogs',
                element: <Blogs />,
            },
            {
                path: '/contact',
                element: <Contact />,
            },
            // {
            //     path:'/checkout/:id',
            //     element:<PrivateRoute><CheckoutForm/> </PrivateRoute>,
            //     // loader: ({params})=>fetch(`${process.env.REACT_APP_URL}/orders/${params.id}`)
            //   },
            {
                path: '/orders',
                element:<PrivateRoute>  <Order/> </PrivateRoute>,
            },
            {
                path: "/payment/:id",
                element: <Payment></Payment>,
                // loader:({params}) => fetch(`${process.env.REACT_APP_API_URL}/orders/${params.id}`)
            },
            {
                path: 'become-merchant',
                element: <PrivateRoute><BecomeMerchant /></PrivateRoute>,

            }

        ],

    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout> </PrivateRoute> ,
        children: [
            {
                path: '',
                element:<PrivateRoute><AllUsers/></PrivateRoute>,

            },
            
            {
                path: 'add-costumes',
                element: <AddCostumes />,

            },
            {
                path: 'my-bookings',
                element: <MyBookings />,

            },
            {
                path: 'all-bookings',
                element: <DashBoardAllUser/>,

            },
            {
                path: 'all-users',
                element: <AllUsers />,

            },
            // {
            //     path: 'merchant',
            //     element: <BusinessOwnerMenu/>

            // }
            

        ]
    },
])

export default router