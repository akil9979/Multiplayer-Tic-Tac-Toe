import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAppSelector } from "../redux/hook";

type PublicRouteProps = {
  children: ReactNode;
};

export default function PublicRoute({ children }: PublicRouteProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isLoading = useAppSelector((state) => state.auth.isLoading);


if (isLoading) {
  return <p>Checking authentication...</p>;
}
if (isAuthenticated) {
  return <Navigate to="/" />;
}
return children;
}