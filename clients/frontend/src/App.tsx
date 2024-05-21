import { Route, Routes } from "react-router-dom";

// ** Pages
import Homepage from "./pages/Homepage";
import About from "./pages/About";

// ** Custom Compoents
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Collection from "./pages/Collections";

function App() {
  return (
    <main className="font-kumbh-sans min-h-screen flex flex-col justify-between">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/collections" element={<Collection />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
