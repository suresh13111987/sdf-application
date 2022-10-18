import axios from "axios";
import {FORECAST_DATA_TYPES} from "./ForecastDataType";
import URLConfig from "../../../URLConfig";
export const getAllfilterdetails=()=>{
return async(dispatch)=>{
   try{
   dispatch({type:FORECAST_DATA_TYPES.FILTER_DETAILS_FETCHING,})
  let url=URLConfig.allFilterdetailsdb2();
   const response=await axios.post(url);
   dispatch({type:FORECAST_DATA_TYPES.FILTER_DETAILS_FETCHED,payload:response})
   }
   catch(e)
   {
      dispatch({type:FORECAST_DATA_TYPES.FILTER_DETAILS_FAILED})
   }
}
}
export const ForecastAccuracy=(reqbody)=>{
   return async(dispatch)=>{
       try{
        dispatch({
           type:FORECAST_DATA_TYPES.FORECAST_DATA_FETCHING,
        })
        let url=URLConfig.forecastAccuracydb2();
        const response=await axios.post(url,reqbody);
        dispatch({
           type:FORECAST_DATA_TYPES.FORECAST_DATA_FETCHED,
           payload:response
        })
       }
       catch(err){
        dispatch({
           type:FORECAST_DATA_TYPES.FORECAST_DATA_FAILED,
        })
       }
   }
}
export const productTypeforecastgraph=(reqbody)=>{
   return async(dispatch)=>{
      try{
       dispatch({
         type:FORECAST_DATA_TYPES.PRODUCT_TYPE_GRAPH_FETCHING
       })
       let url=URLConfig.porductTypeforecastdb2();
       const response=await axios.post(url,reqbody);
       dispatch({
         type:FORECAST_DATA_TYPES.PRODUCT_TYPE_GRAPH_FETCHED,
         payload:response
       })
      }
      catch(e)
      {
        dispatch({
         type:FORECAST_DATA_TYPES.PRODUCT_TYPE_GRAPH_FAILED
        })
      }
   }
}
export const demandVolumeforecastgraph=(reqbody)=>{
   console.log('reqbody',reqbody);
   return async(dispatch)=>{
      try{
         dispatch({
           type:FORECAST_DATA_TYPES.DEMAND_GRAPH_FETCHING
         })
         let url=URLConfig.demandVolumeforecastgraph();
         const response=await axios.post(url,reqbody);
         dispatch({
           type:FORECAST_DATA_TYPES.DEMAND_GRAPH_FETCHED,
           payload:response
         })
        }
        catch(e)
        {
          dispatch({
           type:FORECAST_DATA_TYPES.DEMAND_GRAPH_FAILED
          })
        }
   }
}
export const demandDeviationforecastgraph=(reqbody)=>{
   return async(dispatch)=>{
      try{
        dispatch({
         type:FORECAST_DATA_TYPES.DEVIATION_GRAPH_FETCHING
        })
        let url=URLConfig.demandDeviationforecastgraph();
        const response=await axios.post(url,reqbody);
        dispatch({
         type:FORECAST_DATA_TYPES.DEVIATION_GRAPH_FETCHED,
         payload:response
        })
      }
      catch(e)
      {
        dispatch({
         type:FORECAST_DATA_TYPES.DEVIATION_GRAPH_FAILED
        })
      }
   }
}
export const chooseGraphrelativeFunc=(parameter)=>{
   return(dispatch)=>{
    dispatch({
      type:FORECAST_DATA_TYPES.CHOOSE_GRAPH_RELATIVE,
      value:parameter
    })
   }
}
export const showSdfvalueset=(parameter)=>{
   return(dispatch)=>{
      dispatch(
      {type:FORECAST_DATA_TYPES.SHOW_SDF,
      value:parameter}
      )
   }
}
export const showSdfmodifiedset=(parameter)=>{
   return(dispatch)=>{
      dispatch(
         {
            type:FORECAST_DATA_TYPES.SHOW_SDF_MODIFIED,
            value:parameter
         }
      )
   }
}
export const setDeviationgraphchange=(parameter)=>{
   return(dispatch)=>{
      dispatch({
         type:FORECAST_DATA_TYPES.DEVIATION_GRPAH_CHANGE,
         value:parameter
      })
   }
}
export const setselectedProduct=(parameter)=>{
   return(dispatch)=>{
      dispatch({
         type:FORECAST_DATA_TYPES.SELECTED_PRODUCT,
         value:parameter
      })
   }
}
export const  setselectedDepdency=(parameter)=>{
   return(dispatch)=>{
      dispatch({
         type:FORECAST_DATA_TYPES.SELECTED_DEPEDENCY,
         value:parameter
      })
   }
}
export const setproductDepenedency=(parameter)=>{
   return(dispatch)=>{
      dispatch({
         type:FORECAST_DATA_TYPES.PRODUCT_DEPEDENCY,
         value:parameter
      })
   }
}
export const setproductCategory=(parameter)=>{
   return(dispatch)=>{
      dispatch({
         type:FORECAST_DATA_TYPES.PRODUCT_CATEGORY_VALUES,
         value:parameter
      })
   }
}
export const setsnapShotselectedvalue=(parameter)=>{
   return(dispatch)=>{
      dispatch({
         type:FORECAST_DATA_TYPES.SNAP_SELECTED_VALUES,
         value:parameter
      })
   }
}
export const setsnapShottoanalyze=(parameter)=>{
   return(dispatch)=>{
      dispatch({
         type:FORECAST_DATA_TYPES.SNAP_SHOT_ANALYZE,
         value:parameter
      })
   }
}
export const setlagsSelectedvalue=(parameter)=>{
   return(dispatch)=>{
      dispatch({
         type:FORECAST_DATA_TYPES.LAG_SELECTED_VALUES,
         value:parameter
      })
   }
}
export const setlagsFormeasurement=(parameter)=>{
   return(dispatch)=>{
      dispatch({
         type:FORECAST_DATA_TYPES.LAGS_FOR_MEASUREMENTS,
         value:parameter
      })
   }
}
export const setselectedDfuvalue=(parameter)=>{
   return(dispatch)=>{
      dispatch({
         type:FORECAST_DATA_TYPES.SELECTED_DFU_VALUE,
         value:parameter
      })
   }
}
export const setDFUdropdown=(parameter)=>{
   return(dispatch)=>{
      dispatch({
         type:FORECAST_DATA_TYPES.DFU_DROPDOWN,
         value:parameter
      })
   }
}