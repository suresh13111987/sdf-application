import React, {
  Fragment,
  SdfDropDownComponent,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";

export default SdfDropDownComponent = (props, ref) => {
  const { column } = props;
  // expose AG Grid Filter Lifecycle callbacks
  //   useImperativeHandle(ref, () => {
  //     return {
  //       onParentModelChanged(parentModel) {
  //         // When the filter is empty we will receive a null value here
  //         if (!parentModel) {
  //           inputRef.current.value = "";
  //           setCurrentValue(null);
  //         } else {
  //           inputRef.current.value = parentModel.filter + "";
  //           setCurrentValue(parentModel.filter);
  //         }
  //       },
  //     };
  //   });

  console.log({ props });

  const onInputBoxChanged = (input) => {
    if (input.target.value === "") {
      // Remove the filter
      props.parentFilterInstance((instance) => {
        instance.onFloatingFilterChanged(null, null);
      });
      return;
    }

    alert(input.target.value);
  };

  const style = {
    width: "70px",
  };
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <Fragment>
      {/* <input style={style} type="text" min="0" onInput={onInputBoxChanged} /> */}
      <Form.Select aria-label="Default select example">
        <option>Select {column.colId} </option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select>
    </Fragment>
  );
};
