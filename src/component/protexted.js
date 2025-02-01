import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { role } = useContext(UserContext);

  if (!role && role !== undefined) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && role !== "Admin") {
    return <Navigate to="/entry" replace />; // Non-admin users redirected to entry
  }

  return children;
};

export default ProtectedRoute;
