import { Suspense } from "react";
import Header from "../../Component/Header";
import { Outlet } from "react-router-dom";
import DataLoadedPath from "../../Component/DataLoadedPath";

const SDFRoutes = () => {
  return (
    <>
      <Header />
      <Suspense fallback>
        <Outlet />
      </Suspense>

      {/* <Switch>
        
        <SDFDataRoute path={`${match.url}/Collaborativetool`} exact>
          <Holcimuimaincomponent />
        </SDFDataRoute>
        
        <SDFDataRoute path={`${match.url}/ForecastAccuracyReport`} exact>
          <ForCastmaincomponent />
        </SDFDataRoute>
      </Switch> */}
    </>
  );
};

export default SDFRoutes;
