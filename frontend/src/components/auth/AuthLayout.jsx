import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const AuthLayout = ({ children, authentication }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const location = useLocation()

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (authentication && !isAuthenticated) {
    return <Navigate to="/login" state={{from: location}} replace />;
  }
  if (!authentication && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};
