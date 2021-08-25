import { Component } from "react";
import Button from "./Button";
import Loader from "./Loader";
import Web3 from "web3";

let collections: Array<any> = [];
let portfolioItems: Array<any> = [];
let isLoading = false;

type MyProps = {
  selectedAccount: any;
  account: any;
  listAssets: any;
  listCollections: any;
  isLoaded: any;
};

const updateUser = "0xC8605C3e0E670C1419147F6B9885335aF5Ed0E33";

export default class PortfolioList extends Component<MyProps> {
  render() {
    if (!this.props.isLoaded) {
      return <Loader />;
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2  grid-rows-2 gap-4 w-full lg:w-3/5">
        {this.props.listAssets &&
          this.props.listAssets.map((portfolioItem, i) => {
            const selectedCollection = this.props.listCollections.find(
              (collection: any) =>
                collection.primary_asset_contracts[0] &&
                collection.primary_asset_contracts[0].address ===
                  portfolioItem.asset_contract.address
            );

            return (
              <div key={i}>
                <div className="bg-gray-800 p-8 rounded-lg shadow-xl py-8 text-white">
                  <img
                    className="w-full rounded-xl mb-4"
                    src={portfolioItem.image_preview_url}
                    alt="Logo"
                  />
                  <div className="flex">
                    <img
                      className="w-6 h-6 rounded-full"
                      src={portfolioItem.asset_contract.image_url}
                      alt="Logo"
                    />
                    <p className="ml-2 text-lg">{portfolioItem.name}</p>
                  </div>
                  <p className="text-gray-500 mb-2">
                    {portfolioItem.asset_contract.name}
                  </p>
                  <div className="flex justify-between mb-4 mt-4">
                    <div className="text-center px-4">
                      <p className="text-xl">
                        {Web3.utils.fromWei(
                          portfolioItem.last_sale.total_price.toString(),
                          "ether"
                        )}{" "}
                        Ξ
                      </p>
                      <p className="text-gray-500">Bought at</p>
                    </div>
                    <div className="text-center px-4">
                      <p className="text-xl">
                        {selectedCollection &&
                          selectedCollection.stats.floor_price}{" "}
                        Ξ
                      </p>
                      <p className="text-gray-500">Current floor</p>
                    </div>
                  </div>
                  <a
                    className="mt-8"
                    href={portfolioItem.permalink}
                    target="_blank"
                  >
                    <Button>Open on Opensea</Button>
                  </a>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}
