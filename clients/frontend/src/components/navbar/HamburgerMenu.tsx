// ** React Imports
import { useState } from "react";

// ** Third Part Imports
import { Link } from "react-router-dom";

// ** Utils
import { cn } from "../../lib/utils";

// ** Constants
import { navItems } from "../../constants";

const HamburgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="block md:hidden">
      {/* MENU ICON */}
      <div
        className="cursor-pointer hover:opacity-75"
        onClick={() => setIsMenuOpen(true)}
      >
        <img
          src="/images/icon-menu.svg"
          alt="hamburger-icon"
          width={18}
          height={18}
        />
      </div>

      {/* MENU ITEMS */}
      <div
        className={cn(
          "h-screen w-full fixed inset-0 z-20 bg-black/40 -translate-x-full transition duration-300",
          {
            "translate-x-0": isMenuOpen,
          }
        )}
        onClick={() => setIsMenuOpen(false)}
      >
        <nav
          className="w-[70%] h-full bg-white p-6 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* CLOSE ICON */}
          <div
            className="mb-10 cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          >
            <img
              src="/images/icon-close.svg"
              alt="close-icon"
              width={15}
              height={15}
            />
          </div>
          {/* NAV ITEMS */}
          <ul className="space-y-3 font-semibold">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.url}
                  className="block py-1.5 hover:bg-gray-100 rounded-lg transition duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default HamburgerMenu;
