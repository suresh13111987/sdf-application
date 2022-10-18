import DataLoadedPath from "../DataLoadedPath";

const SDFDataRoute = ({ children, ...rest }) => (
  <DataLoadedPath {...rest}>{children}</DataLoadedPath>
);

export default SDFDataRoute;
