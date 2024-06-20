import { Navigate } from "react-router-dom";

const StaffRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to='/landing' replace />;
  }

  return children;
};

export default StaffRoute;
