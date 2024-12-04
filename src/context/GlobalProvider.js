import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { getCurrentUser } from "../lib/appwrite"

const { createContext } = require("react");


const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext)

export function GlobalProvider({children}) {

    const [formData, setFormData] = useState({
        title:'',
        video:null,
        thumbnail:null,
        prompt:''
      })
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(()=> {
        setIsLoading(true)
        getCurrentUser()
            .then((res) => {
                if(res){
                    setIsLoggedIn(true)
                    setUser(res)
                }
                else{
                    setIsLoggedIn(false)
                    setUser(null)
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false)
            })
    },[])

    return(
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
                formData,
                setFormData
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}