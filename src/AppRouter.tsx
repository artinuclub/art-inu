import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import Header from "./Header";
import App from "./App";
import Portfolio from "./Portfolio";
import Launchpad from "./Launchpad";

export default function AppRouter() {
  const { account } = useEthers();

  return (
    <div className="bg-gray-900 h-full pb-12">
      <BrowserRouter>
        <Header account={account} />
        <Switch>
          <Route
            key="1"
            render={(props) => (
              <Portfolio
                {...props}
                selectedAccount="0xC8605C3e0E670C1419147F6B9885335aF5Ed0E33"
              />
            )}
            path="/"
            exact
          />
          <Route component={App} path="/dashboard" />
          <Route
            key="2"
            render={(props) => (
              <Portfolio {...props} selectedAccount={account} />
            )}
            path="/myportfolio"
          />
          <Route component={Launchpad} path="/launchpad" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
