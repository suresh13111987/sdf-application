import "../css/yearlyTotalvolume.css";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { convertToMillion } from "../Utils";

export const YearlytotalVolumes = ({ volumes }) => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(window.sessionStorage.getItem("language"));
  }, []);
  return (
    <>
      <Row>
        <Col sm={12} md={12} className="border shadow">
          <div className="p-1 addMarginDatacolor">
            {t("YEARLY TOTAL VOLUMES")}
          </div>
          <Row className="addMarginImportanttop">
            <Col sm={4} md={4} className="mb-3">
              <Row className="text-center">
                <Col
                  sm={12}
                  md={12}
                  className="addMargintopColordata text-center"
                >
                  {volumes?.currntYear
                    ? convertToMillion(volumes?.currntYear)
                    : 0}
                </Col>
              </Row>
              <Row className="row text-center">
                <Col className="text-center Volumedata">
                  {`${new Date().getFullYear() - 2}`} VOLUME
                </Col>
              </Row>
            </Col>

            <Col sm={4} md={4} className="mb-3">
              <Row className="text-center">
                <Col
                  sm={12}
                  md={12}
                  className="addMargintopColordata text-center"
                >
                  {volumes?.previousYear1
                    ? convertToMillion(volumes?.previousYear1)
                    : 0}
                </Col>
              </Row>
              <Row className="row text-center">
                <Col className="text-center Volumedata">
                  {`${new Date().getFullYear() - 1}`} VOLUME
                </Col>
              </Row>
            </Col>

            <Col sm={4} md={4} className="mb-3">
              <Row className="text-center">
                <Col
                  sm={12}
                  md={12}
                  className="addMargintopColordata text-center"
                >
                  {volumes?.previousYear2
                    ? convertToMillion(volumes?.previousYear2)
                    : 0}
                </Col>
              </Row>
              <Row className="row text-center">
                <Col className="text-center Volumedata">
                  {`${new Date().getFullYear()}`} VOLUME
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* <div className="row addcolumpads addRowmargintop ">
            <div className="col-sm-12 border shadow">
               <div className='row addMarginandPaddingleft addMarginDatacolor'>
                  {t('YEARLY TOTAL VOLUMES')}
               </div>
               <div className='row addMarginImportanttop'>
                  <div className='col-sm-4'>
                     <div className='row text-center'><div className='col-sm-12 addMargintopColordata text-center'>2.14M</div></div>
                     <div className='row text-center'><div className='col-sm-12 text-center Volumedata'>2019 VOLUME</div></div>
                  </div>
                  <div className='col-sm-4 text-center'>
                     <div className='row'><div className='col-sm-12 addMargintopColordata text-center'>2.14M</div></div>
                     <div className='row  text-center'><div className='col-sm-12 text-center Volumedata'>2020 VOLUME</div></div>
                  </div>
                  <div className='col-sm-4'>
                     <div className='row text-center'><div className='col-sm-12 addMargintopColordata text-center'>2.23M</div></div>
                     <div className='row text-center'><div className='col-sm-12 text-center Volumedata'>2021 VOLUME</div></div>
                  </div>
               </div>
            </div>
         </div> */}
    </>
  );
};
export default YearlytotalVolumes;
