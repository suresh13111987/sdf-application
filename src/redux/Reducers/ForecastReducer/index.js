import {FORECAST_DATA_TYPES} from "../../Actions/Forecast/ForecastDataType";
import { APIFetchStatus } from "../../utils/fetchStatus";
const initialState={
    Categorydataapistatus:APIFetchStatus.BOOTED,
    CategoryResponse:[],
    FORECASTDataFetchState:APIFetchStatus.BOOTED,
    forecastDataresponse:[],
    productGraphfetchState:APIFetchStatus.BOOTED,
    productGraph:[],
    demandGraphfetchstate:APIFetchStatus.BOOTED,
    demandGraph:[],
    deviationGraphfetchstate:APIFetchStatus.BOOTED,
    deviationGraph:[],
    chooseGraphrelative:true,
    showSdf:0,
    showSdfmodified:0,
    deviationGraphbindvalue:[],
    selectedProduct:[],
    selectedDepdency:[],
    productDepenedency:[],
    productCategory:[],
    snapShotselectedvalue:[],
    snapShottoanalyze:[],
    lagsSelectedvalue:[],
    lagsFormeasurement:[],
    selectedDfuvalue:{},
    DFUdropdown:[]
}
export const ForeCastAccuracyData=(state=initialState,action)=>{
   
    switch(action.type)
    {
        case FORECAST_DATA_TYPES.FILTER_DETAILS_FETCHING:
        return {
        ...state,Categorydataapistatus:APIFetchStatus.FETCHING
        }
        case FORECAST_DATA_TYPES.FILTER_DETAILS_FETCHED:
            return{
                ...state,Categorydataapistatus:APIFetchStatus.FETCHED,
                CategoryResponse:action.payload
            }
            case FORECAST_DATA_TYPES.FILTER_DETAILS_FAILED:
            return{
             ...state,Categorydataapistatus:APIFetchStatus.FAILED
            }
            case FORECAST_DATA_TYPES.FORECAST_DATA_FETCHING:
                return{...state, FORECASTDataFetchState:APIFetchStatus.FETCHING};
            case FORECAST_DATA_TYPES.FORECAST_DATA_FETCHED:
                
                return{
                    
                    ...state,FORECASTDataFetchState:APIFetchStatus.FETCHED,
                    forecastDataresponse:action.payload,
                    
                }
            case FORECAST_DATA_TYPES.FORECAST_DATA_FAILED:
                return{
                    ...state,FORECASTDataFetchState:APIFetchStatus.FAILED
                };
            case FORECAST_DATA_TYPES.PRODUCT_TYPE_GRAPH_FETCHING:
                return{
                    ...state,productGraphfetchState:APIFetchStatus.FETCHING
                }
                case FORECAST_DATA_TYPES.PRODUCT_TYPE_GRAPH_FETCHED:
                    return{
                        ...state,productGraphfetchState:APIFetchStatus.FETCHED,
                        productGraph:action.payload
                    }
                case FORECAST_DATA_TYPES.PRODUCT_TYPE_GRAPH_FAILED:
                    return{
                        ...state,productGraphfetchState:APIFetchStatus.FAILED
                    }
                case FORECAST_DATA_TYPES.DEMAND_GRAPH_FETCHING:
                    return{
                        ...state,demandGraphfetchstate:APIFetchStatus.FETCHING
                    }  
                case FORECAST_DATA_TYPES.DEMAND_GRAPH_FETCHED:
                return{
                ...state,demandGraphfetchstate:APIFetchStatus.FETCHED,
                demandGraph:action.payload
                }  
              case FORECAST_DATA_TYPES.DEMAND_GRAPH_FAILED:
                return{
                    ...state,demandGraphfetchstate:APIFetchStatus.FAILED
                }
             case FORECAST_DATA_TYPES.DEVIATION_GRAPH_FETCHING:
                return{
                    ...state,deviationGraphfetchstate:APIFetchStatus.FETCHING
                }
                case FORECAST_DATA_TYPES.DEVIATION_GRAPH_FETCHED:
                    return{
                        ...state,deviationGraphfetchstate:APIFetchStatus.FETCHED,
                        deviationGraph:action.payload
                    }
                case FORECAST_DATA_TYPES.DEVIATION_GRAPH_FAILED:
                    return{
                        ...state,deviationGraphfetchstate:APIFetchStatus.FAILED,
                    }
                    case FORECAST_DATA_TYPES.CHOOSE_GRAPH_RELATIVE:
                        return{
                            ...state,chooseGraphrelative:action.value
                        }
                        case FORECAST_DATA_TYPES.SHOW_SDF:
                            return{
                                ...state,showSdf:action.value
                            }
                       case FORECAST_DATA_TYPES.SHOW_SDF_MODIFIED:
                        return{
                            ...state,showSdfmodified:action.value
                        } 
                        case FORECAST_DATA_TYPES.DEVIATION_GRPAH_CHANGE:
                            return{
                                ...state,deviationGraphbindvalue:action.value
                            }
                        case FORECAST_DATA_TYPES.SELECTED_PRODUCT:
                            return{
                                ...state,selectedProduct:action.value
                            }
                            case FORECAST_DATA_TYPES.SELECTED_DEPEDENCY:
                                return{
                                    ...state,selectedDepdency:action.value
                                }
                                case FORECAST_DATA_TYPES.PRODUCT_DEPEDENCY:
                                    return{
                                        ...state,productDepenedency:action.value
                                    }
                                    case FORECAST_DATA_TYPES.PRODUCT_CATEGORY_VALUES:
                                        return{
                                            ...state,productCategory:action.value
                                        }
                                        case FORECAST_DATA_TYPES.SNAP_SELECTED_VALUES:
                                            return{
                                                ...state,snapShotselectedvalue:action.value
                                            }
                                        case FORECAST_DATA_TYPES.SNAP_SHOT_ANALYZE:
                                            return{
                                                ...state,snapShottoanalyze:action.value
                                            }
                                        case FORECAST_DATA_TYPES.LAG_SELECTED_VALUES:
                                            return{
                                                ...state,lagsSelectedvalue:action.value
                                            }
                                        case FORECAST_DATA_TYPES.LAGS_FOR_MEASUREMENTS:
                                            return{
                                                ...state,lagsFormeasurement:action.value
                                            }
                                        case FORECAST_DATA_TYPES.SELECTED_DFU_VALUE:
                                            return{
                                                ...state,selectedDfuvalue:action.value
                                            }
                                        case FORECAST_DATA_TYPES.DFU_DROPDOWN:
                                            return{
                                                ...state,DFUdropdown:action.value
                                            }
            default :
            return initialState

    }
}