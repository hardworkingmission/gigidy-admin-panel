import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ user, children }) => {

    let location = useLocation();
    if (!user) {
      return <Navigate to={'/'} state={{ from: location }} replace />;
    }
  
    return children;
  };