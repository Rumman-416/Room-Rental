import React from "react";

const UpdateForm = (props) => {
  return (
    <div>
      <h1>{props.id}</h1>
      <button className=" h-8 w-20 px-2 bg-blue-700 text-white m-5">update</button>
    </div>
  );
};

export default UpdateForm;
