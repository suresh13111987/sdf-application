import React, {
  Fragment,
  DfuDropDownComponent,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useMemo } from "react";
import { Form } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import MainSelect from "../MainSelect";

export default DfuDropDownComponent = (props, ref) => {
  const { tableData, plotData, state } = useSelector(
    (state) => ({
      tableData: state.quickFilterData.tableData,
      plotData: state.plotData.plotData,
      state: state,
    }),
    shallowEqual
  );
  const { column } = props;

  const uniqueDfuRecords = useMemo(() => {
    const temp = tableData.map((dfuData) => dfuData[column.colDef.field]);
    return temp.filter((dfuData, i) => dfuData && temp.indexOf(dfuData) === i);
    // .map((e) => ({ value: e, label: e }));
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  return (
    <Fragment>
      {/* <input style={style} type="text" min="0" onInput={onInputBoxChanged} /> */}
      <Form.Control as={"select"} aria-label="Select" onChange={handleClick}>
        <option>Select {column.colDef.headerName} </option>

        {uniqueDfuRecords.map((option, index) => (
          <option key={index} value={option}>
            {/* <Form.Check type="checkbox" label={option} /> */}
            {option}
          </option>
        ))}
      </Form.Control>
    </Fragment>
  );
};
