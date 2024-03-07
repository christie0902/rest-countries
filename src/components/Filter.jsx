import React from "react";

const Filter = ({ label, filter, setFilter }) => {
  return (
    <div>
      <button
        onClick={() => setFilter(label)}
        style={{
          background: label === filter ? "purple" : "transparent",
          color: label === filter ? "white" : "black",
        }}
      >
        {label}
      </button>
    </div>
  );
};

export default Filter;
