import axios from "axios";
import URLConfig from "../../../URLConfig";
import { getPlotData } from "../../../Utils";
import { actionChangePlotDateChange, actionGetPlotData } from "../PlotData";
import { QUICK_FILTER_DATA_TYPES } from "./quickFilterDataType";
import { Store } from "../../Store";
import { defaultTake } from "../../../Utils/agGridUtils";

export const actionGetFilterData = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: QUICK_FILTER_DATA_TYPES.FILTER_DATA_FETCHING,
      });
      const url1 = URLConfig.getDemandFilter();
      const url2 = URLConfig.getForecastDateFilter();
      const requestArr = [
        { url: url1, param: { country: "algeria" } },
        { url: url2, param: { country: "algeria" } },
      ];

      const allFilter = requestArr.map((e) =>
        axios.get(e.url, { params: e.param })
      );

      const data = await Promise.all(allFilter);

      dispatch({
        type: QUICK_FILTER_DATA_TYPES.FILTER_DATA_FETCHED,
        payload: {
          demandFilterData: data[0].data?.data ?? [],
          foreCastFilterData: data[1].data?.data ?? [],
        },
      });
      // dispatch(fetchAllFilters());
    } catch (err) {
      dispatch({ type: QUICK_FILTER_DATA_TYPES.FILTER_DATA_FAILED });
    }
  };
};

export const actionGetTableData = (body) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: QUICK_FILTER_DATA_TYPES.TABLE_DATA_FETCHING,
      });
      // const body = tableRequestBody(selectedTableColumns);
      const URL = URLConfig.getDataTable();
      const res = await axios.post(URL + `?take=${defaultTake}&skip=0`, body);
      const records = { ...res.data, total: res.data.totalRecords };
      dispatch({
        type: QUICK_FILTER_DATA_TYPES.TABLE_DATA_FETCHED,
        payload: records,
      });
    } catch (err) {
      dispatch({
        type: QUICK_FILTER_DATA_TYPES.TABLE_DATA_FAILED,
      });
    }
  };
};

export const actionAppendDFUTableData = (body) => {
  return async (dispatch) => {
    const state = Store.getState();
    const { dfuTableTotalCount, tableData } = state.quickFilterData;
    const skipCount = tableData.length / defaultTake;
    const skip = skipCount;
    if (tableData.length < dfuTableTotalCount) {
      try {
        dispatch({
          type: QUICK_FILTER_DATA_TYPES.APPEND_TABLE_DATA_FETCHING,
        });
        const URL = URLConfig.getDataTable();
        const res = await axios.post(
          URL + `?take=${defaultTake}&skip=${skip}`,
          body
        );
        const records = { ...res.data, total: res.data.totalRecords };

        dispatch({
          type: QUICK_FILTER_DATA_TYPES.APPEND_TABLE_DATA_FETCHED,
          payload: records,
        });
      } catch (err) {
        dispatch({
          type: QUICK_FILTER_DATA_TYPES.APPEND_TABLE_DATA_FAILED,
        });
      }
    }
  };
};

export const actionGetQuickFilterData = (body) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: QUICK_FILTER_DATA_TYPES.QUICK_FILTER_DATA_FETCHING,
      });
      const URL = URLConfig.getFilters();

      const res = await axios.post(URL, body);
      const data = res.data;
      // const dates = getPlotData(Object.keys(body?.filter)[0], res.data);
      dispatch({
        type: QUICK_FILTER_DATA_TYPES.QUICK_FILTER_DATA_FETCHED,
        payload: { data, body },
      });
      dispatch(actionGetPlotData());
      // const ob = {
      //   startDate: dates[dates?.length - 1],
      //   endDate: dates[0],
      // };
      // dispatch(actionChangePlotDateChange(ob));
    } catch (err) {
      dispatch({
        type: QUICK_FILTER_DATA_TYPES.QUICK_FILTER_DATA_FAILED,
      });
    }
  };
};

export const fetchAllFilters = (range = {}) => {
  return (dispatch) => {
    const state = Store.getState();
    const { filterBody, obsolete } =
      state.quickFilterData.quickFilterDefaultData;
    const obs = obsolete === "Yes" ? true : false;
    dispatch(actionGetQuickFilterData({ ...filterBody, obsolete: obs }));
  };
};

export const defaultValueChange = ({ ...rest }) => {
  return (dispatch) => {
    dispatch({
      type: QUICK_FILTER_DATA_TYPES.DEFAULT_VALUE_CHANGED,
      payload: { ...rest },
    });
  };
};

export const actionSubmitAddDFU = (body, dates) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: QUICK_FILTER_DATA_TYPES.ADD_DFU_ROW_FETCHING,
      });
      const URL = URLConfig.submitDFUTableRow();
      const res = await axios.post(URL, body);
      dispatch({
        type: QUICK_FILTER_DATA_TYPES.ADD_DFU_ROW_FETCHED,
        payload: { data: res.data },
      });
      const temp = { ...body };
      delete temp["startDate"];
      delete temp["endDate"];

      const newBody = {
        excludedColumns: Object.keys(temp).filter((e) => e !== "quantity"),
        Dates: dates,
      };
      dispatch(actionGetTableData(newBody));
    } catch (err) {
      dispatch({
        type: QUICK_FILTER_DATA_TYPES.ADD_DFU_ROW_FAILED,
      });
    }
  };
};

export const actionChangeSubmitAddDFUField = (name, val) => {
  return (dispatch) => {
    dispatch({
      type: QUICK_FILTER_DATA_TYPES.ADD_DFU_ROW_CHANGED,
      payload: { name, val },
    });
  };
};

export const actionExportDfuTable = (body, callback) => {
  return async (dispatch) => {
    try {
      const URL = URLConfig.exportDFUTable();
      const res = await axios.post(URL, body);
      if (res.data) {
        callback(res.data.msg);
      }
    } catch (err) {}
  };
};

export const actionSetTimeFilterSelection = (filterName) => {
  return (dispatch) => {
    dispatch({
      type: QUICK_FILTER_DATA_TYPES.TIME_FILTER_TYPE_CHANGED,
      payload: { filterName },
    });
  };
};

export const actionQuickFilterChange = (change) => {
  return (dispatch) => {
    dispatch({
      type: QUICK_FILTER_DATA_TYPES.QUICK_FILTER_CHANGE,
      payload: change,
    });
  };
};

export const actionTimeFilterChange = (name, value) => {
  return (dispatch) => {
    dispatch({
      type: QUICK_FILTER_DATA_TYPES.TIME_FILTER_DATE_CHANGE,
      payload: { name, value },
    });
  };
};

export const actionUpdateTableData = (change) => {
  return (dispatch) => {
    const { colDef } = change;
    const state = Store.getState();

    const oldVal = state.plotData.plotDataRef.find(
      (pltref) => pltref.name.toLowerCase() === "sdf modified forecast"
    )[colDef.field];

    const newVal = state.plotData.plotData.find(
      (pltref) => pltref.name.toLowerCase() === "sdf modified forecast"
    )[colDef.field];

    let finalVal = parseFloat(newVal) / parseFloat(oldVal);

    if (finalVal === Infinity) {
      finalVal = 1;
    }
    console.log({ oldVal, newVal, finalVal });
    dispatch({
      type: QUICK_FILTER_DATA_TYPES.UPDATE_TABLE_DATA,
      payload: { change, finalVal },
    });
  };
};

export const actionGgetClickedCell = (col) => {
  return (dispatch) => {
    dispatch({
      type: QUICK_FILTER_DATA_TYPES.GET_TABLE_CELL,
      payload: col,
    });
  };
};
