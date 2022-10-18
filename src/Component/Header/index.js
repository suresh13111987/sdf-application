import { useNavigate, useLocation } from "react-router-dom";
import "../../css/Headercss.css";
import "../../css/mobileresponsive.css";
import "../../css/Loginpage.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Modal from "react-modal";

import { actionChangepassword } from "../../redux/Actions/LoginData";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faXmark, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

// import { faUser, faLock, faEnvelope, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'

import _ from 'lodash'
import{toast} from 'react-toastify';

export const Header = () => {
  const currentURL = window.location.pathname;
  const { t, i18n } = useTranslation();
  const [changePassword, setchangePassword] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    i18n.changeLanguage(window.sessionStorage.getItem('language'));
  }, []);
  const { changePasswordres } = useSelector((state) => ({ changePasswordres: state.loginDataReducer.loginfetchStateresponse.data }), shallowEqual);
  useEffect(() => {
    if (changePasswordres !== undefined) {
      if (changePasswordres.status===undefined)
      {
      if (changePasswordres.success === true) {
        alert('Please login again');
        window.location.replace('/');
        setchangePassword(false);
      }
    }
    else if(changePasswordres.status===false)
    {
      toast.error("Enter new password and confirm password properly");
    }
    }
  }, [changePasswordres])

  const navigate = useNavigate();
  const FormHeader = props => (
    <div className="row">
      <div className="col-sm-11">
        <h2 id="headerTitle">{props.title}</h2>
      </div>
      <div className="col-sm-1 pt-4 pe-3">
        <button className="btn-close" onClick={() => { setchangePassword(false) }}></button>
      </div>
    </div>
  );
  const changePasswordflow = () => {
    if (newPassword === confirmPassword) {
      dispatch(actionChangepassword({ password: newPassword, email: window.sessionStorage.getItem('username'), token: window.sessionStorage.getItem('accesstoken') }))

    }
    else {
      alert('Confirm password and new password are not same');
    }
  }
  return (
    <>
      <Modal isOpen={changePassword} id="modalvalue">
        <Row className="m-0">
          <Col sm={8} md={8} className="p-0">
            <img src="images/loginPageimg.png" className="changepass-img" alt="loginLogo" />
          </Col>
          <Col sm={4} md={4} style={{ position: 'relative' }}>
            <Row>
              <Col sm={12} md={12}>
                <span className="close-pass-btn" onClick={() => setchangePassword(false)}>
                  <FontAwesomeIcon icon={faXmark} color="#484036" style={{ fontSize: '22px' }} />
                </span>
              </Col>
            </Row>
            <Row className="p-4 mt-4">
              <Col sm={12} md={12} className="mt-5">
                <p className="change-password-heading text-center">{t('Change Password')}</p>
              </Col>

              <Col sm={12} md={12} className="mt-5">
                <label>{t('New Password')}</label>
                <input
                  type="password"
                  placeholder={t('Enter your new password')}
                  className="w-100 pt-2 pb-2 ps-2 addBorderradiusforinputs"
                  onChange={(e) => { setnewPassword(e.target.value) }}
                />
              </Col>

              <Col sm={12} md={12} className="mt-5">
                <label>{t('Confirm Password')}</label>
                <input
                  type="password"
                  placeholder={t('Enter confirm password')}
                  className="w-100 pt-2 pb-2 ps-2 addBorderradiusforinputs"
                  onChange={(e) => { setconfirmPassword(e.target.value) }}
                />
              </Col>
            </Row>

            <Row>
              <Col sm={12} md={12} className="change-pass-row">
                <Button variant="info" className="change-pass-btn" onClick={() => { changePasswordflow() }}>{t('Submit')}</Button>
              </Col>
            </Row>
          </Col>
        </Row>


        {/* <div id="loginform">
          <FormHeader title={t('Change Password')}></FormHeader>
          <div className="addMarginleftforpopup">
            <div class="row w-75" id="inputClass">
              <label>{t('New Password')}</label>
              <input type="password" placeholder={t('Enter your new password')} onChange={(e) => { setnewPassword(e.target.value) }} />
            </div>
            <div class="row w-75" id="inputClass">
              <label>{t('Confirm Password')}</label>
              <input type="text" placeholder={t('Enter confirm password')} onChange={(e) => { setconfirmPassword(e.target.value) }} />
              <div class="row w-75 " >
                <button id="button" onClick={() => { changePasswordflow() }}>{t('Submit')}</button>
              </div>
            </div>
          </div>
        </div> */}
      </Modal>

      <Navbar className="p-2 mx-2 align-items-center" expand="lg">
        <Navbar.Brand href="#">
          <img
            src="images/Holcimlogo.svg"
            className="holCimfontcolor"
            alt="holcimLogo.svg"
          /></Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 justify-content-center">
            <div className="fontStyledata fontSizeofstatistical">
              {t("Statistical Demand Forecasting")}
            </div>
          </Nav>

          <Nav className="mx-5 text-center navbar-dropdown">
            <Stack direction="horizontal" gap={1}>
              <div>
                <FontAwesomeIcon icon={faUser} color="#484036" />
              </div>
              <div>
                <NavDropdown title={window.sessionStorage.getItem('username')} id="nav-dropdown">
                  <NavDropdown.Item onClick={() => { setchangePassword(true); }} href="#">
                    <FontAwesomeIcon icon={faKey} style={{ marginRight: '0.5em' }} color="#484036" />
                    {t('Change Password')}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => { window.location.replace('/'); }} href="#">
                    <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ marginRight: '0.5em' }} color="#484036" />
                    {t('Logout')}
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </Stack>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Nav variant="tabs" defaultActiveKey="/collaborativetool" style={{ marginBottom: '1em' }}>
        <Nav.Item>
          <Nav.Link className={
            currentURL.toLowerCase() === "/collaborativetool"
              ? "activeBtn"
              : "navButton"
          } onClick={() => {
            navigate("/Collaborativetool");
          }} href="#">
            <img src="icons/Collaborative_Tool.png" className="menu-icon" alt="loginLogo" />
            {t("Collaborative Tool")}
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link className={
            currentURL.toLowerCase() === "/forecastaccuracyreport"
              ? "activeBtn"
              : "navButton"
          } onClick={() => {
            navigate("/ForecastAccuracyReport");
          }} href="#">
            <img src="icons/Forecast_Accuracy_Report_black.png" className="menu-icon" alt="loginLogo" />
            {t("Forecast Accuracy Report")}
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* <Row>
        <Col>
          <div className="text-center fontStyledata fontSizeofstatistical">
            {t("Statistical Demand Forecasting")}
          </div>
        </Col>
      </Row> */}

      {/* <div className="row m-0">
        <div className="col-md-12 text-center fontStyledata fontSizeofstatistical">
          {t("Statistical Demand Forecasting")}
        </div>
      </div> */}

      {/* <div className="container-fluid">
        <div className="row border shadow-s align-items-center">
          <div className="col-md-2 text-center">
            <img
              src="images/Holcimlogo.svg"
              className="holCimfontcolor"
              alt="holcimLogo.svg"
            />
          </div>
          <div className="col-md-8 text-center fontStyledata fontSizeofstatistical">
            {t("Statistical Demand Forecasting")}
          </div>
          <div className="col-md-2 text-start">
            <select className="selectBorder " onChange={(e) => {
              if (e.target.value === "Change Password") {
                setchangePassword(true);
              }
              else if (e.target.value === "Logout") {
                window.location.replace('/');
              }
            }}>
              <option className="optionData" selected>
                {window.sessionStorage.getItem('username')}
              </option>
              <option value="Change Password" className="optionData">{t('Change Password')}</option>
              <option value="Logout" className="optionData">{t('Logout')}</option>
            </select>
          </div>
        </div>

        <div className="row border shadow-sm">
          <div className="col-md-12 text-center">
            <button
              className={
                currentURL.toLowerCase() === "/collaborativetool"
                  ? "btn  buttonWidth collaborativeBtn"
                  : "btn btn-default border collaborativeNormalmode"
              }
              onClick={() => {
                navigate("/Collaborativetool");
              }}
            >
              <span
                className={
                  currentURL.toLowerCase() === "/collaborativetool"
                    ? "collaborativespan"
                    : "collaborativespanNormalmode"
                }
              >
                {t("Collaborative Tool")}
              </span>
            </button>
            <button
              className={
                currentURL.toLowerCase() === "/forecastaccuracyreport"
                  ? "btn btn-default border  Forecastbutton buttonWidth ForecastExtradd "
                  : "btn btn-default border Forecastbutton buttonWidth"
              }
              onClick={() => {
                navigate("/ForecastAccuracyReport");
              }}
            >
              <span
                className={
                  currentURL === "/ForecastAccuracyReport"
                    ? "forcastSpanenhanced"
                    : "forCastSpan"
                }
              >
                {t("Forecast Accuracy Report")}
              </span>
            </button>
          </div>
        </div>
      </div> */}
    </>
  );
};
export default Header;
