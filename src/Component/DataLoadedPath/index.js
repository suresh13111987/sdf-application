import { useEffect } from "react";
import { useState, useLayoutEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  actionGetFilterData,
  actionGetTableData,
  fetchAllFilters,
} from "../../redux/Actions/QuickFilterData";
import { APIFetchStatus } from "../../redux/utils/fetchStatus";
import { totalMonths } from "../../Utils";
import { columnFields } from "../../Utils/agGridUtils";

const DataLoadedPath = ({ children }) => {
  const dispatch = useDispatch();
  const [error, showError] = useState(false);
  const [loading, showLoading] = useState(true);
  const {
    filterDataFetchState,
    quickFilterDataFetchState,
    plotDataFetchState,
    tableDataFetchState,
  } = useSelector(
    (state) => ({
      filterDataFetchState: state.quickFilterData.filterDataFetchState,
      quickFilterDataFetchState:
        state.quickFilterData.quickFilterDataFetchState,
      plotDataFetchState: state.plotData.plotDataFetchState,
      tableDataFetchState: state.quickFilterData.tableDataFetchState,
    }),
    shallowEqual
  );

  useLayoutEffect(() => {
    if (filterDataFetchState === APIFetchStatus.BOOTED) {
      dispatch(actionGetFilterData());
    }
    if (tableDataFetchState === APIFetchStatus.BOOTED) {
      const body = {
        excludedColumns: columnFields
          .map((c) => c.value)
          .filter((f) => f && f !== "quantity"),
        Dates: totalMonths.map((e) => `${e} ${new Date().getFullYear()}`),
      };
      dispatch(actionGetTableData(body));
    }
    if (quickFilterDataFetchState === APIFetchStatus.BOOTED) {
      showLoading(true);
      // const body = {
      //   filter: {
      //     YTD: ["Jan 2021"],
      //   },
      // };
      // dispatch(actionGetFilterData(body));
      dispatch(fetchAllFilters());
    } else if (
      quickFilterDataFetchState === APIFetchStatus.FETCHED &&
      plotDataFetchState === APIFetchStatus.FETCHED
    ) {
      showLoading(false);
    } else {
      showLoading(true);
    }
  }, [quickFilterDataFetchState, plotDataFetchState]);

  return (
    // <Route
    //   // {...rest}
    //   element={error ? <h5>Error</h5> : loading ? <h5>Loading</h5> : children}
    // />
    <>{error ? <h5>Error</h5> : children}</>
  );
};

export default DataLoadedPath;
