import { NavLink } from "react-router-dom"

export default function Navbar() {

  return (
    <nav className="nav">
      <NavLink to="/statistics" end>Statistics</NavLink>
      <NavLink to="/calendar" end>Calendar</NavLink>
      <NavLink to="/settings" end>Settings</NavLink>
    </nav>
  )
}