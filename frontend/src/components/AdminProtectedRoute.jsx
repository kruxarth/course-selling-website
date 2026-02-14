import { Navigate, Outlet } from "react-router-dom";

export function AdminProtectedRoute() {
  const token = localStorage.getItem("admin-token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
