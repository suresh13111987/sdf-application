import { lazy,Suspense } from "react";
import { Provider } from "react-redux";
import { Store } from "./redux/Store";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import DataLoadedPath from "./Component/DataLoadedPath";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Loginpage = lazy(() => import("./Component/Login"));
const SDFRoutes = lazy(() => import("./Pages/SDFRoutes"));
const Holcimuimaincomponent = lazy(() => import("./Component/Maincomponent"));
const ForCastmaincomponent = lazy(() =>
  import("./Component/Forecastaccuractcomponents")
);

function App() {
  return (
    <BrowserRouter>
    <Suspense>
      <Provider store={Store}>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/" element={<SDFRoutes />}>
            <Route
              path="Collaborativetool"
              element={
                <DataLoadedPath>
                  <Holcimuimaincomponent />
                </DataLoadedPath>
              }
            />
            <Route
              path="ForecastAccuracyReport"
              element={<ForCastmaincomponent />}
            />
          </Route>
        </Routes>
        <ToastContainer/>
        {/* <Switch>
          <Route path="/" component={Loginpage} exact />
          <Route path="/sdf" component={SDFRoutes} />
        </Switch> */}
        {/* <Route path="/Collaborativetool" component={SDFRoutes} exact /> */}
        {/* <Route
          path="/Collaborativetool"
          exact="/"
          element={
            <>
              <header>
                <Headercomponent></Headercomponent>
              </header>
              <Holcimuimaincomponent />
            </>
          }
        ></Route>
        <Route
          path="/ForecastAccuracyReport"
          element={
            <>
              <header>
                <Headercomponent></Headercomponent>
              </header>
              <ForCastmaincomponent />
            </>
          }
        ></Route> */}
      </Provider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
