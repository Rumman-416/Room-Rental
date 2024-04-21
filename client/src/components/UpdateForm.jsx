import React from "react";

const UpdateForm = (props) => {
  return (
    <div>
      <h1>{props.id}</h1>
      <button className=" px-5 py-1 bg-blue-600 text-white m-5 rounded-md">
        update
      </button>
    </div>
  );
};

export default UpdateForm;
