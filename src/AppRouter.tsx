import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Interface, parseEther, formatEther } from "ethers/lib/utils";
import {
  useEthers,
  useContractCall,
  useContractFunction,
  useEtherBalance,
} from "@usedapp/core";
import Header from "./Header";
import App from "./App";
import Portfolio from "./Portfolio";
import { Contract } from "ethers";
import contract_abi from "./contract";
import Web3 from "web3";

const TOKEN_CONTRACT = "0xc1FF84C5C6FcF7e6E60D6bf4C1209BC4254629ad";
const ARTIST_WALLET = "0x853c64EdD278B9C30E8abf5F8cf42aeF64C3796D";

export default function AppRouter() {
  
  const { activateBrowserWallet, account, active, error } = useEthers();

  return (
    <div className="bg-gray-900 h-full pb-12">
      <BrowserRouter>
        <Header account={account} />
        <Switch>
          <Route render={(props) => (<Portfolio {...props} selectedAccount="0xC8605C3e0E670C1419147F6B9885335aF5Ed0E33" />)}  path="/" exact />
          <Route component={App} path="/Dashboard" />
          <Route render={(props) => (<Portfolio {...props} selectedAccount="0x20438C2f91D2bdfc3aA224f1a00e4111B297A392" />)}  path="/myportfolio" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}


