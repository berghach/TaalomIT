import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Role } from "../models/roles";

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: Role[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth); 

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role as Role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
