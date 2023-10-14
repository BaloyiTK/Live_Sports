import React from "react";

const Tabs = ({ tab, selectedTab, onSelect, resetDate }) => (
  <button
    onClick={() => {
      onSelect(tab.id);
      resetDate();
    }}
    className={`${
      selectedTab === tab.id ? "bg-red-500 text-white" : "bg-gray-600 text-gray-300"
    } px-4 py-2 rounded-lg`}
  >
    {tab.label}
  </button>
);

export default Tabs;
