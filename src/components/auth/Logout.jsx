import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { logoutUser } from '../../services/auth.service';

export default function Logout() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const userLogout = async () => {
      try {
        await logoutUser(user.accessToken);

        setUser(null);
      } catch (err) {
        console.log(err);
        setUser(null);
      }
    };
    userLogout();
  }, []);

  return null;
}
