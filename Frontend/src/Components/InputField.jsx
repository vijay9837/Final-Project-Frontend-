import React from "react";

const InputField = ({ type, name, borderColor, placeholder }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      style={{ borderColor: `${borderColor}` }}
      className=" outline-0 bg-transparent text-white w-full p-2 rounded-full"
    />
  );
};

export default InputField;
