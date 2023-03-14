import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import App from "./App";

import { PersistGate } from "redux-persist/integration/react";

axios.defaults.baseURL =
  process.env.REACT_APP_URL_BACK || "http://localhost:3001";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </>,
  rootElement
);
