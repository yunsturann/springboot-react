// ** React Imports
import { Route, Routes, useLocation } from "react-router-dom";

// ** Third Party Imports
import { Toaster } from "react-hot-toast";

// ** Custom Compoents
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

// ** Pages
import Homepage from "./pages/Homepage";
import AuthLayout from "./pages/auth";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AuthenticatedRoute from "./pages/AuthenticatedRoute";
import Address from "./pages/checkout/Address";
import CardPage from "./pages/checkout/CardPage";
import OrdersPage from "./pages/OrdersPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const location = useLocation();

  return (
    <main className="font-kumbh-sans min-h-screen flex flex-col justify-between">
      <Toaster />
      {location.pathname.startsWith("/auth") ? null : <Navbar />}
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/" element={<Homepage />} />
        <Route element={<AuthenticatedRoute />}>
          <Route path="/checkout/address" element={<Address />} />
          <Route path="/checkout/card" element={<CardPage />} />
          <Route path="/myorders" element={<OrdersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
      {location.pathname.startsWith("/auth") ? null : <Footer />}
    </main>
  );
}

export default App;
