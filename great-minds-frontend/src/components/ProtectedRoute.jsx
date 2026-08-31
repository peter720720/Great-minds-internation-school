import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRole }) {
    const { user, token } = useAuth();

    if (!token || !user) {
        return <Navigate to="/admin-login" replace />;
    }

    if (allowedRole && user.role !== allowedRole) {
        // Fallback for role mismatches
        return <Navigate to="/" replace />;
    }

    return children;
}
