import React from "react";
import ReactDOM from "react-dom/client"; // Import ReactDOM
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import 'crypto-browserify';
import 'stream-browserify';
import 'path-browserify';
import 'os-browserify/browser';
import 'buffer/';



import dotenv from 'dotenv';
dotenv.config();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
