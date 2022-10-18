import React from "react";
import MySelect from "../React-Select";

const MainSelect = ({ options, onChange, value, ...rest }) => {
  return (
    <MySelect
      options={options}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      onChange={onChange}
      value={value}
      {...rest}
    />
  );
};

export default MainSelect;
