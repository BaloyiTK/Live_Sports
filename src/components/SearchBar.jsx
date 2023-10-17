import React from "react";
import { IoIosSearch, IoIosClose, IoIosArrowBack } from "react-icons/io";

const SearchBar = ({ searchTerm, setSearchTerm, handleClear, handleBack, isBackVisible }) => {
  // Define the input classes based on the 'isBackVisible' prop
  const inputClasses = `${isBackVisible ? 'font-bold text-black' : ''} py-1 w-full pl-8 text-black rounded border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200`;

  return (
    <div className="relative w-full">
      {/* Conditional rendering for the back arrow or search icon based on 'isBackVisible' */}
      {isBackVisible ? (
        <div className="absolute inset-y-0 left-2 flex items-center cursor-pointer font-bold text-black" onClick={handleBack}>
          {/* Back arrow icon */}
          <IoIosArrowBack className="text-xl font-extrabold text-black" />
        </div>
      ) : (
        <div className="absolute inset-y-0 left-2 flex items-center text-gray-600">
          {/* Search icon */}
          <IoIosSearch className="text-xl font-extrabold" />
        </div>
      )}

      <input
        type="text"
        placeholder="Search leagues..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={inputClasses}
      />

      {/* Conditional rendering for the clear icon */}
      {!isBackVisible && searchTerm.length > 0 && (
        <div className="absolute inset-y-0 right-12 flex items-center text-white cursor-pointer" onClick={handleClear}>
          {/* Clear icon */}
          <IoIosClose className="absolute left-5 text-3xl font-extrabold text-black" />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
