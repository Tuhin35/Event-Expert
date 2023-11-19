import React,
 { createContext, useEffect, useState } from 'react';



export const themeContext = createContext();
const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false)
    useEffect(() => {

        const rootElement = window.document.documentElement;
        if (isDark) {
            rootElement.classList.add("dark");
            rootElement.classList.remove("light");
            // window.document.body.style.transition = "all 2000ms ease-out"
        }
        else {
            rootElement.classList.add("light");
            rootElement.classList.remove("dark");
        }
    }, [isDark])


    const toggleTheme = () => {
        setIsDark(!isDark)
    }
    // const [dark, setDark] = useState();
    // useEffect(() => {
    //     console.log(theme);
    // }, [dark,])
    // const lightMode = 'light';
    // const darkMode = 'dark';
    // let body = document.body;
    // let theme;
    // theme = localStorage.getItem('theme');


    // if (theme === lightMode || theme === darkMode) {
    //     body.classList.add(theme);
    // }
    // else {
    //     body.classList.add(theme);
    // }

    // const setTheme = (e) => {
    //     if (theme === darkMode) {
    //         body.classList.replace(darkMode, lightMode)
    //         body.classList.remove(theme);
    //         localStorage.setItem('theme', lightMode)
    //         theme = lightMode;
    //         setDark(theme);
    //     }
    //     else {
    //         body.classList.replace(lightMode, darkMode)
    //         body.classList.remove(theme);
    //         localStorage.setItem('theme', darkMode)
    //         theme = darkMode;
    //         setDark(theme);
    //     }
    // }
    return (
        <themeContext.Provider value={{ toggleTheme, setIsDark, isDark }}>
            {children}
        </themeContext.Provider>
    );
};

export default ThemeProvider;