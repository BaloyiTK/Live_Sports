import React from "react";

function Navbar() {
  return (
    <nav className="bg-slate-500 py-4 ">
      <div className="w-[80%] mx-auto ">
        {/* Logo that links to the home page */}
        <a href="/" className="text-white text-xl font-bold">
          My Live Scores
        </a>

       
      </div>
    </nav>
  );
}

export default Navbar;
