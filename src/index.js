import React from "react";
import ReactDOM from "react-dom/client";
import './styles/index.css'
import './styles/custom.css'
import App from "./App.tsx";
import store from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
