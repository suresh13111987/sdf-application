import React, { useState } from "react";
import moment from "moment";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import "../css/TimeFiltercss.css";
import { getDateRange } from "../Utils";

// import { actionSelectRange } from "../../redux/Actions/PlotData";
import { actionSelectRange } from "../redux/Actions/PlotData";
import { actionTimeFilterChange } from "../redux/Actions/QuickFilterData";

export const TimeFilters = (props) => {
  const { t, i18n } = useTranslation();
  const { totalSum, quickFilterData } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    i18n.changeLanguage(window.sessionStorage.getItem("language"));
  }, []);

  const { timeFilterDates } = quickFilterData;

  const demandOnChange = (dates) => {
    const [start, end] = dates;
    dispatch(actionTimeFilterChange("demandStartDate", start));
    dispatch(actionTimeFilterChange("demandEndDate", end));
    console.log({ timeFilterDates });
    if (end) {
      dispatch(actionSelectRange("demand_period", getDateRange(start, end)));
    }
  };

  const forecasatOnChange = (dates) => {
    const [start, end] = dates;
    dispatch(actionTimeFilterChange("forecastStartDate", start));
    dispatch(actionTimeFilterChange("forecastEndDate", end));
    if (end) {
      dispatch(actionSelectRange("forecast_period", getDateRange(start, end)));
    }
  };

  return (
    <>
      <div className="container-fluid">
        <Row className="border shadow quickFilter">
          <Col sm={12} md={12}>
            <Row className="align-items-center">
              <Col
                sm={2}
                md={2}
                className="quickFilterfontcolor addquickFilterFontsize"
              >
                {t("TIME FILTERS")}
              </Col>

              <Col sm={4} md={4}>
                <Stack
                  direction="horizontal"
                  className="align-items-center justify-content-center"
                  gap={2}
                >
                  <div className={"daterange-label"}>
                    {t("FILTER BY DEMAND PERIOD")}
                  </div>
                  <div>
                    <DatePicker
                      // minDate={new Date(demandStartDate)}
                      // maxDate={new Date(demandEndDate)}
                      maxDate={new Date(timeFilterDates.demandFilterEndDate)}
                      selected={timeFilterDates.demandStartDate}
                      onChange={demandOnChange}
                      startDate={timeFilterDates.demandStartDate}
                      endDate={timeFilterDates.demandEndDate}
                      selectsRange
                      inline={false}
                      isClearable
                      dateFormat="MMM yyyy"
                      showMonthYearPicker
                      shouldCloseOnSelect
                    />
                  </div>
                </Stack>
              </Col>
              <Col sm={4} md={4}>
                <Stack
                  direction="horizontal"
                  className="align-items-center justify-content-center"
                  gap={2}
                >
                  <div className={"daterange-label"}>
                    {t("FILTER BY FORECAST PERIOD")}
                  </div>
                  <div>
                    <DatePicker
                      minDate={
                        new Date(timeFilterDates.forecastFilterStartDate)
                      }
                      // minDate={moment().toDate()}
                      selected={timeFilterDates.forecastStartDate}
                      onChange={forecasatOnChange}
                      startDate={timeFilterDates.forecastStartDate}
                      endDate={timeFilterDates.forecastEndDate}
                      selectsRange
                      inline={false}
                      isClearable
                      dateFormat="MMM yyyy"
                      showMonthYearPicker
                    />
                  </div>
                </Stack>
              </Col>
              <Col sm={2} md={2}>
                <Stack
                  direction="horizontal"
                  className="align-items-center justify-content-center"
                  gap={2}
                >
                  <div className={"daterange-label"}>{t("Total Sum")}</div>
                  <div style={{ fontWeight: 600 }}>{totalSum}</div>
                </Stack>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default TimeFilters;
