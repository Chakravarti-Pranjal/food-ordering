import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { userData } = useSelector((state) => state.user);

  return !userData ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoute;
