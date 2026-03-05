import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // If the user is not logged in, send them to the login page
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // If this page is for admins only, and a regular user tries to enter, send them home
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // If everything is good, let them see the page
  return children;
};

export default ProtectedRoute;