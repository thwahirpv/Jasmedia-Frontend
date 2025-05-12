import { createContext, useContext, useState } from "react";

export const APIContext = createContext()

const ContextProvider = ({children}) => {
    const [progressBar, setProgressBar] = useState(0)

    return (
        <APIContext.Provider value={{progressBar, setProgressBar}}>
            {children}
        </APIContext.Provider>
    )
}

export default ContextProvider
