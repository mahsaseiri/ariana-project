import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { RootState } from "../store";
// import { useAuth } from "../context/AuthContext";

type Props = { children: JSX.Element };

export default function ProtectedRoute({ children }: Props) {
  //   const { isLoggedIn } = useAuth();
  const { loggedIn } = useAppSelector((state: RootState) => state.auth);
  // Check localStorage for login state

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
