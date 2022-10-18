import { APIFetchStatus } from "../../utils/fetchStatus";
import { FINAL_SUBMISSION_TYPES } from "../../Actions/FinalSubmission/finalSubmissionTypes";
const initialState = {
  saveDfuTableFetchStatus: APIFetchStatus.BOOTED,
  downloadtableFetchState: APIFetchStatus.BOOTED,
  toasterMsg: "",
};
export const FinalSubmissionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FINAL_SUBMISSION_TYPES.SAVE_DFU_TABLE_FETCHING:
      return { ...state, saveDfuTableFetchStatus: APIFetchStatus.FETCHING };
    case FINAL_SUBMISSION_TYPES.SAVE_DFU_TABLE_FETCHED:
      return { ...state, saveDfuTableFetchStatus: APIFetchStatus.FETCHED };
    case FINAL_SUBMISSION_TYPES.SAVE_DFU_TABLE_FAILED:
      return { ...state, saveDfuTableFetchStatus: APIFetchStatus.FAILED };

    case FINAL_SUBMISSION_TYPES.DOWNLOAD_TABLE_FETCHING:
      return { ...state, downloadtableFetchState: APIFetchStatus.FETCHING };
    case FINAL_SUBMISSION_TYPES.DOWNLOAD_TABLE_FETCHED:
      console.log(action.payload);
      return {
        ...state,
        downloadtableFetchState: APIFetchStatus.FETCHED,
        toasterMsg: action.payload,
      };
    case FINAL_SUBMISSION_TYPES.DOWNLOAD_TABLE_FAILED:
      return { ...state, downloadtableFetchState: APIFetchStatus.FAILED };
    default:
      return initialState;
  }
};
