import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppRouter from "./AppRouter";
import reportWebVitals from "./reportWebVitals";
import { ChainId, DAppProvider } from "@usedapp/core";
import { ApolloProvider } from '@apollo/client'
import { Client } from './App'


const config = {
  readOnlyChainId: ChainId.Mainnet,
};

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={Client}>
    <DAppProvider config={config}>
      <AppRouter />
    </DAppProvider>
    </ApolloProvider>,
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

