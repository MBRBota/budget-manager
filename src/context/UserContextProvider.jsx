import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { refreshUserToken } from "../services/auth.service";

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  // Initialize user state using refresh token (if applicable) on first render
  useEffect(() => {
    const initializeUserContext = async () => {
      try{
        const response = await refreshUserToken()

        // Early return if missing/invalid refresh token cookie, leaving user state as null
        if (!response?.success)
          return
  
        setUser(response.data)
      } catch (err) {
        console.log(err)
      }
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