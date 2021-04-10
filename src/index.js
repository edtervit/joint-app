import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import model from "./model.js";
import { createStore, StoreProvider } from "easy-peasy";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";

const store = createStore(model);

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
