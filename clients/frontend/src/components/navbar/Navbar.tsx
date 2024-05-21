// ** React Imports

// ** Third Part Imports
import { Link } from "react-router-dom";

// ** Constants
import { navItems } from "../../constants";

// ** Custom Components
import Container from "../Container";
import NavItem from "./NavItem";
import HamburgerMenu from "./HamburgerMenu";
import BasketMenu from "./BasketMenu";

const Navbar = () => {
  return (
    <header className="relative shadow-sm">
      <Container className="border-b border-gray-200 flex justify-between items-center">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-x-4 md:gap-x-12 ">
          {/* HAMBURGER MENU */}
          <HamburgerMenu />
          {/* LOGO */}
          <Link to={"/"} className="py-8">
            <img src="/images/logo.svg" alt="Logo" width={140} height={40} />
          </Link>

          {/* NAVIGATION ITEMS */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-x-6">
              {navItems.map((item) => (
                <NavItem key={item.name} {...item} />
              ))}
            </ul>
          </nav>
        </div>
        {/* Right SIDE */}
        <div className="flex items-center gap-x-3 sm:gap-x-6 md:gap-x-10">
          {/* BASKET */}
          <BasketMenu />
          {/* PROFILE */}
          <div className="cursor-pointer rounded-full border-2 border-transparent hover:border-primary-orange transition">
            <img
              src="/images/image-avatar.png"
              alt="user"
              width={40}
              height={40}
            />
          </div>
        </div>
      </Container>
      {/* Hamburger Menu */}
    </header>
  );
};

export default Navbar;
