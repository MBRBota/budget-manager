import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";


export default function ProtectedLayout() {
  const userContext = useContext(UserContext)

  if (!userContext.user)
    return <Navigate to="/register" replace />
  
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}