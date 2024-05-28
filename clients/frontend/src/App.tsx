// ** React Imports
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

// ** Pages
import Homepage from "./pages/Homepage";
import About from "./pages/About";

// ** Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { fetchUserInfo } from "./store/user-slice";

// ** Third Party Imports
import { Toaster } from "react-hot-toast";

// ** Custom Compoents
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Collection from "./pages/Collections";
import AuthLayout from "./pages/auth";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AuthenticatedRoute from "./pages/AuthenticatedRoute";

import Address from "./pages/checkout/Address";
import CardPage from "./pages/checkout/CardPage";
import ApprovePage from "./pages/checkout/ApprovePage";
import OrdersPage from "./pages/OrdersPage";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.user.info);
  const userStatus = useSelector((state: RootState) => state.user.status);
  const userError = useSelector((state: RootState) => state.user.error);

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUserInfo());
    }
  }, [userStatus, dispatch]);

  // if (userStatus === "loading") {
  //   return <div>Loading...</div>;
  // }

  // if (userStatus === "failed") {
  //   return <div>Error: {userError}</div>;
  // }

  console.log(userInfo);

  return (
    <main className="font-kumbh-sans min-h-screen flex flex-col justify-between">
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/collections" element={<Collection />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout/address" element={<Address />} />
        <Route path="/checkout/card" element={<CardPage />} />
        {/* <Route path="/checkout/approve" element={<ApprovePage />} /> */}
        <Route path="/myorders" element={<OrdersPage />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;

/*
  <main className="font-kumbh-sans min-h-screen flex flex-col justify-between">
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={<AuthenticatedRoute />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/collections" element={<Collection />} />
        </Route>
      </Routes>
      <Footer />
    </main> */
