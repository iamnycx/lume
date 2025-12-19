import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./lib/helpers";

export default function PublicRoute() {
  return isAuthenticated() ? <Navigate to="/feed" replace /> : <Outlet />;
}
