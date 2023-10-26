import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import { IoMdFootball } from "react-icons/io";
import { menuActions } from "../store";

function Navbar() {
  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);
  const dispatch = useDispatch();

  const toggleMobileMenu = () => {
    dispatch(menuActions.toggleMenu());
  };

  return (
    <nav className="bg-white md:bg-slate-200 py-4">
      <div className="flex justify-between text-black font-bold items-center mx-[2%] md:w-[80%] md:mx-auto">
        <a href="/" className="text-3xl md:text-4xl font-bold">
          <div className="flex justify-center items-center">
            L<span className="italic text-red-500">i</span>ve{" "}
            <span className="md:ml-1">
              <IoMdFootball className="text-4xl" />
            </span>
          </div>
        </a>

        <div className="md:hidden border border-slate-900 rounded flex items-center p-1">
          <button
            className={`mobile-menu-button ${isMenuOpen ? 'z-50' : 'z-40'}`}
            onClick={toggleMobileMenu}
          >
            {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
