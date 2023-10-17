import React, { useState } from "react";
import { FaBars, FaTimes, FaFootballBall, FaFutbol } from "react-icons/fa"; // Import the close icon
import LeagueList from "./LeagueList";


function Navbar() {
  const [isMobile, setIsMobile] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  return (
    <nav className="bg-slate-900 py-4">
      <div className="flex justify-between text-white text-xl font-bold items-center mx-[2%] md:w-[80%] md:mx-auto">
        <a href="/" className="text-xl  md:text-3xl font-bold">
          <div className="flex justify-center items-center ">
            {" "}
            L<span className="italic mx-1 text-red-500">i</span>ve{" "}
            <span className="ml-1">
              <FaFutbol className=""/>
            </span>
          </div>
        </a>

        {/* Conditional rendering of menu icon based on isMobile */}
        {isMobile ? (
          <button
            className="mobile-menu-button md:hidden z-50 text-black"
            onClick={toggleMobileMenu}
          >
            <FaTimes /> {/* Close icon */}
          </button>
        ) : (
          <button
            className="mobile-menu-button md:hidden z-40"
            onClick={toggleMobileMenu}
          >
            <FaBars /> {/* Hamburger icon */}
          </button>
        )}
      </div>

      {isMobile && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-white z-40 flex items-center justify-center">
          <LeagueList />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
