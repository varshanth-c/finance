import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token); // Access token from Redux state
  return token ? children : <Navigate to="/login" />; // If no token, redirect to login
};

export default ProtectedRoute;
