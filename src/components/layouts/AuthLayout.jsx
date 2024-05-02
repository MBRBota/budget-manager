import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function AuthLayout() {
  const userContext = useContext(UserContext)

  if (userContext.user)
    return <Navigate to="/statistics" replace/>

  return (
    <main>
      <Outlet />
    </main>
  )
}