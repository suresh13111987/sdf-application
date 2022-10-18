import "../css/DemandVolumeforecast.css";
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { cloneDeep } from "lodash";

export const Demandvolumeforecast = ({ timeFilterData, sdfTableKys }) => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(window.sessionStorage.getItem("language"));
  }, []);
  // const chartData = timeFilterData;
  const [chartData, setChartData] = useState(timeFilterData);

  useEffect(() => {
    if (timeFilterData.length) {
      const temp = cloneDeep(timeFilterData);
      const filterData = [...temp]
        .map((item) => {
          return Object.keys(item)
            .filter((f) => f !== "name" && f !== "total")
            .reduce((acc, curr) => {
              return [
                ...acc,
                {
                  date: curr,
                  value: parseFloat(item[curr]) === 0 ? null : item[curr],
                  name: item?.name,
                },
              ];
            }, []);
        })
        .flat();
      const result = Object.keys(timeFilterData[0])
        .filter((f) => f !== "name" && f !== "total")
        .map((w) => {
          const forecast = filterData.find(
            (fc) => fc.date === w && fc.name === "SDF forecast"
          );
          const dmndVol = filterData.find(
            (fc) => fc.date === w && fc.name === "Demand volume"
          );
          const modForecast = filterData.find(
            (fc) => fc.date === w && fc.name === "SDF Modified forecast"
          );
          return {
            date: w,
            "SDF forecast": forecast.value,
            "Demand volume": dmndVol.value,
            "SDF Modified forecast": modForecast.value,
          };
        });

      setChartData(
        // filterData.reduce((arr, curr) => {
        //   const index = arr.findIndex((x) => x.date === curr.date);
        //   if (index > -1) {
        //     return arr;
        //   }
        //   return [...arr, curr];
        // }, [])
        // filterData
        result
      );
      // setOthervalues(
      //   timeFilterData &&
      //     timeFilterData[0] &&
      //     Object.keys(timeFilterData[0])
      //       .filter((k) => timeFilterData[0][k] != null)
      //       .reduce((a, k) => ({ ...a, [k]: timeFilterData[0][k] }), {})
      // );
    }
  }, [timeFilterData]);

  const formatyaxis = (value) => {
    return value + "K";
  };

  const lineColors = [
    "#256D85",
    "#F96666",
    "#182747",
    "#FFDE00",
    "#E80F88",
    "#1CD6CE",
    "#FF884B",
  ];

  return (
    <>
      {/* <div className="container-fluid"> */}
      <Row style={{ marginTop: "3em" }}>
        <Col sm={12} md={12}>
          <Stack direction="horizontal" gap={2}>
            <div className="addtopforDemandvolumeforecast addpaddingforDemandcolumeforecast">
              {t("DEMAND VOLUME AND FORECAST CHART")}
            </div>
            {/* <div className="ms-auto">
              <Button onClick={() => updatePlotData()} variant="primary"> {t("Apply Changes")}</Button>{' '}
            </div> */}
          </Stack>
        </Col>

        <Col sm={12} md={12} className="p-2 line-chart">
          <ResponsiveContainer width="100%" height={230}>
            <LineChart
              width={1130}
              id="demandVolumelinechart"
              height={350}
              data={chartData}
              margin={{
                top: 10,
                right: 20,
                left: 20,
                bottom: 10,
              }}
              style={{
                fontSize: "14px",
              }}
            >
              <Tooltip />
              <Legend />
              <XAxis dataKey="date" className="line-x-axis" />
              <YAxis tickFormatter={formatyaxis} />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              {/* {sdfTableKys.map((e, i) => (
                <Line
                  key={i}
                  type="monotone"
                  dataKey={e}
                  stroke={lineColors[i]}
                />
              ))} */}
              <Line
                type="monotone"
                dataKey={"SDF forecast"}
                stroke={lineColors[0]}
              />
              <Line
                type="monotone"
                dataKey={"Demand volume"}
                stroke={lineColors[1]}
              />
              <Line
                type="monotone"
                dataKey={"SDF Modified forecast"}
                stroke={lineColors[5]}
              />
            </LineChart>
          </ResponsiveContainer>
        </Col>
      </Row>
      {/* </div> */}

      {/* <div className="row addtopforDemandvolumeforecast addpaddingforDemandcolumeforecast">
        <div className="col-sm-12 addSpacebetweendemandandchart ">
          {t("DEMAND VOLUME AND FORECAST CHART")}
        </div>
        <div className="col-sm-12 text-end" style={{ paddingBottom: "12px" }}>
          <button onClick={() => updatePlotData()} className="btn buttonClr">
            {t("Apply Changes")}
          </button>
        </div>
        <div className="col-sm-12 border addchartPadtop shadow">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              width={1130}
              id="demandVolumelinechart"
              height={300}
              data={chartData}
            >
              <Tooltip />
              <XAxis dataKey="total" />
              <YAxis tickFormatter={formatyaxis} />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              {otherValues &&
                Object.keys(otherValues).map((e, i) => (
                  <Line key={i} type="monotone" dataKey={e} stroke="#92C12F" />
                ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div> */}
    </>
  );
};
export default Demandvolumeforecast;
