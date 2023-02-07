import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../../components/Spinner";
import useAdmin from "../../hooks/useAdmin";


export const ProtectedRoute = ({ children }) => {
    const [user, loading] = useAdmin()
    let location = useLocation();
    if(loading){
      return <Spinner/>
    }
    if (!user) {
      return <Navigate to={'/'} state={{ from: location }} replace />;
    }
  
    return children;
  };