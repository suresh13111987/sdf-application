import { isEmpty } from "lodash";
import React from "react";
import { default as ReactSelect } from "react-select";

const MySelect = (props) => {
  if (props.allowSelectAll) {
    return (
      <ReactSelect
        {...props}
        options={[props.allOption, ...props.options]}
        onChange={(selected) => {
          const isAllSelected = selected.find((e) => e.value === "*");
          if (!isEmpty(isAllSelected)) {
            return props.onChange(props.options);
          }
          return props.onChange(selected);
        }}
      />
    );
  }

  return <ReactSelect {...props} />;
};

MySelect.defaultProps = {
  allOption: {
    label: "Select all...",
    value: "*",
  },
};

export default MySelect;
