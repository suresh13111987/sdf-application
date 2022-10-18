import { getFormattedDate, getTotalSdftableSum } from "../../../Utils";
import { PLOT_DATA_TYPES } from "../../Actions/PlotData/plotDataTypes";
import { APIFetchStatus } from "../../utils/fetchStatus";
const initialState = {
  plotDataFetchState: APIFetchStatus.BOOTED,
  plotDataChangeFetchState: APIFetchStatus.BOOTED,
  sdfTableKys: [],
  plotData: [],
  savePlotDataTableRows: [],
  sdfTableTotalSum: 0,
  plotDataRef: [],
};

const PlotDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLOT_DATA_TYPES.PLOT_DATA_FETCHING:
      return { ...state, plotDataFetchState: APIFetchStatus.FETCHING };

    case PLOT_DATA_TYPES.PLOT_DATA_FETCHED:
      const { data } = action.payload;
      return {
        ...state,
        plotDataFetchState: APIFetchStatus.FETCHED,
        plotData: data,
        plotDataRef: JSON.parse(JSON.stringify(data)),
        sdfTableKys: Object.keys(data[0]).map((e) => ({
          value: e,
          label: e,
          text: e === "name",
        })),
        sdfTableTotalSum: getTotalSdftableSum(data),
      };

    case PLOT_DATA_TYPES.PLOT_DATA_FAILED:
      return { ...state, plotDataFetchState: APIFetchStatus.FAILED };

    case PLOT_DATA_TYPES.PLOT_DATA_CHANGE_FETCHING:
      return { ...state, plotDataChangeFetchState: APIFetchStatus.FETCHING };

    case PLOT_DATA_TYPES.PLOT_DATA_CHANGE_FETCHED:
      const { resData } = action.payload;
      return {
        ...state,
        plotDataChangeFetchState: APIFetchStatus.FETCHED,
        plotData: resData.data,
        sdfTableTotalSum: getTotalSdftableSum(resData.data),
      };

    case PLOT_DATA_TYPES.PLOT_DATA_UPDATE:
      const { oldValue, newValue, colDef } = action.payload;

      return {
        ...state,
        plotData: state.plotData.map((plt) => {
          if (plt?.name?.toLowerCase() === "sdf modified forecast") {
            return {
              ...plt,
              total: (parseFloat(plt.total) + parseFloat(newValue)).toFixed(2),
              [colDef.field]:
                parseFloat(plt[colDef.field]) + parseFloat(newValue),
            };
          }
          return plt;
        }),
      };

    case PLOT_DATA_TYPES.PLOT_DATA_SDF_FORECAST_CHANGED:
      return {
        ...state,
        plotData: state.plotData.map((e, i) => {
          if (action.payload.index === i) {
            return { ...e, forecast_enriched: action.payload.value };
          }
          return e;
        }),
      };

    case PLOT_DATA_TYPES.PLOT_DATA_CHANGE_FAILED:
      return { ...state, plotDataChangeFetchState: APIFetchStatus.FAILED };

    default:
      return state;
  }
};

export default PlotDataReducer;
