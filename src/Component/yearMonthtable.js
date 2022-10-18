import { useDispatch } from "react-redux";
import { useEffect } from "react";
import "../css/yearMonthtable.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "./DataTable";
import { useRef } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const YearMonthtablecomponent = ({ ...rest }) => {
  const dispatch = useDispatch();
  // const { plotData, sdfTableKys } = props;
  const { t, i18n } = useTranslation();
  const tableRef = useRef();
  useEffect(() => {
    i18n.changeLanguage(window.sessionStorage.getItem("language"));
  }, []);
  const [displayTotalsum, setdisplayTotalsum] = useState(0);
  // const changeSDFForecastValue = (item, i) => {
  //   dispatch(actionChangeSDFForecast(+item.target.value, i));
  // };
  // const addDemandvolueData = () => {
  //   return sdfTableKys.map((value, i) => {
  //     return (
  //       <td key={i} colSpan={1}>
  //         {value?.demand_volume}
  //       </td>
  //     );
  //   });
  // };

  // const addSdfmodifiedforecast = () => {
  //   return sdfTableKys.map((value, i) => {
  //     return (
  //       <td colSpan={1} key={i}>
  //         {
  //           <>
  //             <input
  //               min={0}
  //               type={"number"}
  //               value={value?.forecast_enriched}
  //               onChange={(e) => changeSDFForecastValue(e, i)}
  //             />
  //           </>
  //         }
  //       </td>
  //     );
  //   });
  // };
  // const addSdfForecast = () => {
  //   return sdfTableKys.map((value, i) => {
  //     return (
  //       <td colSpan={1} key={i}>
  //         {value?.forecast_quantity}
  //       </td>
  //     );
  //   });
  // };

  // useEffect(() => {
  //   setdisplayTotalsum(
  //     plotData.reduce((acc, curr) => {
  //       return (
  //         acc + +curr?.total
  //         // curr?.forecast_enriched +
  //         // curr?.forecast_quantity
  //       );
  //     }, 0)
  //   );
  // }, [plotData]);

  // const bindTablehead = () => {
  //   return (
  //     plotData &&
  //     sdfTableKys.map((value, i) => {
  //       return (
  //         <th
  //           key={i}
  //           colSpan={1}
  //           className=" border pe-2 pt-3 ps-3 table2Bottom"
  //           scope="col"
  //         >
  //           {value}
  //         </th>
  //       );
  //     })
  //   );
  // };
  return (
    <Row className="mt-4 d-flex">
      <Col sm={12} md={12}>
        <DataTable tableRef={tableRef} {...rest} />
      </Col>
      {/* <Col sm={3} md={3}>
        <table className="mt-4 table table-bordered">
          <thead class="thead-dark">
            <tr>
              <th>Total Sum</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{rest?.total}</td>
            </tr>
          </tbody>
        </table>
      </Col> */}
      {/* <div className="row addmarginTopfortablegrouping">
        <div className="col-sm-10 d-flex">
          <DataTable tableRef={tableRef} {...rest} />
        </div>
        <div className="col-sm-2 text-center">
          <table className="table table-bordered">
            <thead class="thead-dark">
              <tr>
                <th>Total Sum</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{rest?.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}
    </Row>
    // <div className="row addyeartabletop">
    //   <div className="col-sm-12 table-responsive-xl ">
    //     <table className="table table-bordered table-striped">
    //       <thead>
    //         <th className="text-center" scope="row">
    //           <span className="yearMonthcolor">{t("Year-Month")}</span>
    //           <span className="arrowSize">→</span>
    //         </th>
    //         {bindTablehead()}
    //         <th
    //           colSpan={1}
    //           className="pe-2 pt-3 ps-3 border table2Bottom"
    //           scope="col"
    //         >
    //           {t("Total sum Demand and Forecast")}
    //         </th>
    //       </thead>
    //       <tbody>
    //         <tr>
    //           <th className="text-center  rowFontcolor" scope="row">
    //             {t("Demand Volume")}
    //           </th>
    //           {addDemandvolueData()}
    //           <td className="border" colSpan={1}></td>
    //         </tr>
    //         <tr>
    //           <th className="text-center rowFontcolor" scope="row">
    //             {t("SDF Modified forecast")}
    //           </th>
    //           {addSdfmodifiedforecast()}
    //           <td className="border" colSpan={1}>
    //             {displayTotalsum.toFixed(2)}
    //           </td>
    //         </tr>
    //         <tr>
    //           <th className="text-center rowFontcolor" scope="row">
    //             {t("SDF forcast")}
    //           </th>
    //           {addSdfForecast()}
    //           <td className="border" colSpan={1}></td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </div>
    //  </div>

    //   <div className="row mt-4">
    //     <div className="col-sm-12">
    //       <DataTable tableRef={tableRef} {...rest} />
    //     </div>
    //   </div>
  );
};
export default YearMonthtablecomponent;
