import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routing from "./Routing";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./i18n";
import { Provider } from "react-redux";
import { store } from "./redux-store/store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Routing />
  </Provider>
  // </React.StrictMode>
);
