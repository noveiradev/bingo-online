import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

export function AuthRoute({ children, requiredRoles = [] }) {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }
  
  return children;
}