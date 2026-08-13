import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAppSelector } from "../redux/hook";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  if (isLoading) {
  return <p>Checking authentication...</p>;
}

if (!isAuthenticated) {
  return <Navigate to="/login" />;
}

return children;
}
