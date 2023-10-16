import React from "react";

const Tabs = ({ tab, selectedTab, onSelect, resetDate }) => {
  const isActive = selectedTab === tab.id;

  const buttonClasses = `p-1.5 rounded-lg transition-all duration-300 ease-in-out ${
    isActive
      ? "bg-red-500 text-white  hover:text-white"
      : "bg-gray-200 text-gray-700"
  }`;

  return (
    <button
      onClick={() => {
        onSelect(tab.id);
        resetDate();
      }}
      className={buttonClasses}
    >
      {tab.label}
    </button>
  );
};

export default Tabs;
