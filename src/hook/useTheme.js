import { useEffect, useState } from "react";


// For controlling Dark and light mode 
const useTheme = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark")

    // Root html element
    const element = document.documentElement
    // check system theme
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)")

    // For choosing mode when wondow load
    const onWindowMatch = () => {
        if (localStorage.theme == "dark" || (!("theme" in localStorage) && darkQuery.matches)){
            element.classList.add("dark")
        }else{
            element.classList.remove("dark")
        }
    }

    useEffect(() => {
        onWindowMatch()
    }, [])


    // Handling theme state change
    useEffect(() => {
        switch (theme) {
            case "dark":
                element.classList.add("dark")
                localStorage.setItem("theme", "dark")
                break;
            case "light":
                element.classList.remove("dark")
                localStorage.setItem("theme", "light")
                break;
            default:
                localStorage.removeItem("theme")
                onWindowMatch()
                break;
        }
    }, [theme])


    // For track system mode change
    useEffect(() => {
        const systemModeChangeHandler = (e) => {
            if(!("theme" in localStorage)){
                if(e.matches) {
                    element.classList.add("dark")
                }else{
                    element.classList.remove("dark")
                }
            }
        }

        darkQuery.addEventListener("change", systemModeChangeHandler)

        return () => {
            darkQuery.removeEventListener("change", systemModeChangeHandler)
        }
    }, [])

    return [theme, setTheme]
}

export default useTheme