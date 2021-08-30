import { Component } from "react";
import Web3 from "web3";
import Loader from "./Loader";

type MyProps = {
  listEvents: any;
  selectedAccount: any;
  isLoaded: any;
};

export default class SideTransaction extends Component<MyProps> {
  render() {
    console.log(this.props.listEvents);
    if (!this.props.isLoaded) {
      return <Loader />;
    }
    return (
      <div className="hidden lg:block w-2/5 px-12 mt-8">
        <h1 className="text-white text-sm mb-4">Latest transactions</h1>
        {this.props.listEvents &&
          this.props.listEvents.map((portfolioTransaction, key) => {
            if (portfolioTransaction.winner_account) {
              const typeTransaction =
                portfolioTransaction.winner_account.address;
              if (key <= 200) {
                return (
                  <div
                    key={portfolioTransaction.id}
                    className="flex text-white px-8 py-4"
                  >
                    <div className="w-2 h-2 bg-artinuMain rounded-full mt-4 mr-4"></div>
                    <div>
                      <p className="">
                        {portfolioTransaction.asset.asset_contract.name} #
                        {portfolioTransaction.asset.token_id.substring(0, 10)}
                      </p>
                      <p className="text-gray-500">
                        {typeTransaction.toUpperCase() ===
                        this.props.selectedAccount.toUpperCase()
                          ? `Bought for `
                          : `Sold for `}
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
            }
          })}
      </div>
    );
  }
}
