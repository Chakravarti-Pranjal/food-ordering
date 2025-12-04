import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { userData } = useSelector((state) => state.user);

  return userData ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
