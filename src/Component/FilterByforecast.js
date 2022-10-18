import "../css/FilterByforecast.css";
import React,{useEffect} from "react";
import RangeSelectSliderWrapper from "./RangeSelectSliderWrapper";
import { forecastDefaultRange } from "../Utils";
import { useTranslation } from "react-i18next";
export const FilterByforecast = (props) => {
  const {t,i18n}=useTranslation();
  useEffect(()=>{
    i18n.changeLanguage(window.sessionStorage.getItem('language'));
   },[])
  const { forecast_period } = props;

  return (
    <div className="row addFilterbyforcastalignment">
      <div className="col-sm-12 border ">
        <div className="row addFilterforecast">{t('FILTER BY FORECAST PERIOD')}</div>
        <div className="row addMargintoptorow">
          <RangeSelectSliderWrapper
            name="forecast_period"
            selectiveRange={[
              forecastDefaultRange.indexOf(
                forecast_period?.["startDate"] ?? "May-21"
              ),
              forecastDefaultRange.indexOf(
                forecast_period?.["endDate"] ?? "Jun-21"
              ),
            ]}
            filterData={forecastDefaultRange}
          />
        </div>
      </div>
    </div>
  );
};
export default FilterByforecast;
