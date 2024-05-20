import { NavLink } from 'react-router-dom';
import '../styles/Navbar.scss';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function Navbar() {
  const userContext = useContext(UserContext);

  return (
    <nav className="navbar__container">
      <div className="navbar-header">
        <h4>Signed in as</h4>
        <h4>{userContext.user.username}</h4>
      </div>
      <div className="navbar-links__container">
        <div className="budget-links__container">
          <NavLink to="/statistics" end>
            Statistics
          </NavLink>
          <NavLink to="/calendar" end>
            Calendar
          </NavLink>
        </div>
        <div className="user-links__container">
          <NavLink to="/settings" end>
            Settings
          </NavLink>
          <NavLink to="/logout" end>
            Logout
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
