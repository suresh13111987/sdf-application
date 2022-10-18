import "../../css/Forecastaccuratecssfolder/foreCastaccurate.css";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import {
  LineChart,
  ResponsiveContainer,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Cell,
  Legend,
  Tooltip,
} from "recharts";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllfilterdetails,
  ForecastAccuracy,
  productTypeforecastgraph,
  demandVolumeforecastgraph,
  demandDeviationforecastgraph,
  chooseGraphrelativeFunc,
  showSdfvalueset,
  showSdfmodifiedset,
  setDeviationgraphchange,
  setselectedProduct,
  setselectedDepdency,
  setproductDepenedency,
  setproductCategory,
  setsnapShotselectedvalue,
  setsnapShottoanalyze,
  setlagsSelectedvalue,
  setlagsFormeasurement,
  setselectedDfuvalue,
  setDFUdropdown,
} from "../../redux/Actions/Forecast";
import { toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";

export const ForCastmaincomponent = () => {
  const dispatch = useDispatch();
  const {
    categoryDropdown,
    accuracyForecastyearsgraph,
    productDependentgraph,
    demandGraphbind,
    deviationGraphbind,
    chooseGraphrelative,
    showSdf,
    showSdfmodified,
    deviationGraphbindvalue,
    selectedProduct,
    selectedDepdency,
    productDepenedency,
    productCategory,
    snapShotselectedvalue,
    snapShottoanalyze,
    lagsSelectedvalue,
    lagsFormeasurement,
    selectedDfuvalue,
    DFUdropdown,
  } = useSelector((state) => ({
    categoryDropdown: state.forecastAccurateReducer,
    accuracyForecastyearsgraph:
      state.forecastAccurateReducer.forecastDataresponse.data,
    productDependentgraph: state.forecastAccurateReducer.productGraph.data,
    demandGraphbind: state.forecastAccurateReducer.demandGraph.data,
    deviationGraphbind: state.forecastAccurateReducer.deviationGraph.data,
    chooseGraphrelative: state.forecastAccurateReducer.chooseGraphrelative,
    showSdf: state.forecastAccurateReducer.showSdf,
    showSdfmodified: state.forecastAccurateReducer.showSdfmodified,
    deviationGraphbindvalue:
      state.forecastAccurateReducer.deviationGraphbindvalue,
    selectedProduct: state.forecastAccurateReducer.selectedProduct,
    selectedDepdency: state.forecastAccurateReducer.selectedDepdency,
    productDepenedency: state.forecastAccurateReducer.productDepenedency,
    productCategory: state.forecastAccurateReducer.productCategory,
    snapShotselectedvalue: state.forecastAccurateReducer.snapShotselectedvalue,
    snapShottoanalyze: state.forecastAccurateReducer.snapShottoanalyze,
    lagsSelectedvalue: state.forecastAccurateReducer.lagsSelectedvalue,
    lagsFormeasurement: state.forecastAccurateReducer.lagsFormeasurement,
    selectedDfuvalue: state.forecastAccurateReducer.selectedDfuvalue,
    DFUdropdown: state.forecastAccurateReducer.DFUdropdown,
  }));
  const { t, i18n } = useTranslation();
  useEffect(() => {
    try {
      i18n.changeLanguage(window.sessionStorage.getItem("language"));
      dispatch(getAllfilterdetails());
    } catch (e) {
      console.log(e);
    }
  }, []);
  const lagsValuemanipulation = (lagValue) => {
    var valueArr = [];
    lagValue.map((val) => {
      valueArr.push(val.value);
    });
    return valueArr;
  };
  const selectedcategryValuechange = (categoryVal) => {
    var cateGoval = [];
    categoryVal.map((val) => {
      cateGoval.push(val.value);
    });
    return cateGoval;
  };
  /*This code is used for handling the error  */
  const getFiltererroHandler = () => {
    //This function is used to add the toaster for the get filters api.
    let categoryVaraible = categoryDropdown.CategoryResponse;
    if (
      categoryVaraible !== undefined &&
      categoryVaraible.data !== undefined &&
      categoryVaraible.data.status !== undefined &&
      categoryVaraible.data.status === false
    ) {
      toast.error(categoryVaraible.data.message);
    }
  };
  useEffect(() => {
    if (
      categoryDropdown.Categorydataapistatus === 2 &&
      accuracyForecastyearsgraph.status !== undefined &&
      accuracyForecastyearsgraph.status === false
    ) {
      toast.error(accuracyForecastyearsgraph.message);
    }
  }, [accuracyForecastyearsgraph]);
  useEffect(() => {
    if (
      categoryDropdown.Categorydataapistatus === 2 &&
      deviationGraphbind.status !== undefined &&
      deviationGraphbind.status === false
    ) {
      toast.error(deviationGraphbind.message);
    }
  }, [deviationGraphbind]);
  useEffect(() => {
    if (
      categoryDropdown.Categorydataapistatus === 2 &&
      demandGraphbind.status !== undefined &&
      demandGraphbind.status === false
    ) {
      toast.error(demandGraphbind.message);
    }
  }, [
    demandGraphbind,
  ]); /*This useEffect for showing the toaster for the demand volume graph */
  useEffect(() => {
    if (
      categoryDropdown.Categorydataapistatus === 2 &&
      productDependentgraph.status !== undefined &&
      productDependentgraph.status === false
    ) {
      toast.error(productDependentgraph.message);
    }
  }, [productDependentgraph]); //This useEffect for showing the toaster for the category and product graph.
  /*This code is used for handling the error Ends here  */
  useEffect(() => {
    try {
      dispatch(
        ForecastAccuracy({
          filters: {
            aggregationLevel:
              selectedDfuvalue !== null && selectedDfuvalue.text !== undefined
                ? selectedDfuvalue.text
                : "DFU",
            LagsofMeasurement:
              lagsSelectedvalue !== null
                ? lagsValuemanipulation(lagsSelectedvalue)
                : [],
            snapshottoAnalyse:
              snapShotselectedvalue !== null &&
              snapShotselectedvalue.snapshotvalue !== undefined
                ? snapShotselectedvalue.snapshotvalue
                : "",
          },
        })
      );
      dispatch(
        demandVolumeforecastgraph({
          filters: {
            aggregationLevel:
              selectedDfuvalue !== null && selectedDfuvalue.text !== undefined
                ? selectedDfuvalue.text
                : "DFU",
            LagsofMeasurement:
              lagsSelectedvalue !== null
                ? lagsValuemanipulation(lagsSelectedvalue)
                : [],
            snapshottoAnalyse:
              snapShotselectedvalue !== null &&
              snapShotselectedvalue.snapshotvalue !== undefined
                ? snapShotselectedvalue.snapshotvalue
                : "",
          },
        })
      );
      dispatch(
        demandDeviationforecastgraph({
          filters: {
            aggregationLevel:
              selectedDfuvalue !== null && selectedDfuvalue.text !== undefined
                ? selectedDfuvalue.text
                : "DFU",
            LagsofMeasurement:
              lagsSelectedvalue !== null
                ? lagsValuemanipulation(lagsSelectedvalue)
                : [],
            snapshottoAnalyse:
              snapShotselectedvalue !== null &&
              snapShotselectedvalue.snapshotvalue !== undefined
                ? snapShotselectedvalue.snapshotvalue
                : "",
          },
        })
      );
    } catch (e) {
      console.log(e);
    }
  }, [selectedDfuvalue, lagsSelectedvalue, snapShotselectedvalue]);
  useEffect(() => {
    try {
      dispatch(
        productTypeforecastgraph({
          filters: {
            aggregationLevel:
              selectedDfuvalue !== null && selectedDfuvalue.text !== undefined
                ? selectedDfuvalue.text
                : "DFU",
            LagsofMeasurement:
              lagsSelectedvalue !== null
                ? lagsValuemanipulation(lagsSelectedvalue)
                : [],
            snapshottoAnalyse:
              snapShotselectedvalue !== null &&
              snapShotselectedvalue.snapshotvalue !== undefined
                ? snapShotselectedvalue.snapshotvalue
                : "",
            category:
              selectedDepdency !== null && selectedDepdency.length > 0
                ? selectedcategryValuechange(selectedDepdency)
                : [],
          },
        })
      );
    } catch (e) {
      console.log(e);
    }
  }, [
    selectedDfuvalue,
    lagsSelectedvalue,
    snapShotselectedvalue,
    selectedProduct,
    selectedDepdency,
  ]);
  const DfuFilterinitialLoad = (arrayData) => {
    try {
      let dfuValdropdown = [];
      dispatch(
        setselectedDfuvalue({
          value: 0,
          text: arrayData.aggregationLevel.filter(
            (x) => String(x).toLowerCase() === "dfu"
          )[0],
        })
      );
      arrayData.aggregationLevel.map((value, index) => {
        let objectVariable = {
          value: index,
          text: value,
        };
        dfuValdropdown.push(objectVariable);
      });
      dispatch(setDFUdropdown(dfuValdropdown));
    } catch (e) {
      console.log(e);
    }
  };
  const LagsDropdowninitialLoad = (arrayData) => {
    try {
      let LagsValuedropdown = [];
      arrayData.lags.map((val) => {
        if (val !== null) {
          let objectVariable = {
            value: val,
          };
          LagsValuedropdown.push(objectVariable);
        }
      });
      dispatch(
        setlagsSelectedvalue([
          {
            value: LagsValuedropdown.sort((a, b) => a.value - b.value)[0].value,
          },
        ])
      );
      dispatch(setlagsFormeasurement(LagsValuedropdown));
    } catch (e) {
      console.log(e);
    }
  };
  const SnapshottoAnalyseinitailLoad = (arrayData) => {
    try {
      let snapShotValue = [];
      arrayData.snapShot.map((value) => {
        let objectVariable = {
          snapshotvalue: value,
        };
        snapShotValue.push(objectVariable);
      });
      let sortedSnapshot = snapShotValue.sort(function (a, b) {
        a = new Date(a.snapshotvalue);
        b = new Date(b.snapshotvalue);
        return a - b;
      });
      dispatch(
        setsnapShotselectedvalue(sortedSnapshot[sortedSnapshot.length - 1])
      );
      dispatch(setsnapShottoanalyze(snapShotValue));
    } catch (e) {
      console.log(e);
    }
  };
  const categoryDepedencyInitialloadfilters = (arrayData) => {
    try {
      let productCategory = [];
      let cartegoryTypeautoselect = [];
      var defaultSelectedarray = [];
      for (let key in arrayData.category) {
        let objetVariable = {
          productValue: key,
          depedencyValue: arrayData.category[key],
        };
        productCategory.push(objetVariable);
        if (key === "plant") {
          defaultSelectedarray.push(objetVariable);
        }
      }
      if (
        defaultSelectedarray &&
        defaultSelectedarray.length > 0 &&
        defaultSelectedarray[0].depedencyValue !== undefined &&
        defaultSelectedarray[0].depedencyValue != null
      ) {
        defaultSelectedarray[0].depedencyValue.map((val, index) => {
          var arr = {
            value: val,
          };
          cartegoryTypeautoselect.push(arr);
        });
      }
      dispatch(setselectedDepdency(cartegoryTypeautoselect));
      dispatch(setselectedProduct(defaultSelectedarray));
      dispatch(setproductDepenedency(cartegoryTypeautoselect));
      dispatch(setproductCategory(productCategory));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    try {
      if (
        categoryDropdown !== undefined &&
        categoryDropdown.CategoryResponse !== undefined &&
        categoryDropdown.CategoryResponse.data !== undefined &&
        categoryDropdown.CategoryResponse.data.aggregationLevel !== undefined &&
        categoryDropdown.CategoryResponse.data.lags !== undefined &&
        categoryDropdown.CategoryResponse.data.snapShot != undefined &&
        categoryDropdown.CategoryResponse.data.category != undefined
      ) {
        let arrayData = categoryDropdown.CategoryResponse.data;
        DfuFilterinitialLoad(arrayData);
        LagsDropdowninitialLoad(arrayData);
        SnapshottoAnalyseinitailLoad(arrayData);
        categoryDepedencyInitialloadfilters(arrayData);
      }
      getFiltererroHandler();
    } catch (e) {
      console.log(e);
    }
  }, [categoryDropdown.CategoryResponse]);

  const ProductDepedencyDropdown = (e) => {
    try {
      if (e !== undefined && e !== null) {
        var arrayValue = [];
        e.depedencyValue.map((val) => {
          var arr = {
            value: val,
          };
          arrayValue.push(arr);
          dispatch(setproductDepenedency(arrayValue));
          dispatch(setselectedDepdency(arrayValue));
        });
      } else {
        dispatch(setproductDepenedency([]));
        dispatch(setselectedDepdency([]));
      }

      dispatch(setselectedProduct(e));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      if (
        accuracyForecastyearsgraph !== undefined &&
        accuracyForecastyearsgraph.lag0value !== null
      ) {
        dispatch(showSdfvalueset(accuracyForecastyearsgraph.lag0value.fca_sdf));
        dispatch(
          showSdfmodifiedset(accuracyForecastyearsgraph.lag0value.bias_enriched)
        );
      }
    } catch (e) {
      console.log(e);
    }
  }, [accuracyForecastyearsgraph]);

  const formatyaxis = (value) => {
    return chooseGraphrelative ? value + "K" : value + "%";
  };
  const formatyaxis1 = (value) => {
    return value + "K";
  };
  const renderCustomBarlabel = ({ payload, x, y, width, height, value }) => {
    return (
      <text
        className="bar-label"
        x={x + width / 2}
        y={y}
        fill="#666"
        textAnchor="middle"
        dy={-6}
      >
        {Number.parseFloat(value).toFixed(2) + "%"}
      </text>
    );
  };
  const ForecastedYearstooltip = ({ active, payload, label }) => {
    if (active && payload !== null && payload.length !== 0) {
      return (
        <div className="barchart-tooltip">
          <div>
            <span className="tooltip-label">Sdf Accuracy : </span>
            <span className="tooltip-value">{payload[0].payload.fca_sdf}</span>
          </div>
          <div>
            <span className="tooltip-label">Sdf Modified Accuracy : </span>
            <span className="tooltip-value">
              {payload[0].payload.bias_enriched}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload !== null && payload.length !== 0) {
      return (
        <div>
          <div>Demand:{payload[0].payload.demand_volume}</div>
          <div>Deviation:{payload[0].payload.deviation}</div>
          <div>Forecast:{payload[0].payload.forecast_qty}</div>
          <div>
            {payload[0].payload.category_type}:
            {payload[0].payload.category_value}
          </div>
        </div>
      );
    }

    return null;
  };
  const CustomtooltipForProducttype = ({ active, payload }) => {
    if (active && payload !== null && payload.length !== 0) {
      return (
        <div className="barchart-tooltip">
          <div>
            <span className="tooltip-label">SDF Accuracy: </span>
            <span className="tooltip-value">{payload[0].payload.fca_sdf}</span>
          </div>
          <div>
            <span className="tooltip-label">SDF Enriched Accuracy: </span>
            <span className="tooltip-value">
              {payload[0].payload.fca_enriched}
            </span>
          </div>
        </div>
      );
    }
  };
  const CustomtooltipFordemandgraph = ({ active, payload }) => {
    if (active && payload !== null && payload.length !== 0) {
      return (
        <div className="barchart-tooltip">
          <div>
            <span className="tooltip-label">Demand Volume: </span>
            <span className="tooltip-value">
              {payload[0].payload.demand_volume}
            </span>
          </div>
          <div>
            <span className="tooltip-label">SDF Accuracy: </span>
            <span className="tooltip-value">
              {payload[0].payload.forecast_qty}
            </span>
          </div>

          <div>
            <span className="tooltip-label">SDF Enriched Accuracy: </span>
            <span className="tooltip-value">
              {payload[0].payload.forecast_enriched}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };
  const colorStyles = {
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "rgba(17, 125, 175, 1)",
      };
    },
  };
  const changeChartvalue = (parameter) => {
    let sortedArray = parameter
      .filter((x) => x !== null)
      .sort(function (a, b) {
        a = new Date(a.demand_period);
        b = new Date(b.demand_period);
        return a - b;
      });
    return sortedArray;
  };
  useEffect(() => {
    AdddeviationGraphdata();
  }, [chooseGraphrelative, deviationGraphbind]);
  const AdddeviationGraphdata = () => {
    try {
      if (deviationGraphbind !== undefined) {
        if (chooseGraphrelative) {
          dispatch(setDeviationgraphchange(deviationGraphbind.absolute));
        } else {
          dispatch(setDeviationgraphchange(deviationGraphbind.relative));
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  const renderLegend = (payload) => {
    return (
      <Row>
        <Col sm={6} md={6} className="text-center">
          <span
            className="border pe-2 ps-2 me-1"
            style={{ backgroundColor: "rgba(146, 193, 47, 1)" }}
          ></span>
          SDF-FORECAST&gt;DEMAND
        </Col>
        <Col sm={6} md={6} className="text-center">
          <span
            className="border pe-2 ps-2 me-1"
            style={{ backgroundColor: "rgba(4, 187, 241, 1)" }}
          ></span>
          DEMAND&gt;SDF-FORECAST
        </Col>
      </Row>
    );
  };
  return (
    <>
      <div className="container-fluid">
        <Row className="p-2 mb-4">
          <Col sm={3} md={3} className="left-panel mb-2">
            <Row className="p-2">
              <Col sm={12} md={12} className="mt-2 mb-2">
                <span className="filter-label">{t("AGGREGATION LEVEL")}</span>
                <Select
                  options={DFUdropdown}
                  placeholder={t("Select Aggregation Level")}
                  classNamePrefix="aggregate"
                  isClearable={true}
                  styles={colorStyles}
                  // className="dropAlinment"
                  value={selectedDfuvalue}
                  onChange={(e) => {
                    dispatch(setselectedDfuvalue(e));
                  }}
                  getOptionLabel={(e) => (
                    <div className="w-100 addOptioncolor">{e.text}</div>
                  )}
                ></Select>
              </Col>
              <Col sm={12} md={12} className="mt-2 mb-2">
                <span className="filter-label">
                  {t("LAGS FOR MEASUREMENT")}
                </span>
                <Select
                  options={lagsFormeasurement}
                  placeholder={t("Lags for Measurement")}
                  classNamePrefix="lags"
                  isClearable={true}
                  isMulti
                  styles={colorStyles}
                  value={lagsSelectedvalue}
                  onChange={(e) => {
                    dispatch(setlagsSelectedvalue(e));
                  }}
                  getOptionLabel={(e) => (
                    <div className="w-100 addOptioncolor">{e.value}</div>
                  )}
                ></Select>
              </Col>
              <Col sm={12} md={12} className="mt-2 mb-2">
                <span className="filter-label">{t("SNAPSHOT TO ANALYZE")}</span>
                <Select
                  options={snapShottoanalyze}
                  placeholder={t("Select") + "..."}
                  isClearable={true}
                  styles={colorStyles}
                  classNamePrefix="snap"
                  value={snapShotselectedvalue}
                  onChange={(e) => {
                    dispatch(setsnapShotselectedvalue(e));
                  }}
                  getOptionLabel={(e) => (
                    <div className="w-100 addOptioncolor">
                      {e.snapshotvalue}
                    </div>
                  )}
                ></Select>
              </Col>

              <Col sm={12} md={12} className="mt-2 mb-2">
                <span className="filter-label">{t("CATEGORY")}</span>
                <Select
                  options={productCategory}
                  placeholder={t("Select") + "..."}
                  classNamePrefix="category"
                  isClearable={true}
                  styles={colorStyles}
                  value={selectedProduct}
                  onChange={(e) => {
                    ProductDepedencyDropdown(e);
                  }}
                  getOptionLabel={(e) => (
                    <div className="w-100 addOptioncolor">{e.productValue}</div>
                  )}
                ></Select>
              </Col>

              <Col sm={12} md={12} className="mt-2 mb-2">
                <span className="filter-label">
                  {t("CURRENTLY SELECTED CATEGORY")}
                </span>
                <Select
                  options={productDepenedency}
                  placeholder={t("Select") + "..."}
                  classNamePrefix="current"
                  isClearable={true}
                  styles={colorStyles}
                  isMulti
                  value={selectedDepdency}
                  onChange={(e) => {
                    dispatch(setselectedDepdency(e));
                  }}
                  getOptionLabel={(e) =>
                    e !== undefined && e.value !== undefined ? (
                      <div className="w-100 addOptioncolor">{e.value}</div>
                    ) : null
                  }
                ></Select>
              </Col>
            </Row>
          </Col>
          <Col sm={9} md={9} className="mb-2">
            <Row>
              <Col sm={12} md={12}>
                <span className="card-heading">{t("REPORT CHARTS")}</span>
              </Col>
              <Col sm={12} md={12}>
                <div className="border shadow">
                  <Row className="p-4">
                    <Col sm={6} md={6} className="text-center">
                      <div className="addManualmarginstart">
                        {showSdf + "%"}
                      </div>
                      <div className="value-label">
                        {t("SDF FORECAST ACCURACY")}
                      </div>
                    </Col>
                    <Col sm={6} md={6} className="text-center">
                      <div className="addmarginStartValue">
                        {showSdfmodified + "%"}
                      </div>
                      <div className="value-label">
                        {t("SDF MODIFIED ACCURACY")}
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col sm={6} md={6}>
                <Row>
                  <Col sm={12} md={12}>
                    <span className="card-heading">
                      {t("ACCURACY FOR FORCASTED YEARS")}
                    </span>
                  </Col>

                  <Col sm={12} md={12}>
                    <div className="border shadow">
                      <ResponsiveContainer width="100%" height={345}>
                        <BarChart
                          width={600}
                          height={600}
                          margin={{
                            top: 20,
                            right: 10,
                            left: 5,
                            bottom: 5,
                          }}
                          style={{ fontSize: "12px" }}
                          data={
                            accuracyForecastyearsgraph !== undefined &&
                            accuracyForecastyearsgraph.result !== undefined &&
                            accuracyForecastyearsgraph.result.length > 0
                              ? changeChartvalue(
                                  accuracyForecastyearsgraph.result
                                )
                              : []
                          }
                        >
                          <Legend />
                          <Bar
                            name="SDF Accuracy"
                            dataKey="fca_sdf"
                            fill="rgba(146, 193, 47, 1)"
                            label={renderCustomBarlabel}
                          />
                          <Bar
                            name="SDF Enriched Accuracy"
                            dataKey="bias_enriched"
                            fill="rgba(4, 187, 241, 1)"
                            label={renderCustomBarlabel}
                          />
                          <Tooltip
                            cursor={false}
                            content={<ForecastedYearstooltip />}
                          />
                          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                          <XAxis
                            className="chart-x-axis"
                            dataKey="demand_period"
                            padding={{ left: 10, right: 10 }}
                          />
                          <YAxis className="chart-x-axis" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col sm={6} md={6}>
                <Col sm={12} md={12}>
                  <span className="card-heading">
                    {t("DEMAND VOLUME AND FORECAST CHART")}
                  </span>
                </Col>
                <Col sm={12} md={12}>
                  <div className="border shadow">
                    <Row className="justify-content-center">
                      <Col sm={6} md={6}>
                        <div>
                          <div className="allFontcolor chooseGraph">
                            {t("Choose A Graph")}
                          </div>
                        </div>
                        <Row>
                          <Col sm={6} md={6}>
                            <Stack
                              className="justify-content-center align-items-center"
                              direction="horizontal"
                              gap={2}
                            >
                              <div>
                                <input
                                  type="radio"
                                  className="form-check-input radioButton1"
                                  checked={chooseGraphrelative}
                                  onClick={() => {
                                    dispatch(chooseGraphrelativeFunc(true));
                                  }}
                                />
                              </div>
                              <div>
                                <label className="ms-1 productType">
                                  {t("Absolute")}
                                </label>
                              </div>
                            </Stack>
                          </Col>

                          <Col sm={6} md={6}>
                            <Stack
                              className="justify-content-center align-items-center"
                              direction="horizontal"
                              gap={2}
                            >
                              <div>
                                <input
                                  type="radio"
                                  className="form-check-input radioButton2"
                                  checked={!chooseGraphrelative}
                                  onClick={(e) => {
                                    dispatch(chooseGraphrelativeFunc(false));
                                  }}
                                />
                              </div>
                              <div>
                                <label className="ms-1 allFontcolor">
                                  {t("Relative")}
                                </label>
                              </div>
                            </Stack>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <ResponsiveContainer width="90%" height={300}>
                      <BarChart
                        width={600}
                        height={600}
                        margin={{
                          top: 20,
                          right: 10,
                          left: 5,
                          bottom: 5,
                        }}
                        style={{ fontSize: "12px" }}
                        data={deviationGraphbindvalue!==undefined?deviationGraphbindvalue:[]}
                      >
                        <Bar dataKey="deviation" fill="rgba(146, 193, 47, 1)">
                          {deviationGraphbindvalue!==undefined?deviationGraphbindvalue.map((entry) => (
                            <Cell
                              fill={
                                Number(entry.demand_volume) >
                                Number(entry.forecast_qty)
                                  ? "rgba(4, 187, 241, 1)"
                                  : "rgba(146, 193, 47, 1)"
                              }
                            />
                          )):null}
                        </Bar>
                        <Legend content={renderLegend} />
                        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                        <Tooltip cursor={false} content={<CustomTooltip />} />
                        <XAxis
                          className="chart-x-axis"
                          dataKey="category_value"
                          display="none"
                        />
                        <YAxis
                          className="chart-x-axis"
                          tickFormatter={formatyaxis}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Col>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col sm={12} md={12}>
                <span className="card-heading">
                  {t("ACCURACY PER SELECTED CATEGORY")}:{" "}
                  <span className="productType">{t("PRODUCT TYPE")}</span>
                </span>
              </Col>

              <Col sm={12} md={12}>
                <div className="border shadow">
                  <ResponsiveContainer width="100%" height={345}>
                    <BarChart
                      width={600}
                      height={600}
                      margin={{
                        top: 20,
                        right: 10,
                        left: 5,
                        bottom: 5,
                      }}
                      style={{ fontSize: "12px" }}
                      data={productDependentgraph}
                    >
                      <Legend />
                      <Bar
                        name="SDF Accuracy"
                        dataKey="bias_lfh"
                        fill="rgba(146, 193, 47, 1)"
                        label={renderCustomBarlabel}
                      ></Bar>
                      <Bar
                        name="SDF Enriched Accuracy"
                        dataKey="fca_sdf"
                        fill="rgba(4, 187, 241, 1)"
                        label={renderCustomBarlabel}
                      ></Bar>
                      <Tooltip
                        cursor={false}
                        content={CustomtooltipForProducttype}
                      />
                      <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                      <XAxis
                        className="chart-x-axis"
                        type="category"
                        id="important"
                        dataKey="category_value"
                        padding={{ left: 10, right: 10 }}
                      />
                      <YAxis className="chart-x-axis" type="number" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col sm={12} md={12}>
                <span className="card-heading">
                  {t("DEMAND AND FORECAST VOLUMES PER MONTH")}
                </span>
              </Col>

              <Col sm={12} md={12}>
                <div className="border shadow">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      width={1200}
                      id="lineChartcomponent"
                      height={300}
                      margin={{
                        top: 20,
                        right: 10,
                        left: 5,
                        bottom: 5,
                      }}
                      style={{ fontSize: "12px" }}
                      data={
                        demandGraphbind !== undefined &&
                        demandGraphbind.length > 0
                          ? changeChartvalue(demandGraphbind)
                          : []
                      }
                    >
                      <Legend />
                      <XAxis className="chart-x-axis" dataKey="demand_period" />
                      <YAxis
                        className="chart-x-axis"
                        tickFormatter={formatyaxis1}
                      />
                      <Tooltip content={<CustomtooltipFordemandgraph />} />
                      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                      <Line
                        name="Demand Volume"
                        type="monotone"
                        dataKey="demand_volume"
                        stroke="#92C12F"
                      />
                      <Line
                        name="SDF Accuracy"
                        type="monotone"
                        dataKey="forecast_qty"
                        stroke="#04BBF1"
                      />
                      <Line
                        name="SDF Enriched Accuracy"
                        type="monotone"
                        dataKey="forecast_enriched"
                        stroke="#FF0000"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      {/* < div className="container-fluid" >
                <div className="row addMtopForecast">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8 addReportfontSize">
                        {t('REPORT CHARTS')}
                    </div>
                </div>
                <div className='row addMarginTopforagrregration'>
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-md-4 text-align">
                                <div className='border addPaddingstartforaggregationbox'>
                                    <div className="row addFontsizeofaggregation">
                                        {t('AGGREGATION LEVEL')}
                                    </div>
                                    <div className="row w-100">
                                        <Select options={DFUdropdown}
                                            placeholder={t("Select Aggregation Level")}
                                            classNamePrefix="aggregate"
                                            isClearable={true}
                                            styles={colorStyles}
                                            className="dropAlinment"
                                            value={selectedDfuvalue}
                                            onChange={(e) => {
                                                setselectedDfuvalue(e)
                                            }}
                                            getOptionLabel={e => (
                                                <div className="w-100 addOptioncolor">
                                                    {e.text}
                                                </div>
                                            )}
                                        ></Select>
                                    </div>
                                    <div className="row addFontsizeofaggregation">
                                        {t('LAGS FOR MEASUREMENT')}
                                    </div>
                                    <div className="row w-100">
                                        <Select options={lagsFormeasurement}
                                            placeholder={t('Lags for Measurement')}
                                            classNamePrefix="lags"
                                            isClearable={true}
                                            isMulti
                                            className="dropAlinment"
                                            styles={colorStyles}
                                            value={lagsSelectedvalue}
                                            onChange={(e) => {
                                                dispatch(setlagsSelectedvalue(e))
                                            }}
                                            getOptionLabel={e => (
                                                <div className="w-100 addOptioncolor">
                                                    {e.value}
                                                </div>

                                            )}
                                        ></Select>

                                    </div>
                                    <div className="row  addFontsizeofaggregation">{t('SNAPSHOT TO ANALYZE')}</div>
                                    <div className="row w-100">
                                        <Select options={snapShottoanalyze}
                                            placeholder={t('Select') + '...'}
                                            isClearable={true}
                                            styles={colorStyles}
                                            classNamePrefix="snap"
                                            className="dropAlinment"
                                            value={snapShotselectedvalue}
                                            onChange={(e) => {
                                                dispatch(setsnapShotselectedvalue(e))
                                            }
                                            }
                                            getOptionLabel={e => (
                                                <div className="w-100 addOptioncolor">
                                                    {e.snapshotvalue}
                                                </div>
                                            )}
                                        ></Select>
                                    </div>
                                    <div className="row addFontsizeofaggregation">{t('CATEGORY')}</div>
                                    <div className="row w-100">
                                        <Select options={productCategory}
                                            placeholder={t('Select') + '...'}
                                            classNamePrefix="category"
                                            isClearable={true}
                                            styles={colorStyles}
                                            className="dropAlinment"
                                            value={selectedProduct}
                                            onChange={(e) => { ProductDepedencyDropdown(e) }}
                                            getOptionLabel={e => (
                                                <div className="w-100 addOptioncolor">
                                                    {e.productValue}
                                                </div>
                                            )}
                                        ></Select>
                                    </div>
                                    <div className="row addFontsizeofaggregation">{t('CURRENTLY SELECTED CATEGORY')}</div>
                                    <div className="row w-100">
                                        <Select options={productDepenedency}
                                            placeholder={t('Select') + '...'}
                                            classNamePrefix="current"
                                            isClearable={true}
                                            styles={colorStyles}
                                            isMulti
                                            value={selectedDepdency}
                                            className="dropAlinment"
                                            onChange={(e) => {
                                                dispatch(setselectedDepdency(e));
                                            }}
                                            getOptionLabel={e => (
                                                e !== undefined && e.value !== undefined ?
                                                    <div className="w-100 addOptioncolor">
                                                        {e.value}
                                                    </div> : null
                                            )}
                                        ></Select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className='row border me-2 pt-5 pb-5 shadow mobileView3'>
                                    <div className="col-md-6 text-center">
                                        <div className='addManualmarginstart'>{showSdf + '%'}</div>
                                        <div className='fontsize w-100 addingMarginstartforData '>{t('SDF FORECAST ACCURACY')}</div>
                                    </div>
                                    <div className="col-md-6 text-center">
                                        <div className='addmarginStartValue'>{showSdfmodified + '%'}</div>
                                        <div className='fontsize w-100'>{t('SDF MODIFIED ACCURACY')}</div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='addAccuracydata '>
                                        {t('ACCURACY FOR FORCASTED YEARS')}
                                    </div>
                                </div>
                                <div className='row  border shadow me-3'>
                                    <div className='col-md-6 addMargintopForgraphmentioner '><div className='border mt-2 pt-2 pe-3 text-md-end borderWidth float-start addManualmarginstart sdfForecastcolor'></div><span className='ms-2 addsdg1font'>{t('SDF Accuracy')}</span></div>
                                    <div className='col-md-6 addMargintopForgraphmentioner '><div className='border mt-2 pt-2 pe-3 borderWidth float-start addManualStart sdfEnrichedaccuracy'></div><span className='ms-2 addsdg1font '>{t('SDF Enriched Accuracy')}</span></div>
                                    <div className='row'>
                                        <div className='col-sm-12 addPaddingleft addMargintopfortheBargraph'>

                                            <ResponsiveContainer width="90%" height={400}>
                                                <BarChart width={600} id="baronechart" height={600} data={accuracyForecastyearsgraph !== undefined ? accuracyForecastyearsgraph.result : []}>
                                                    <Bar dataKey="fca_sdf" fill="rgba(146, 193, 47, 1)
" label={renderCustomBarlabel} />
                                                    <Bar dataKey="bias_enriched" fill="rgba(4, 187, 241, 1)
" label={renderCustomBarlabel} />
                                                    <Tooltip content={<ForecastedYearstooltip />} />
                                                    <CartesianGrid stroke="#ccc" />
                                                    <XAxis dataKey="demand_period" />
                                                    <YAxis />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div >
                                </div >

                                <div className='row addmtopForaccuracy '>
                                    <div className='row '>
                                        <div className='col-sm-6 addFontattributeforhead '>
                                            <div className='Single-Line-Text mobileView5'> {t('ACCURACY PER SELECTED CATEGORY')}: <span className='productType'>{t('PRODUCT TYPE')}</span></div>
                                            <div className='col-sm-12 mt-4  addChartmargintop border shadow'>
                                                <div className='row'>
                                                    <div className='col-sm-5'><div className='border pt-2 pe-3 borderWidth float-start addMargintopforsdfForecast ms-2 sdfForecastcolor'></div>
                                                        <div className='addmarginSdfaccuracy '>{t('SDF Accuracy')}</div>
                                                    </div>
                                                    <div className='col-sm-7'>
                                                        <div className='border pt-2 pe-3 borderWidth float-start addMargintopforsdfForecast ms-2 sdfEnrichedaccuracy'></div>
                                                        <div className='addmarginSdfEnaccuracy allFontcolor'>{t('SDF Enriched Accuracy')}</div>
                                                    </div>
                                                </div>
                                                <div className='row addFontattributeforheads'>
                                                    <ResponsiveContainer width="90%" height={400}>
                                                        <BarChart id='bartwochart'
                                                            width={500}
                                                            height={300}
                                                            data={productDependentgraph}
                                                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                                            layout='vertical'
                                                        >
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <XAxis type='number' />
                                                            <YAxis type='category' id='important' dataKey='category_value' />
                                                            <Bar dataKey='bias_lfh' fill='rgba(4, 187, 241, 1)' >
                                                                <LabelList dataKey="fca_enriched" content={renderCustomizedLabel} position="insideRight" style={{ fill: "white" }} />
                                                            </Bar>
                                                            <Bar dataKey='fca_sdf' fill='rgba(146, 193, 47, 1)'>
                                                                <LabelList dataKey="bias_acn" content={renderCustomizedLabel} position="insideRight" style={{ fill: "white" }} />
                                                            </Bar>
                                                            <Tooltip content={CustomtooltipForProducttype} />
                                                        </BarChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-sm-6 mobileView6  addFontattributeforhead'>
                                            <div className='row mobileView7'> {t('DEMAND AND FORECAST VOLUMES PER MONTH')}</div>
                                            <div className='col-sm-12  margingraphtop  border shadow '>

                                                <div className='row addFontattributeforheads'>
                                                    <div className='col-sm-6  addImportantpadleft'>
                                                        <div className='border manualWidth margintopforround float-start sdfForecastcolor pt-1 pb-1 addMarginimportanttop'></div>
                                                        <div className='border margintopped float-start sdfForecastcolor addwidthtoLine'></div>
                                                        <div className='border manualWidth margintopforround float-start sdfForecastcolor pt-1 pb-1 addMarginimportanttop'></div>
                                                        <div className='margintopForsdfAccuracy'>{t('Demand Volume')}</div>
                                                    </div>
                                                    <div className='col-sm-6 mobileView8 '>
                                                        <div className='border manualWidth margintopforround float-start sdfEnrichedaccuracy pt-1 pb-1 addMarginimportanttop'></div>
                                                        <div className='border margintopped float-start sdfEnrichedaccuracy'></div>
                                                        <div className='border manualWidth margintopforround float-start sdfEnrichedaccuracy pt-1 pb-1 addMarginimportanttop'></div>
                                                        <div className='margintopForsdfAccuracy'>{t('SDF Enriched Accuracy')}</div>
                                                    </div>
                                                </div>
                                                <div className='row addFontattributeforheads'>
                                                    <ResponsiveContainer width="90%" height={400}>
                                                        <LineChart width={1200} id="lineChartcomponent" height={300} data={demandGraphbind}>
                                                            <XAxis dataKey="demand_period" />
                                                            <YAxis tickFormatter={formatyaxis1} />
                                                            <Tooltip content={<CustomtooltipFordemandgraph />} />
                                                            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                                                            <Line type="monotone" dataKey="demand_volume" stroke="#92C12F" />
                                                            <Line type="monotone" dataKey="bias_enriched" stroke="#04BBF1" />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className='col-sm-12'>
                                        <div className='row mt-5 ms-1 addDemandvolumedatafont fw-bolder allFontcolor'>
                                            {t('DEMAND VOLUME AND FORECAST CHART')}
                                        </div>
                                        <div className='col-sm-12 border shadow'>
                                            <div className='row mt-3'>
                                                <div className='col-sm-2'></div>
                                                <div className='col-sm-3 addotherChoosegraph'>
                                                    <div className='border borderWidth pt-2 pe-2 float-start sdfForecastcolor mt-1 me-1'></div>
                                                    <div className='sdfFontsize allFontcolor'>{t('Demand Volume>SDF-FORECAST')}</div>
                                                </div>
                                                <div className='col-sm-3 addotherChoosegraph'>
                                                    <div className='border borderWidth pt-2 pe-2 float-start sdfEnrichedaccuracy mt-1 me-1'></div>
                                                    <div className='sdfFontsize allFontcolor'>{t('SDF-FORECAST>Demand Volume')}</div>
                                                </div>
                                                <div className='col-sm-4 mobileView4'>
                                                    <div className='row allFontcolor chooseGraph'>{t('Choose A Graph')}</div>
                                                    <div className='col-sm-12 displayAbsrel'>
                                                        <div className='col-sm-6 '>
                                                            <input type='radio' className='form-check-input radioButton1' checked={chooseGraphrelative} onClick={() => { dispatch(chooseGraphrelativeFunc(true)) }} />
                                                            <label className='ms-1 productType' >{t('Absolute')}</label>
                                                        </div>
                                                        <div className='col-sm-6'>
                                                            <input type='radio' className='form-check-input radioButton2' checked={!chooseGraphrelative} onClick={(e) => { dispatch(chooseGraphrelativeFunc(false)) }} />
                                                            <label className='ms-1 allFontcolor'>{t('Relative')}</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row mt-3 addmarginlastLeft '>
                                                <ResponsiveContainer width="90%" height={400}>
                                                    <BarChart id="barthreechart" width={600} height={600} data={deviationGraphbindvalue}>
                                                        <Bar dataKey="deviation" fill="rgba(146, 193, 47, 1)">
                                                            {
                                                                deviationGraphbindvalue.map((entry, index) => (
                                                                    <Cell fill={entry.demand_volume > entry.forecast_qty ? 'rgba(4, 187, 241, 1)' : 'rgba(146, 193, 47, 1)'} />
                                                                ))}
                                                        </Bar>
                                                        <CartesianGrid stroke="#ccc" />
                                                        <Tooltip content={<CustomTooltip />} />
                                                        <XAxis dataKey="category_value" />
                                                        <YAxis tickFormatter={formatyaxis} />
                                                    </BarChart>
                                                </ResponsiveContainer>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div >

                        </div >
                    </div >
                </div >
            </div > */}
    </>
  );
};
export default ForCastmaincomponent;
