import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
       
        <div className="text-right">
          <p>&copy; {new Date().getFullYear()} Live Sports</p>
       
        </div>
      </div>
    </footer>
  );
};

export default Footer;
