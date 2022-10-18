import { Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  actionQuickFilterChange,
  actionSetTimeFilterSelection,
  defaultValueChange,
  fetchAllFilters,
} from "../../redux/Actions/QuickFilterData";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import YearlytotalVolumes from "../YearlytotalVolumes";

import {
  convertToMillion,
  getDemandInputDates,
  getFcDemandInputDates,
  getYTDInputDates,
} from "../../Utils";
import moment from "moment";
const KPI = ({ filterData, volumes, obsolete, name, timeFilterDates }) => {
  const dispatch = useDispatch();
  const handleObsChange = (e) => {
    e.preventDefault();
    const obsolete = e.target.value;
    dispatch(defaultValueChange({ obsolete }));
  };
  const Location = useLocation();
  const { t, i18n } = useTranslation();
  const filterType = String(name);
  useEffect(() => {
    i18n.changeLanguage(window.sessionStorage.getItem("language"));
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 p-0">
          {/* <div className="row kpsFontcolor addKPISproperty">{t('KPIS')}</div> */}
          <span className="addKPISproperty">{t("KPIS")}</span>
        </div>
      </div>
      {/* <div className="row border shadow addquickmarginStart quickFilter"> */}
      <div className="row border shadow quickFilter">
        <div className="row">
          <div className="col-sm-2  quickFilterfontcolor addquickFilterFontsize">
            {t("QUICK FILTERS")}
          </div>
          <div className="col-md-2 allquickattribute">
            {/* <div className="kpsFontcolor addquickFilterFontsize"> YTD</div> */}
            <button
              className={
                filterType === "YTD"
                  ? "btn btn-default  ChangequickColorbutton"
                  : "btn btn-default quickDropdown"
              }
              onClick={(e) => {
                e.preventDefault();
                // const [name, filterBody] = [
                //   "YTD",
                //   {
                //     filter: { YTD: ["Mar " + 2021] },
                //   },
                // ];
                // dispatch(actionSetTimeFilterSelection("YTD"));
                dispatch(
                  actionQuickFilterChange({
                    rangeSelection: false,
                  })
                );
                dispatch(
                  defaultValueChange({
                    filterBody: getYTDInputDates,
                    name: "YTD",
                  })
                );
              }}
            >
              YTD
            </button>
          </div>
          <div className="col-md-2 allquickattribute">
            {/* <div className="kpsFontcolor addquickFilterFontsize ">
                FC NEXT 6M
              </div> */}
            <button
              className={
                filterType === "forecastNext6M"
                  ? "btn btn-default ChangequickColorbutton"
                  : "btn btn-default quickDropdown"
              }
              onClick={(e) => {
                e.preventDefault();
                // const [name, filterBody] = [
                //   "forecastNext6M",
                //   {
                //     filter: {
                //       forecastNext6M: ["Jul " + CurrentDateValue[3]],
                //     },
                //   },
                // ];
                // dispatch(actionSetTimeFilterSelection("forecastNext6M"));
                dispatch(
                  actionQuickFilterChange({
                    rangeSelection: false,
                  })
                );
                dispatch(
                  defaultValueChange({
                    filterBody: getFcDemandInputDates,
                    name: "forecastNext6M",
                  })
                );
              }}
            >
              FC NEXT 6M
            </button>
          </div>
          <div className="col-md-3 allquickattribute">
            {/* <div className="kpsFontcolor addquickFilterFontsize ">
                DEMAND LAST 6M
              </div> */}
            <button
              className={
                filterType === "demandLast12M"
                  ? "btn btn-default ChangequickColorbutton"
                  : "btn btn-default quickDropdown"
              }
              onClick={(e) => {
                e.preventDefault();
                // const [name, filterBody] = [
                //   "demandLast12M",
                //   {
                //     filter: {
                //       demandLast12M: ["Jul " + CurrentDateValue[3]],
                //     },
                //   },
                // ];
                // dispatch(actionSetTimeFilterSelection("demandLast12M"));
                dispatch(
                  actionQuickFilterChange({
                    rangeSelection: false,
                  })
                );
                dispatch(
                  defaultValueChange({
                    filterBody: getDemandInputDates(
                      timeFilterDates.demandFilterEndDate
                    ),
                    name: "demandLast12M",
                  })
                );
              }}
            >
              DEMAND LAST 12M
            </button>
          </div>
          <div className="col-md-3 allquickattribute">
            {/* <div className="kpsFontcolor addquickFilterFontsize">
                INCLUDE OBSOLETE DFU
              </div> */}
            {/* <select className="IncludeobsoluteDFU">
                <option selected>YES</option>
                <option selected>NO</option>
              </select> */}
            <Form.Control
              as="select"
              className="IncludeobsoluteDFU"
              aria-label="Select OBSOLETE DFU"
              onChange={(e) => handleObsChange(e)}
              value={obsolete}
            >
              <option value="Yes">Obsolete Yes</option>
              <option value="No">Obsolete No</option>
            </Form.Control>
          </div>
        </div>
      </div>

      <Row className="mt-4">
        <Col sm={2} md={2} className="p-0 align-items-stretch mb-4">
          <div className="border shadow" style={{ height: "11.4em" }}>
            <Row className="p-1 align-items-center">
              <Col
                xs={3}
                sm={3}
                md={3}
                className="DemandandFcfonts allFontcolor"
              >
                DEMAND
              </Col>

              <Col
                xs={9}
                sm={9}
                md={9}
                className="text-end DemandandFcfontsRight allFontcolor"
              >
                {`${moment(timeFilterDates?.demandStartDate).format(
                  "YYYY-MM"
                )} To ${moment(timeFilterDates?.demandEndDate).format(
                  "YYYY-MM"
                )}`}
              </Col>
            </Row>

            <Row className="margintop2">
              <Col sm={12} md={12} className="col-sm-12 text-center">
                <div className="addFontforcenterData">
                  {filterData?.demandPeriodTotal
                    ? convertToMillion(filterData?.demandPeriodTotal)
                    : 0}
                </div>
                <div className="addDemandvolumestyle">{t("DEMAND VOLUME")}</div>
              </Col>
            </Row>
          </div>
        </Col>

        <Col sm={4} md={4} className="align-items-stretch mb-4">
          <div className="border shadow" style={{ height: "11.4em" }}>
            <Row className="p-1 align-items-center">
              <Col
                xs={5}
                sm={5}
                md={5}
                className="DemandandFcfonts allFontcolor"
              >
                {t("FC DEMAND")}
              </Col>

              <Col
                xs={7}
                sm={7}
                md={7}
                className="text-end DemandandFcfontsRight allFontcolor"
              >
                {`${moment(timeFilterDates?.forecastStartDate).format(
                  "YYYY-MM"
                )} To ${moment(timeFilterDates?.forecastEndDate).format(
                  "YYYY-MM"
                )}`}
              </Col>
            </Row>

            <Row className="margintop2">
              <Col sm="6" xs={6} className="text-center">
                <div className="addFontforcenterData">{`${
                  filterData?.forecastEnriched
                    ? convertToMillion(filterData?.forecastEnriched)
                    : 0
                }`}</div>
                <div className="addDemandvolumestyle">
                  {t("SDF FORECAST VOLUME")}
                </div>
              </Col>

              <Col sm="6" xs={6} className="text-center">
                <div className="addFontforcenterData">{`${
                  filterData?.forecastQty
                    ? convertToMillion(filterData?.forecastQty)
                    : 0
                }`}</div>
                <div className="addDemandvolumestyle">
                  {t("SDF MODIFIED FORECAST VOLUME")}
                </div>
              </Col>
            </Row>
          </div>
        </Col>

        <Col sm={6} md={6} className="align-items-stretch">
          <YearlytotalVolumes volumes={volumes} />
        </Col>
      </Row>

      {/* <div className="row addMArgintopfordemandandForecast">
        <div className="col-md-4 align-items-stretch addPaddingstart">
          <div className="border shadow">
            <div className="row">
              <div className="col-md-3 text-left DemandandFcfonts allFontcolor">
                DEMAND
              </div>
              <div className="col-md-9 text-end DemandandFcfontsRight addpadleft allFontcolor">
                2020-05 to 2021-04
              </div>
            </div>
            <div className="row margintop2">
              <div className="col-sm-12 text-center">
                <div className="addFontforcenterData">
                  {`${filterData?.Demandvolume ?? 0}M`}
                </div>
                <div className="addDemandvolumestyle">{t("DEMAND VOLUME")}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8 align-items-stretch addPaddingend">
          <div className="border shadow">
            <div className="row">
              <div className="col-md-5 text-left DemandandFcfonts allFontcolor">
                {t('FC DEMAND')}
              </div>
              <div className="col-md-7 text-end DemandandFcfontsRight  allFontcolor">
                2021-05 TO 2021-12
              </div>
            </div>
            <div className="row margintop2">
              <div className="col-sm-6 text-center">
                <div className="addFontforcenterData">{`${filterData?.ForecastVolume
                  ? filterData?.ForecastVolume[0]["SDFForecast"]
                  : 0
                  }`}</div>
                <div className="addDemandvolumestyle">{t('SDF FORECAST VOLUME')}</div>
              </div>
              <div className="col-sm-6 text-center">
                <div className="addFontforcenterData">{`${filterData?.ForecastVolume
                  ? filterData?.ForecastVolume[0]["SDFMofifiedForecast"]
                  : 0
                  }`}</div>
                <div className="addDemandvolumestyle">
                  {t('SDF MODIFIED FORECAST VOLUME')}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div> */}
    </div>
  );
};
export default KPI;
