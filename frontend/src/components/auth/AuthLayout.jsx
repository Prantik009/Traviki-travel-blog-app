import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const AuthLayout = ({ children, authentication = true }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (authentication && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!authentication && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};
