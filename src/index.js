import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";

axios.defaults.baseURL =
  process.env.REACT_APP_URL_BACK || "http://localhost:3001";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </>,
  rootElement
);
