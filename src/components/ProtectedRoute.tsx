import { Navigate, Outlet } from "react-router-dom";
import AuthenticatedStatus  from "./AuthenticatedStatus";

const ProtectedRoute = () => {
  return <>{AuthenticatedStatus() ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default ProtectedRoute;
