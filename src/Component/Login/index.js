import "../../css/Loginpage.css";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionLogindata, actionChangepassword } from "../../redux/Actions/LoginData";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faXmark, faEnvelope, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
import{toast} from 'react-toastify';


export const Login = () => {
  const [userName, setuserName] = useState();
  const [password, setpassword] = useState();
  const [changePassword, setchangePassword] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState();
  const dispatch = useDispatch();
  const { loginResponse, changePasswordres } = useSelector((state) => ({
    loginResponse: state.loginDataReducer.loginDataresponse.data,
    changePasswordres: state.loginDataReducer.loginfetchStateresponse.data,

  }), shallowEqual);
  const navigate = useNavigate();
  useEffect(() => {
    sessionStorage.clear();
  }, [])
  useEffect(() => {
    if (loginResponse !== undefined&&loginResponse.status===true) {
      if (loginResponse.passwordUpdated !== undefined && loginResponse.passwordUpdated === false) {
        setchangePassword(true);
      }
      else if (loginResponse.passwordUpdated !== undefined &&
        loginResponse.passwordUpdated === true &&
        loginResponse.status == true) {
        navigate("/Collaborativetool");
        window.sessionStorage.setItem('language', language ? language : 'en');
        window.sessionStorage.setItem('username', userName);
        window.sessionStorage.setItem('accesstoken', loginResponse.token);
      }
    }
    else if(loginResponse!==undefined&&loginResponse.status===false)
    {
      toast.error(loginResponse.message);
    }
  }, [loginResponse])
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
  const changePasswordflow = () => {
    if (newPassword === confirmPassword) {
      dispatch(actionChangepassword({
        password: newPassword, email: userName, token: loginResponse.token
      }))
    }
    else {
      alert('Confirm password and new password are not same');
    }
  }
  const data = [
    {
      value: "en",
      text: "English (United States)",
      icon: <img src="images/Usflag.svg" />,
    },
    {
      value: "fr",
      text: "French",
      icon: <img src="images/Usflag.svg" />,
    },
  ];

  // const FormHeader = props => (

  //   <h2 id="headerTitle">{props.title}</h2>

  // );
  const handleLangChange = (e) => {
    const lang = e.value
    setLanguage(lang);
    i18n.changeLanguage(lang);
  }


  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 col-sm-12 p-0">
            <img src="images/loginPageimg.png" className="addImageresize" alt="loginLogo" />
          </div>

          <div className="col-md-4 col-sm-12 ">
            <div className="row addloginpaddleft justify-content-end">
              <div className="col-sm-8 mt-2 p-0">
                <div style={{ width: '100%' }}>
                  <Select
                    placeholder="Select the Language"
                    options={data}
                    classNamePrefix="loginDrop"
                    getOptionLabel={(e) => (
                      <div className={"w-100"}>
                        <span className="me-2">{e.icon}</span>
                        <span>{e.text}</span>
                      </div>
                    )}
                    defaultValue={data[0]}
                    onChange={(e) => { handleLangChange(e) }}
                  />
                </div>
              </div>
            </div>

            <div className="row login-form addMargintopforLoginpage addloginpaddleft">
              <div className="col-sm-12 addSignincss fontColorchange">
                {t('Sign in to your account')}
              </div>

              <div className="mt-5">
                <div className="col-sm-12">
                  <FontAwesomeIcon icon={faEnvelope} color="#484036" style={{ marginRight: '0.5em' }} />
                  {t('Username')}</div>
                <div className="col-sm-12 mt-1">

                  <input
                    type="text"
                    placeholder={t('Username')}
                    className="w-100 pt-2 pb-2 ps-2 addBorderradiusforinputs"
                    onChange={(e) => { setuserName(e.target.value) }}
                  />
                </div>
              </div>

              <div className="mt-5">
                <div className="col-sm-12">
                  <FontAwesomeIcon icon={faLock} color="#484036" style={{ marginRight: '0.5em' }} />
                  {t('Password')}
                </div>
                <div className="col-sm-12 mt-1">
                  <input
                    type="Password"
                    placeholder={t('Password')}
                    className="w-100 pt-2 pb-2 ps-2 addBorderradiusforinputs"
                    onChange={(e) => { setpassword(e.target.value) }}
                  />
                </div>
              </div>
            </div>

            <div className="row btn-row">
              <div className="col-sm-12 p-0">
                <button
                  className="btn w-100 loginButtoncss"
                  onClick={() => {
                    dispatch(actionLogindata({ password: password, email: userName }))
                  }}
                >

                  <FontAwesomeIcon icon={faArrowRightToBracket} color="#fff" style={{ marginRight: '0.5em' }} />
                  {t('Login')}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
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
    </>
  );
};
export default Login;
