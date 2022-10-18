import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const RangeSelectSlider = (props) => {
  const { onChange, defaultValue, defaultRange, handleStyle } = props;

  return (
    <Range
      marks={defaultRange}
      min={1}
      max={Object.keys(defaultRange).length}
      defaultValue={defaultValue}
      onChange={onChange}
      handleStyle={handleStyle}
    />
  );
};

export default RangeSelectSlider;
