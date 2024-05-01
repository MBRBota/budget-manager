import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { refreshUserToken } from "../services/auth.service";

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initializeUserContext = async () => {
        const { data: response } = await refreshUserToken()
        console.log(response)
        if (!response?.success) return
  
        setUser(response.data)
      }
    initializeUserContext()
  }, [])

  const contextValue = { user, setUser }
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}