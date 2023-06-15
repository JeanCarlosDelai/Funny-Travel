import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, checkAccess }) => {
  const { user } = useSelector((store) => store.user);

  if (!user || (checkAccess && !checkAccess())) {
    return <Navigate to="/landing" />;
  }

  return children;
};

export default ProtectedRoute;
