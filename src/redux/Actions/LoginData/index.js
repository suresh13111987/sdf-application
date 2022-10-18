import axios from "axios";
import URLConfig from "../../../URLConfig";
import { LOGIN_DATA_TYPES } from "./LoginDataType";
export const actionLogindata = (reqbody) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOGIN_DATA_TYPES.LOGIN_DATA_FETCHING,
      });
      const url = URLConfig.loginUser();
      console.log('-------->url',url);
      const response = await axios.post(url, reqbody);
      dispatch({
        type: LOGIN_DATA_TYPES.LOGIN_DATA_FETCHED,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: LOGIN_DATA_TYPES.LOGIN_DATA_FAILED,
      });
    }
  };
};
export const actionChangepassword = (reqbody) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN_DATA_TYPES.LOGIN_CHANGE_DATA_FETCHING });
      const url = URLConfig.changeLoginuser();
      const response = await axios.post(url, reqbody);
      dispatch({
        type: LOGIN_DATA_TYPES.LOGIN_CHANGE_DATA_FETCHED,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: LOGIN_DATA_TYPES.LOGIN_CHANGE_DATA_FAILED,
      });
    }
  };
};
// export const actionChangelanguage=(reqbody)=>{
//    return async(dispatch)=>{
//      dispatch({
//       type:LOGIN_DATA_TYPES.LANGUAGE_CHANGE_DATA,
//       payload:reqbody
//      })
//    }
// }
