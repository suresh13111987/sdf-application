import axios from "axios";
import URLConfig from "../../../URLConfig";
import { defaultValueChange } from "../QuickFilterData";
import { FINAL_SUBMISSION_TYPES } from "./finalSubmissionTypes";

export const actionDownloadDFUTable = (callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FINAL_SUBMISSION_TYPES.DOWNLOAD_TABLE_FETCHING,
      });
      const URL = URLConfig.downloadDFUTable();
      const res = await axios.get(URL);
      dispatch({
        type: FINAL_SUBMISSION_TYPES.DOWNLOAD_TABLE_FETCHED,
        payload: res.data.msg,
      });
      callback(res.data.msg);
    } catch (err) {
      dispatch({
        type: FINAL_SUBMISSION_TYPES.DOWNLOAD_TABLE_FAILED,
      });
    }
  };
};

export const actionSaveDFUTable = (dfuData, plotData, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FINAL_SUBMISSION_TYPES.SAVE_DFU_TABLE_FETCHING,
      });
      let modifiedTableData = [];
      let modifiedPlotData = [];
      if (dfuData.length) {
        modifiedTableData = dfuData.reduce(
          (acc, curr) => [
            ...acc,
            {
              demand_period: curr.colDef.field,
              modifiedForecast: curr.newValue,
              region: curr.data.region,
              channel: curr.data.channel,
              customer_name: curr.data.customer_name,
              material_name: curr.data.material_name,
              package: curr.data.package,
              plant: curr.data.plant,
              ship_to_name: curr.data.ship_to_name,
              sales_rep_name: curr.data.sales_rep_name,
              segment: curr.data.segment,
              del_new: curr.data.del_new,
            },
          ],
          []
        );
      }
      if (plotData.length) {
        modifiedPlotData = plotData.reduce(
          (acc, curr) => [
            ...acc,
            {
              demand_period: curr.colDef.field,
              modifiedForecast: curr.newValue,
            },
          ],
          []
        );
      }
      const URL = URLConfig.saveDFUTable();
      const ob = {
        collbTotalData: modifiedTableData,
        dfuData: modifiedPlotData,
      };
      const res = await axios.put(URL, ob);
      dispatch({
        type: FINAL_SUBMISSION_TYPES.SAVE_DFU_TABLE_FETCHED,
        payload: res.data,
      });
      callback(res.data.message);
      dispatch(defaultValueChange({ saveTableData: true }));
    } catch (err) {
      dispatch({
        type: FINAL_SUBMISSION_TYPES.SAVE_DFU_TABLE_FAILED,
      });
    }
  };
};
