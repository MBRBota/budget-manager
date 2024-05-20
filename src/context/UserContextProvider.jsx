import { useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { refreshUserToken } from '../services/auth.service';

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize user state using refresh token (if applicable) on first render
  useEffect(() => {
    const initializeUserContext = async () => {
      try {
        const response = await refreshUserToken();

        // Early return if missing/invalid refresh token cookie, leaving user state as null
        if (!response?.success) return;

        setUser(response.data);
        setIsLoaded(true);
      } catch (err) {
        console.log(err);
        setIsLoaded(true);
      }
    };
    initializeUserContext();
  }, []);

  const contextValue = { user, setUser };
  return isLoaded && <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}
