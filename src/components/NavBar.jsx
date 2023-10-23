import React, { useState } from "react";
import { FaBars, FaTimes, FaFutbol } from "react-icons/fa"; // Import the close icon
import { useSelector, useDispatch } from "react-redux";
import { menuActions } from "../store";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol } from '@fortawesome/free-solid-svg-icons';
import { IoMdFootball } from 'react-icons/io';

function Navbar() {
  //const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);
  const dispatch = useDispatch();


  const toggleMobileMenu = () => {
    dispatch(menuActions.toggleMenu());
  };

  return (
    <nav className=" bg-white md:bg-slate-200 py-4">
      <div className="flex justify-between text-black font-bold items-center mx-[2%] md:w-[80%] md:mx-auto">
        <a href="/" className="text-2xl  md:text-3xl font-bold">
          <div className="flex justify-center items-center ">
            {" "}
            L<span className="italic text-red-500">i</span>ve{" "}
            <span className="ml-1">
              {/* <FaFutbol className="" /> 
              <FontAwesomeIcon icon={faFutbol} />*/}
              <IoMdFootball className="text-4xl" /> 
            </span>
          </div>
        </a>

        {/* Conditional rendering of menu icon based on isMobile */}

        <div className="md:hidden border border-slate-900 rounded flex items-center p-1">
          {" "}
          {isMenuOpen ? (
            <button
              className="mobile-menu-button md:hidden z-50 text-lg"
              onClick={toggleMobileMenu}
            >
              <FaTimes className="text-xl" /> {/* Close icon */}
            </button>
          ) : (
            <button
              className="mobile-menu-button md:hidden z-40"
              onClick={toggleMobileMenu}
            >
              <FaBars className="text-xl" /> {/* Hamburger icon */}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
