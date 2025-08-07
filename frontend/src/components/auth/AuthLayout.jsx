import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const AuthLayout = ({ children, authentication = true }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return null;
  }

  if (authentication && !isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (!authentication && isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};