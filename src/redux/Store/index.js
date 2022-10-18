import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../Reducers";
const ms =
  process.env.REACT_APP_UATURL === "UAT"
    ? compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__
          ? window.__REDUX_DEVTOOLS_EXTENSION__()
          : (fn) => fn
      )
    : applyMiddleware(thunk);

export const Store = createStore(rootReducer, {}, ms);
