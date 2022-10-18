//IIF
const URLConfig = (() => {
  const SDF_BASE_URL = process.env.REACT_APP_BASE_URL;
  const LOGIN_BASE_URL=process.env.REACT_APP_BASE_URL_LOGIN;
  const DASHBOARD_TWO_BASE_URL=process.env.REACT_APP_BASE_URL_FORECAST;
  const getFilters = () => SDF_BASE_URL + "/quickfilters/getFilters";
  const getQuickFilters = () => SDF_BASE_URL + "/quickfilters/getQuickFilters";

  const getDemandFilter = () =>
    SDF_BASE_URL + "/timefilters/getDemandDateFilter";

  const getForecastDateFilter = () =>
    SDF_BASE_URL + "/timefilters/getForecastDateFilter";

  const getDataPlot = () => SDF_BASE_URL + "/demandforecast/getDataPlot";
  const getDataTable = () => SDF_BASE_URL + "/tablegrouping/getTableData";
  const loginUser = () => LOGIN_BASE_URL + "/login";
  const changeLoginuser = () =>LOGIN_BASE_URL + "/changePassword";
  const submitDateSelection = () =>
    SDF_BASE_URL + "/timefilters/getDateSelection";

  const downloadDFUTable = () => SDF_BASE_URL + "/buttons/downloadDFUdata";
  const saveDFUTable = () => SDF_BASE_URL + "/buttons/savechangesAPI";
  const submitDFUTableRow = () => SDF_BASE_URL + "/buttons/addDFU";
  const exportDFUTable = () => SDF_BASE_URL + "/buttons/exportDFUdata";
  const allFilterdetailsdb2=()=>DASHBOARD_TWO_BASE_URL+"/getFilters";
  const forecastAccuracydb2=()=>DASHBOARD_TWO_BASE_URL+"/getAccuracyForecast";
  const porductTypeforecastdb2=()=>DASHBOARD_TWO_BASE_URL+"/getCategoryForecastType";
  const demandVolumeforecastgraph=()=>DASHBOARD_TWO_BASE_URL+"/getDemandForecastVolume";
  const demandDeviationforecastgraph=()=>DASHBOARD_TWO_BASE_URL+"/getdeviationForecast";
  return {
    getFilters,
    getDemandFilter,
    getForecastDateFilter,
    getDataPlot,
    getDataTable,
    loginUser,
    changeLoginuser,
    getQuickFilters,
    submitDateSelection,
    downloadDFUTable,
    saveDFUTable,
    submitDFUTableRow,
    exportDFUTable,
    allFilterdetailsdb2,
    forecastAccuracydb2,
    porductTypeforecastdb2,
    demandVolumeforecastgraph,
    demandDeviationforecastgraph
  };
})();

export default URLConfig;
