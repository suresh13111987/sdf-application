import { combineReducers } from "redux";
import PlotDataReducer from "./PlotDataReducer";
import QuickFilterDataReducer from "./QuickFilterDataReducer";
import { LoginDataReducer } from "./LoginDataReducer";
import { FinalSubmissionReducer } from "./FinalSubmissionReducer";
import {ForeCastAccuracyData}from "./ForecastReducer";
const rootReducer = combineReducers({
  quickFilterData: QuickFilterDataReducer,
  plotData: PlotDataReducer,
  loginDataReducer: LoginDataReducer,
  finalSubmission: FinalSubmissionReducer,
  forecastAccurateReducer:ForeCastAccuracyData
});

export default rootReducer;
