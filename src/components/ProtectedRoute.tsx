import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = () => {
    const { user } = useUser();

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;