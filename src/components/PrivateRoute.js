import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...props }) => {
  const { auth } = useSelector((state) => state);
  return auth?.email ? (
    <Component {...props} />
  ) : (
    <Navigate to="/auth" replace />
  );
};

export default PrivateRoute;
