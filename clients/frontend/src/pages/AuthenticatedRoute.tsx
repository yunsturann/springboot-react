// ** React Imports
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// ** Third Party Imports
import toast from "react-hot-toast";

// ** Redux Imports
import { RootState } from "../store";
import { useSelector } from "react-redux";

const AuthenticatedRoute: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  if (user.status && user.status !== "succeeded") {
    toast.error("You need to login first");
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthenticatedRoute;
