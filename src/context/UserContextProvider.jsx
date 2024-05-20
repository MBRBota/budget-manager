import { useCallback, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { loginUser, logoutUser, refreshUserToken } from '../services/auth.service';

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const userLogin = useCallback(
    async (userCredentials) => {
      try {
        const { data } = await loginUser(userCredentials);

        setUser(data);
      } catch (err) {
        // todo: Implement error notification instead of redirection on login fail
        console.log(err);
      }
    },
    [],
  );

  const userLogout = useCallback(async () => {
    try {
      await logoutUser(user.accessToken);

      setUser(null);
    } catch (err) {
      console.log(err);
      setUser(null);
    }
  }, [user?.accessToken]);

  const userTokenRefresh = useCallback(async () => {
    setIsLoaded(false);
    try {
      const { data } = await refreshUserToken();

      setUser(data);
    } catch (err) {
      console.log(err);

      setUser(null);
    }
    setIsLoaded(true);
  }, []);

  // Initialize user state using refresh token (if applicable) on first render
  useEffect(() => {
    userTokenRefresh();
  }, [userTokenRefresh]);

  const contextValue = { user, userLogin, userLogout, userTokenRefresh };
  return isLoaded && <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}
