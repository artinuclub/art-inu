import { Component } from "react";
import Web3 from "web3";

let portfolioTransactions: Array<any> = [];
let isLoading = false;

export default class SideTransaction extends Component {
  state = {
    portfolioTransactions,
    isLoading,
  };

  fetchUpcoming() {
    this.setState({
      isLoading: true,
    });
    fetch(
      `https://api.opensea.io/api/v1/events?account_address=0xC8605C3e0E670C1419147F6B9885335aF5Ed0E33&offset=0&limit=16`,
      {
        headers: {
          "X-API-KEY": "66aa3ceafbc64adfafcf84384b301b06",
        },
      }
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          portfolioTransactions: data.asset_events,
          isLoading: false,
        })
      );
  }

  componentDidMount() {
    this.fetchUpcoming();
  }

  render() {
    return (
      <div className="hidden lg:block w-2/5 px-12">
        <h1 className="text-white text-sm mb-4">Latest transactions</h1>
        {this.state.portfolioTransactions &&
          !this.state.isLoading &&
          this.state.portfolioTransactions.map((portfolioTransaction, key) => {
            if (portfolioTransaction.winner_account) {
              const typeTransaction =
                portfolioTransaction.asset.owner.user.username;
              let typeTransactionFinal;

              if (typeTransaction === "artinu_club") {
                typeTransactionFinal = "Bought";
              } else {
                typeTransactionFinal = "Sold";
              }

              return (
                <div
                  key={portfolioTransaction.id}
                  className="flex text-white px-8 py-4"
                >
                  <div className="w-2 h-2 bg-artinuMain rounded-full mt-4 mr-4"></div>
                  <div>
                    <p className="">
                      {portfolioTransaction.asset.asset_contract.name} #
                      {portfolioTransaction.asset.token_id}
                    </p>
                    <p className="text-gray-500">
                      {typeTransactionFinal}
                      {portfolioTransaction.total_price &&
                        Web3.utils.fromWei(
                          portfolioTransaction.total_price.toString(),
                          "ether"
                        )}{" "}
                      ETH
                    </p>
                    {/* <p className="text-xl">{portfolioTransaction.seller.address}</p> */}
                  </div>
                </div>
              );
            }
          })}
      </div>
    );
  }
}
