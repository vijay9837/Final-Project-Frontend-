import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ResetPasswordProtected = () => {
  const otpVerified = useSelector((state) => state.auth.otpVerified);
  console.log(otpVerified);
  return otpVerified ? <Outlet /> : <Navigate to="/forgot-password" replace />;
};

export default ResetPasswordProtected;
