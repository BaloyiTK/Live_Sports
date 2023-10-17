import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import the close icon
import LeagueList from "./LeagueList";

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  return (
    <nav className="bg-slate-500 py-4">
      <div className="flex justify-between text-white text-xl font-bold items-center mx-[2%] md:w-[80%] md:mx-auto">
        <a href="/" className="text-white text-xl font-bold">
          My Live Scores
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
