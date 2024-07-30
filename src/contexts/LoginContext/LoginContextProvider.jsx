import React from "react";
import LoginContext from "./LoginContext.jsx";
import { useState } from "react";


export default function LoginContextProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return (
        <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </LoginContext.Provider>
    )
}
