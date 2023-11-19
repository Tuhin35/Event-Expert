import { useContext } from "react";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import { themeContext } from "./Contexts/ThemeProvider";
import router from "./Routes/routes.config";
export default function App() {
  const { isDark } = useContext(themeContext)
  // useEffect(() => {
  //   const app = document.querySelector('.app');
  //   if (app !== null) {
  //     app.classList.add('theme-transition');
  //     setTimeout(() => {
  //       app.classList.remove('theme-transition');
  //     }, 1000);
  //   }
  // }, [isDark]);



  return (
    <div className="duration-1000 transition-colors ">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  )
}