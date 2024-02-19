import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { PropsWithChildren } from "react";

export default function ProtectedRoute({ children, auth }: Props) {
  const { isAuthorized } = useAuth();

  const redirectTo = auth ? "/login" : "/";

  // This means that, if component needs auth, isAuthorized should be also true,
  // but if component does not need auth, isAuthorized should be false, so both variables
  // should have same values to render children and do not redirect
  return auth == isAuthorized ? children : <Navigate to={redirectTo} />;
}

type Props = PropsWithChildren<{
  auth?: boolean;
}>;
