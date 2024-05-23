// ** React Imports
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// ** Redux Imports
import { useSelector } from "react-redux";
import { RootState } from "../store";

const AuthenticatedRoute: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user.info);

  if (!userInfo) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
};

export default AuthenticatedRoute;
