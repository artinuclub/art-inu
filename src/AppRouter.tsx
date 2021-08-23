import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import Header from "./Header";
import App from "./App";
import Portfolio from "./Portfolio";

export default function AppRouter() {
  const { account } = useEthers();

  return (
    <div className="bg-gray-900 h-full pb-12">
      <BrowserRouter forceRefresh>
        <Header account={account} />
        <Switch>
          <Route
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
            render={(props) => (
              <Portfolio {...props} selectedAccount={account} />
            )}
            path="/myportfolio"
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
