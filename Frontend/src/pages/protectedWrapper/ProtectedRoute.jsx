import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const user = useSelector((state) => state.User);

  return user.isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;  
};

export default ProtectedRoute;