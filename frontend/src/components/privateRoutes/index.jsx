import { Navigate, Outlet } from "react-router-dom";
import { getUserToken } from "../../utils/localStorage.utils.js";

const PrivateRoutes = () => {
  if (getUserToken()) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};
export default PrivateRoutes;