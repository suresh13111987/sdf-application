import axios from "axios";
import URLConfig from "../../../URLConfig";
import {
  demandDefaultRange,
  forecastDefaultRange,
  getFormattedDate,
  getTimeFilterSelectedDates,
  submitDaterangeRequestBody,
} from "../../../Utils";
import { Store } from "../../Store";
import {
  actionQuickFilterChange,
  actionQuickFilterDatesChange,
  actionSetTimeFilterSelection,
  defaultValueChange,
} from "../QuickFilterData";
import { PLOT_DATA_TYPES } from "./plotDataTypes";

export const actionGetPlotData = (body) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PLOT_DATA_TYPES.PLOT_DATA_FETCHING });
      const url = URLConfig.getDataPlot();
      const state = Store.getState();
      const { quickFilterDates } = state.quickFilterData;
      let ob;
      // if (
      //   quickFilterDefaultData["range"] &&
      //   timeFilterSelectedName === "demand_period"
      // ) {
      //   ob = getTimeFilterSelectedDates(
      //     demandDefaultRange,
      //     quickFilterDefaultData["range"]
      //   );
      // } else if (
      //   quickFilterDefaultData["range"] &&
      //   timeFilterSelectedName === "forecast_period"
      // ) {
      //   ob = getTimeFilterSelectedDates(
      //     forecastDefaultRange,
      //     quickFilterDefaultData["range"]
      //   );
      // } else {

      //   ob = quickFilterDates;
      // }
      const res = await axios.post(url, { Dates: quickFilterDates });
      dispatch({
        type: PLOT_DATA_TYPES.PLOT_DATA_FETCHED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: PLOT_DATA_TYPES.PLOT_DATA_FAILED });
    }
  };
};

export const actionSelectRange = (name, range) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: PLOT_DATA_TYPES.PLOT_DATA_CHANGE_FETCHING,
      });
      dispatch(
        actionQuickFilterChange({
          quickFilterDates: range,
          rangeSelection: true,
        })
      );
      // dispatch(actionSetTimeFilterSelection({ filterName: name }));

      const URL = URLConfig.submitDateSelection();

      const body = submitDaterangeRequestBody(name, range);
      const res = await axios.post(URL, body);
      dispatch({
        type: PLOT_DATA_TYPES.PLOT_DATA_CHANGE_FETCHED,
        payload: { resData: res.data },
      });

      dispatch(defaultValueChange({ name }));
    } catch (err) {
      dispatch({
        type: PLOT_DATA_TYPES.PLOT_DATA_CHANGE_FAILED,
      });
    }
  };
};

export const actionUpdatePlotData = (changedData) => {
  // const dates = [...changedData];
  // dates.forEach((item) => {
  //   delete item["material_code"];
  //   delete item["customer_name"];
  //   delete item["region"];
  //   delete item["name"];
  //   delete item["quantity"];
  //   delete item["customer_name"];
  //   delete item["plant"];
  //   delete item["package"];
  //   delete item["ship_to_name"];
  //   delete item["sales_rep_name"];
  //   delete item["segment"];
  //   delete item["del_new"];
  //   delete item["channel"];
  //   delete item["material_name"];
  //   delete item["total"];
  // });
  // const keys = Object.keys(dates[0]);
  // const vals = Object.values(dates);
  // let total = 0;
  // const ob = {};
  // console.log({ keys });

  // Array.prototype.sum = function (prop) {
  //   for (var i = 0, _len = this.length; i < _len; i++) {
  //     total += +this[i][prop];
  //   }
  //   return total;
  // };
  // for (let i = 0; i < keys.length; i++) {
  //   ob[getFormattedDate(keys[i])] = vals.sum(keys[i]);
  //   total = 0;
  // }
  return (dispatch) => {
    dispatch({
      type: PLOT_DATA_TYPES.PLOT_DATA_UPDATE,
      payload: changedData,
    });
  };
};

export const actionChangeSDFForecast = (value, index) => {
  return (dispatch) => {
    dispatch({
      type: PLOT_DATA_TYPES.PLOT_DATA_SDF_FORECAST_CHANGED,
      payload: { value, index },
    });
  };
};

export const actionChangePlotDateChange = (date) => {
  return (dispatch) => {
    dispatch({
      type: PLOT_DATA_TYPES.PLOT_DATA_DATE_CHANGE,
      payload: date,
    });
  };
};
