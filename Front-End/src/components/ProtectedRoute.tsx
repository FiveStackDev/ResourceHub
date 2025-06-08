import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

interface ProtectedRouteProps {
  requiredRole: 'Admin' | 'User';
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRole,
  children,
}) => {
  const { userData, refreshUserData } = useUser();
  const location = useLocation();

  // Refresh user data on mount to ensure we have the latest
  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Normalize roles for case-insensitive comparison
  const userRole = userData.role.toLowerCase();
  const requiredRoleLower = requiredRole.toLowerCase();

  // Admins can access both admin and user routes
  if (userRole === 'admin') {
    return <>{children}</>;
  }

  // Users can only access user routes
  if (userRole === requiredRoleLower) {
    return <>{children}</>;
  }

  // Redirect unauthorized access
  return (
    <Navigate
      to={userRole === 'user' ? '/user-dashboarduser' : '/admin-dashboardadmin'}
      state={{ from: location }}
      replace
    />
  );
};

export default ProtectedRoute;
