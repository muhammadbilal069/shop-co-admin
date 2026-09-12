import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Agar token na ho ya role admin na ho, toh login page par bhej do
  if (!token || role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;