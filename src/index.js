import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import '../node_modules/font-awesome/css/font-awesome.min.css';

import store from "./redux/store/index";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";



import App from "./App";



const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

// Render app in `#root` element
ReactDOM.render(app, document.getElementById("root"));
