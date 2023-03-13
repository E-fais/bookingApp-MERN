import axios from "axios";
import { createContext,useEffect,useState} from "react";

export const UserContext=createContext({})
export const UserContextProvider=({children})=>{
    const [user,setUser]=useState(null)
    const [userReady,setUserReady]=useState(false)
    useEffect(()=>{
        if(!user){
            axios.get('/profile').then(({data})=>{
                setUser(data)
                setUserReady(true)
            })
        }
    },[])
    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}
