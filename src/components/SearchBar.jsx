import React, { useMemo, useCallback } from "react";
import { IoIosSearch, IoIosClose, IoIosArrowBack } from "react-icons/io";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  handleClear,
  handleBack,
  isBackVisible,
}) => {
  const inputClasses = useMemo(() => {
    return `${
      isBackVisible ? "font-bold text-black" : ""
    } py-1 w-full pl-8 text-black rounded border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200`;
  }, [isBackVisible]);

  const BackArrowIcon = useMemo(() => {
    return (
      <div
        className="absolute inset-y-0 left-2 flex items-center cursor-pointer font-bold text-black"
        onClick={handleBack}
      >
        <IoIosArrowBack className="text-xl font-extrabold text-black" />
      </div>
    );
  }, [handleBack]);

  const SearchIcon = useMemo(() => {
    return (
      <div className="absolute inset-y-0 left-2 flex items-center text-gray-600">
        <IoIosSearch className="text-xl font-extrabold" />
      </div>
    );
  }, []);

  const ClearIcon = useMemo(() => {
    return (
      <div
        className="absolute inset-y-0 right-12 flex items-center text-white cursor-pointer"
        onClick={handleClear}
      >
        <IoIosClose className="absolute left-5 text-3xl font-extrabold text-black" />
      </div>
    );
  }, [handleClear]);

  return (
    <div className="relative w-full">
      {isBackVisible ? BackArrowIcon : SearchIcon}

      <input
        type="text"
        placeholder="Search leagues..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={inputClasses}
      />

      {!isBackVisible && searchTerm.length > 0 && ClearIcon}
    </div>
  );
};

export default SearchBar;
