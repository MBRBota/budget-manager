import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';

export default function Logout() {
  const { userLogout } = useContext(UserContext);

  useEffect(() => {
    userLogout();
  }, [userLogout]);

  return null;
}
