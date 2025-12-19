import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./lib/helpers";

export default function PrivateRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
}
