import { NavLink } from "react-router-dom"
import '../styles/Navbar.scss'
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

export default function Navbar() {
  const userContext = useContext(UserContext)

  return (
    <nav className="navbar__container">
      <div className="navbar__header">
        <h4>Signed in as</h4>
        <h4>{userContext.user.username}</h4>
      </div>
      <div className="navbar__links">
        <NavLink to="/statistics" end>Statistics</NavLink>
        <NavLink to="/calendar" end>Calendar</NavLink>
        <NavLink to="/settings" end>Settings</NavLink>
      </div>
    </nav>
  )
}