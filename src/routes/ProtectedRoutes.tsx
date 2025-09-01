import { JSX } from "react";
import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

type Props = { children: JSX.Element };

export default function ProtectedRoute({ children }: Props) {
  //   const { isLoggedIn } = useAuth();
  const isLoggedIn = true;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
