import {LOGIN_DATA_TYPES} from "../../Actions/LoginData/LoginDataType";
import { APIFetchStatus } from "../../utils/fetchStatus";
const initialState={
    loginDataFetchState:APIFetchStatus.BOOTED,
    loginDataresponse:{},
    loginchangeState:APIFetchStatus.BOOTED,
    loginfetchStateresponse:{},
    // languageChange:'en',
}
export const LoginDataReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case LOGIN_DATA_TYPES.LOGIN_DATA_FETCHING:
            return{...state, loginDataFetchState:APIFetchStatus.FETCHING};
        case LOGIN_DATA_TYPES.LOGIN_DATA_FETCHED:
            return{
                ...state,loginDataFetchState:APIFetchStatus.FETCHED,
                loginDataresponse:action.payload
            }
        case LOGIN_DATA_TYPES.LOGIN_DATA_FAILED:
            return{
                ...state,loginDataFetchState:APIFetchStatus.FAILED
            };
            case LOGIN_DATA_TYPES.LOGIN_CHANGE_DATA_FETCHING:
                return{
                ...state, loginchangeState:APIFetchStatus.FETCHING
                }
                case LOGIN_DATA_TYPES.LOGIN_CHANGE_DATA_FETCHED:
                return{
                ...state,loginchangeState:APIFetchStatus.FETCHED,
                loginfetchStateresponse:action.payload
                }
                case LOGIN_DATA_TYPES.LOGIN_CHANGE_DATA_FAILED:
                    return{
                        ...state,loginchangeState:APIFetchStatus.FAILED,
                    }
                // case LOGIN_DATA_TYPES.LANGUAGE_CHANGE_DATA:
                //     return{
                //         ...state, languageChange:action.payload,
                //     }
            default :
            return initialState

    }
}