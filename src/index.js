import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "react-datepicker/dist/react-datepicker.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
);
