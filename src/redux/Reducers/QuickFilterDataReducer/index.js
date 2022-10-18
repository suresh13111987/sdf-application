import { cloneDeep, isEmpty } from "lodash";
import moment from "moment";
import { getPlotData, getYTDInputDates } from "../../../Utils";
import { columnFields } from "../../../Utils/agGridUtils";
import { QUICK_FILTER_DATA_TYPES } from "../../Actions/QuickFilterData/quickFilterDataType";
import { APIFetchStatus } from "../../utils/fetchStatus";
const initialState = {
  filterDataFetchState: APIFetchStatus.BOOTED,
  quickFilterDataFetchState: APIFetchStatus.BOOTED,
  timeFilterDataFetchState: APIFetchStatus.BOOTED,
  tableDataAppendFetchState: APIFetchStatus.BOOTED,
  tableDataFetchState: APIFetchStatus.BOOTED,
  quickFilterData: [],
  filterData: [],
  demandFilterData: [],
  foreCastFilterData: [],
  tableData: [],
  dfuTableTotalCount: 0,
  dfuTableCols: [],
  timeFilterData: [],
  quickFilterDefaultData: {
    name: "YTD",
    filterBody: {
      ...getYTDInputDates,
    },
    obsolete: "Yes",
  },
  quickFilterDates: [],
  dfuAddRowData: {},
  saveDfuTableRowFetchState: APIFetchStatus.BOOTED,
  tableDateHeads: [],
  rangeSelection: false,
  addDfuDropDownOption: {
    plant: [],
    channel: [],
    region: [],
    pkg: [],
    segment: [],
    del_new: [],
  },
  clickedCell: null,
  timeFilterDates: {
    demandStartDate: new Date(),
    demandEndDate: new Date(),
    forecastStartDate: new Date(),
    forecastEndDate: new Date(),
    demandFilterEndDate: null,
    forecastFilterStartDate: null,
  },
};

const QuickFilterDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUICK_FILTER_DATA_TYPES.FILTER_DATA_FETCHING:
      return { ...state, filterDataFetchState: APIFetchStatus.FETCHING };

    case QUICK_FILTER_DATA_TYPES.FILTER_DATA_FETCHED:
      const demndFilterData = action.payload.demandFilterData?.map(
        (e) => e.demand_period
      );
      const foreCastFilterData = action.payload.foreCastFilterData?.map(
        (e) => e.forecast_period
      );
      const demandFilterEndDate = demndFilterData[demndFilterData.length - 1]
        ?.split("-")
        ?.join(" 20");
      const forecastFilterStartDate = foreCastFilterData[0]
        ?.split("-")
        ?.join(" 20");

      return {
        ...state,
        filterDataFetchState: APIFetchStatus.FETCHED,
        demandFilterData: demndFilterData,
        foreCastFilterData: foreCastFilterData,
        timeFilterDates: {
          ...state.timeFilterDates,
          demandFilterEndDate: new Date(moment(demandFilterEndDate).format()),
          forecastFilterStartDate: new Date(
            moment(forecastFilterStartDate).format()
          ),
          demandEndDate: new Date(moment(demandFilterEndDate).format()),
          forecastStartDate: new Date(moment(forecastFilterStartDate).format()),
        },
      };

    case QUICK_FILTER_DATA_TYPES.FILTER_DATA_FAILED:
      return { ...state, filterDataFetchState: APIFetchStatus.FAILED };

    case QUICK_FILTER_DATA_TYPES.QUICK_FILTER_DATA_FETCHING:
      return { ...state, quickFilterDataFetchState: APIFetchStatus.FETCHING };

    case QUICK_FILTER_DATA_TYPES.QUICK_FILTER_DATA_FETCHED:
      const { data, body } = action.payload;
      let dates;
      const fName = Object.keys(body?.filter)[0];
      if (!state.rangeSelection) {
        dates = getPlotData(Object.keys(body?.filter)[0], data);
      } else {
        dates = state.quickFilterDates;
      }
      let frcstEndDate;
      let dmndStartDate;
      console.log({ frcstEndDate, dmndStartDate, dates });

      if (dates.length) {
        if (fName === "forecastNext6M") {
          frcstEndDate = new Date(moment(dates[dates.length - 1]).format());
        } else if (fName === "demandLast12M") {
          dmndStartDate = new Date(moment(dates[dates.length - 1]).format());
        } else {
          dmndStartDate = new Date(moment(dates[0]).format());
          frcstEndDate = new Date(moment(dates[dates.length - 1]).format());
        }
      }

      return {
        ...state,
        quickFilterDataFetchState: APIFetchStatus.FETCHED,
        quickFilterData: data,
        quickFilterDates: dates,
        quickFilterDefaultData: {
          ...state.quickFilterDefaultData,
          name: fName,
        },
        timeFilterDates: {
          ...state.timeFilterDates,
          forecastEndDate: frcstEndDate
            ? frcstEndDate
            : state.timeFilterDates.forecastEndDate,
          demandStartDate: dmndStartDate
            ? dmndStartDate
            : state.timeFilterDates.demandStartDate,
          forecastStartDate: state.timeFilterDates.forecastFilterStartDate,
          demandEndDate: state.timeFilterDates.demandFilterEndDate,
        },
      };

    case QUICK_FILTER_DATA_TYPES.QUICK_FILTER_DATA_FAILED:
      return { ...state, quickFilterDataFetchState: APIFetchStatus.FAILED };

    case QUICK_FILTER_DATA_TYPES.TABLE_DATA_FETCHING:
      return { ...state, tableDataFetchState: APIFetchStatus.FETCHING };

    case QUICK_FILTER_DATA_TYPES.TABLE_DATA_FETCHED:
      const rowData = [...action.payload.data];
      const clonedArr = cloneDeep(rowData);
      const rowHeads = Object.keys(rowData[0]);
      const heads = rowHeads.filter(
        (e) => !columnFields.map((c) => c.value).includes(e)
      );

      const cols = [
        ...columnFields.filter((_) => rowHeads.includes(_.value)),
        ...heads.map((e) => ({ value: e, label: e })),
      ];

      const plant = clonedArr.map((pl) => pl.plant).filter((e) => e);
      const region = clonedArr.map((pl) => pl.region).filter((e) => e);
      const channel = clonedArr.map((pl) => pl.channel).filter((e) => e);
      const pkg = clonedArr.map((pl) => pl.package).filter((e) => e);
      const segment = clonedArr.map((pl) => pl.segment).filter((e) => e);
      const del_new = clonedArr.map((pl) => pl.del_new).filter((e) => e);
      return {
        ...state,
        tableDataFetchState: APIFetchStatus.FETCHED,
        tableData: action.payload.data,
        tableDataCopy: cloneDeep(action.payload.data),
        dfuTableTotalCount: +action.payload.totalRecords,
        dfuTableCols: cols,
        tableDateHeads: heads,
        addDfuDropDownOption: {
          ...state.addDfuDropDownOption,
          plant: plant.filter((item, i) => plant.indexOf(item) === i),
          region: region.filter((item, i) => region.indexOf(item) === i),
          channel: channel.filter((item, i) => channel.indexOf(item) === i),
          pkg: pkg.filter((item, i) => pkg.indexOf(item) === i),
          segment: segment.filter((item, i) => segment.indexOf(item) === i),
          del_new: del_new.filter((item, i) => del_new.indexOf(item) === i),
        },
      };

    case QUICK_FILTER_DATA_TYPES.TIME_FILTER_DATA_FETCHING:
      return { ...state, timeFilterDataFetchState: APIFetchStatus.FETCHING };

    case QUICK_FILTER_DATA_TYPES.TIME_FILTER_DATA_FETCHED:
      return {
        ...state,
        timeFilterDataFetchState: APIFetchStatus.FETCHED,
        timeFilterData: action.payload.data,
      };

    case QUICK_FILTER_DATA_TYPES.TIME_FILTER_DATA_FAILED:
      return { ...state, timeFilterDataFetchState: APIFetchStatus.FAILED };

    case QUICK_FILTER_DATA_TYPES.DEFAULT_VALUE_CHANGED:
      const ob = action.payload
        ? {
            ...state.quickFilterDefaultData,
            ...action.payload,
          }
        : { ...state.quickFilterDefaultData };

      return {
        ...state,
        quickFilterDefaultData: ob,
        quickFilterDataFetchState: APIFetchStatus.BOOTED,
      };
    case QUICK_FILTER_DATA_TYPES.APPEND_TABLE_DATA_FETCHING:
      return { ...state, tableDataAppendFetchState: APIFetchStatus.FETCHING };

    case QUICK_FILTER_DATA_TYPES.APPEND_TABLE_DATA_FETCHED:
      return {
        ...state,
        tableDataAppendFetchState: APIFetchStatus.FETCHED,
        tableData: [...state.tableData, ...action.payload.data],
      };

    case QUICK_FILTER_DATA_TYPES.APPEND_TABLE_DATA_FAILED:
      return { ...state, tableDataAppendFetchState: APIFetchStatus.FAILED };

    case QUICK_FILTER_DATA_TYPES.ADD_DFU_ROW_CHANGED:
      const { name, val } = action.payload;
      return {
        ...state,
        dfuAddRowData: { ...state.dfuAddRowData, [name]: val },
      };

    case QUICK_FILTER_DATA_TYPES.ADD_DFU_ROW_FETCHING:
      return {
        ...state,
        saveDfuTableRowFetchState: APIFetchStatus.FETCHING,
      };

    case QUICK_FILTER_DATA_TYPES.ADD_DFU_ROW_FETCHED:
      // const tbleheads = [...state.tableDateHeads, ...action.payload.newRow];
      return {
        ...state,
        saveDfuTableRowFetchState: APIFetchStatus.FETCHED,
        // tableData: [...state.tableData, ...tbleheads],
      };
    case QUICK_FILTER_DATA_TYPES.ADD_DFU_ROW_FAILED:
      return {
        ...state,
        saveDfuTableRowFetchState: APIFetchStatus.FAILED,
      };

    case QUICK_FILTER_DATA_TYPES.UPDATE_TABLE_DATA:
      const { finalVal, change } = action.payload;
      const { field } = change.colDef;
      const datesArr = Object.keys(state.tableData[0]).filter(
        (item) =>
          !columnFields.map((e) => e.value).includes(item) &&
          item !== "name" &&
          item !== "total"
      );
      const temp = state.tableDataCopy.map((plt) => {
        const tableVal = parseFloat(plt[field]);
        return {
          ...plt,
          [field]: tableVal ? (tableVal * finalVal).toFixed(2) : null,
        };
      });
      return {
        ...state,
        tableData: temp.map((td) => ({
          ...td,
          total:
            td.total && td?.name?.toLowerCase() === "sdf modified forecast"
              ? datesArr.reduce((acc, curr) => {
                  return acc + (td[curr] ? parseFloat(td[curr]) : 0);
                }, 0)
              : td.total,
        })),
      };

    // case QUICK_FILTER_DATA_TYPES.TIME_FILTER_TYPE_CHANGED:
    //   const { filterName } = action.payload;
    //   return {
    //     ...state,
    //     timeFilterSelectedName: filterName,
    //     // quickFilterDefaultData: {
    //     //   ...state.quickFilterDefaultData,
    //     //   name: filterName,
    //     // },
    //   };
    case QUICK_FILTER_DATA_TYPES.RESET_ADD_DFU_TABLE:
      return { ...state, dfuAddRowData: {} };

    case QUICK_FILTER_DATA_TYPES.QUICK_FILTER_CHANGE:
      return { ...state, ...action.payload };

    case QUICK_FILTER_DATA_TYPES.GET_TABLE_CELL:
      return { ...state, clickedCell: action.payload };

    case QUICK_FILTER_DATA_TYPES.TIME_FILTER_DATE_CHANGE:
      return {
        ...state,
        timeFilterDates: {
          ...state.timeFilterDates,
          [action.payload.name]: action.payload.value,
        },
      };

    default:
      return state;
  }
};

export default QuickFilterDataReducer;
