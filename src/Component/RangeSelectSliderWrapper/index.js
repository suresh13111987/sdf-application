import { useState, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { actionSelectRange } from "../../redux/Actions/PlotData";

import RangeSelectSlider from "../RangeSelectSlider";

const RangeSelectSliderWrapper = ({ name, filterData, selectiveRange }) => {
  const dispatch = useDispatch();
  const [selectedRange, setSelectedRange] = useState(selectiveRange);
  const selectedRangeRef = useRef(null);
  const [range] = useState(filterData);
  const handleSelectRange = useCallback(
    (e) => {
      if (selectedRangeRef.current) {
        clearTimeout(selectedRangeRef.current);
      }
      selectedRangeRef.current = setTimeout(() => {
        const startDate = range.find((_, i) => e[0] === i);
        const endDate = range.find((_, i) => e[1] === i);
        // const timeFilterDates = {
        //   startDate: startDate.split("-").join(" "),
        //   endDate: endDate.split("-").join(" "),
        // };
        console.log('range ------->', name, startDate, endDate)
        dispatch(actionSelectRange(name, { startDate, endDate }));
      }, 1000);
    },
    [selectedRange]
  );

  return (
    <RangeSelectSlider
      range={range}
      defaultValue={selectedRange}
      onChange={handleSelectRange}
      defaultRange={filterData}
      handleStyle={{
        height: 30,
        width: 30,
        marginTop: -14,
        backgroundColor: "#04BBF1",
        border: "white",
      }}
    />
  );
};
export default RangeSelectSliderWrapper;
