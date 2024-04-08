import React from "react";

const Namenav = () => {
  return (
    <div className="bg-yellow-500 h-12 flex items-center">
      <input
        type="button"
        value="<--"
        className="h-8 w-8 bg-yellow-500 cursor-pointer m-2"
      />
      <span className="text-center flex-1">Hello Name!</span>
    </div>
  );
};

export default Namenav;
