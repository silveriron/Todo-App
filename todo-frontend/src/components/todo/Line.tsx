import React from "react";

const Line = () => {
  return (
    <svg
      className="max-w-full h-[1px] mb-5"
      viewBox="0 0 1200 1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <line y1="0.5" x2={1200} y2="0.5" stroke="#E0E0E0" />
    </svg>
  );
};

export default Line;
