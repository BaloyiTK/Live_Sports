import React, { useState } from "react";
import { FaBars, FaTimes, FaFutbol } from "react-icons/fa"; // Import the close icon
import { useSelector, useDispatch } from "react-redux";
import { menuActions } from "../store";

function Navbar() {
  //const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);
  const dispatch = useDispatch();

  console.log(isMenuOpen);

  const toggleMobileMenu = () => {
    dispatch(menuActions.toggleMenu());
  };

  return (
    <nav className="bg-slate-900 py-4">
      <div className="flex justify-between text-white font-bold items-center mx-[2%] md:w-[80%] md:mx-auto">
        <a href="/" className="text-2xl  md:text-3xl font-bold">
          <div className="flex justify-center items-center ">
            {" "}
            L<span className="italic text-red-500">i</span>ve{" "}
            <span className="ml-1">
              <FaFutbol className="" />
            </span>
          </div>
        </a>

        {/* Conditional rendering of menu icon based on isMobile */}

        <div className="md:hidden border border-white rounded flex items-center p-1">
          {" "}
          {isMenuOpen ? (
            <button
              className="mobile-menu-button md:hidden z-50 text-lg"
              onClick={toggleMobileMenu}
            >
              <FaTimes className="text-lg" /> {/* Close icon */}
            </button>
          ) : (
            <button
              className="mobile-menu-button md:hidden z-40"
              onClick={toggleMobileMenu}
            >
              <FaBars className="text-lg" /> {/* Hamburger icon */}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
