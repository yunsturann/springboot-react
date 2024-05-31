// ** React Imports
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

// ** Third Party Imports
import toast from "react-hot-toast";

// ** Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

import { fetchUserInfo } from "../store/user-slice";

const AuthenticatedRoute: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user.status !== "succeeded") {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, user.status]);

  if (user.status === "loading") {
    return <div>Loading...</div>;
  }

  if (user.status === "failed") {
    toast.error("You need to be logged in to access this page");
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
};

export default AuthenticatedRoute;
