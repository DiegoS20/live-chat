import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { PropsWithChildren } from "react";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const { isAuthorized } = useAuth();

  return isAuthorized ? children : <Navigate to="/login" />;
}
