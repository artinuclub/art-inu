import { Component } from "react";
import Web3 from "web3";

let collections: Array<any> = [];
let portfolioItems: Array<any> = [];
let portfolioTransactions: Array<any> = [];
let isLoading = false;

type MyProps = {
  balanceArtinuFinal: any;
};

export default class PortfolioData extends Component<MyProps> {
  state = {
    portfolioItems,
    collections,
    portfolioTransactions,
    isLoading,
  };

  fetchUpcoming() {
    this.setState({
      isLoading: true,
    });
    fetch(
      `https://api.opensea.io/api/v1/assets?owner=0xC8605C3e0E670C1419147F6B9885335aF5Ed0E33&order_direction=desc&offset=0&limit=20`,
      {
        headers: {
          "X-API-KEY": "66aa3ceafbc64adfafcf84384b301b06",
        },
      }
    )
      // We get the API response and receive data in JSON format...
      .then((response) => response.json())
      // ...then we update upcomingMovies State
      .then((data) =>
        this.setState({
          portfolioItems: data.assets,
        })
      );
    fetch(
      `https://api.opensea.io/api/v1/collections?asset_owner=0xC8605C3e0E670C1419147F6B9885335aF5Ed0E33&offset=0&limit=300`,
      {
        headers: {
          "X-API-KEY": "66aa3ceafbc64adfafcf84384b301b06",
        },
      }
    )
      // We get the API response and receive data in JSON format...
      .then((response) => response.json())
      // ...then we update upcomingMovies State
      .then((data) =>
        this.setState({
          collections: data,
        })
      );
    fetch(
      `https://api.opensea.io/api/v1/events?account_address=0xC8605C3e0E670C1419147F6B9885335aF5Ed0E33&event_type=successful&only_opensea=false&offset=0`,
      {
        headers: {
          "X-API-KEY": "66aa3ceafbc64adfafcf84384b301b06",
        },
      }
    )
      // We get the API response and receive data in JSON format...
      .then((response) => response.json())
      // ...then we update upcomingMovies State
      .then((data) =>
        this.setState({
          portfolioTransactions: data.asset_events,
        })
      );
    this.setState({
      isLoading: false,
    });
  }

  componentDidMount() {
    this.fetchUpcoming();
  }

  render() {
    const artinuPercent =
      (Number(this.props.balanceArtinuFinal) * 100) / 650000000;

    const totalInvested =
      this.state.portfolioTransactions &&
      this.state.portfolioTransactions.reduce((a, c) => {
        if (c.seller.user.username === "artinu_club") {
          return Number(a);
        }

        return a + Number(c.total_price);
      }, 0);

    const currentValue = this.state.collections.reduce((prev, curr) => {
      return prev + curr.owned_asset_count * curr.stats.floor_price;
    }, 0);

    return (
      <div className="flex flex-wrap justify-between w-full bg-gray-800 rounded-xl p-8 mb-8">
        <div className="text-white lg:pl-12 w-full lg:w-auto mb-4 lg:mb-0">
          <p className="">Current value</p>
          <p className="text-4xl text-artinuMain">
            {currentValue.toFixed(2)} Ξ
          </p>
        </div>
        <div className="text-white w-full lg:w-auto mb-4 lg:mb-0">
          <p className="">Number of NFTs</p>
          <p className="text-4xl">
            {this.state.portfolioItems &&
              Object.keys(this.state.portfolioItems).length}
          </p>
        </div>
        <div className="text-white w-full lg:w-auto mb-4 lg:mb-0">
          <p className="">Total invested</p>
          <p className="text-4xl text-artinuGreen">
            {(+Web3.utils.fromWei(totalInvested.toString(), "ether")).toFixed(
              2
            )}{" "}
            Ξ
          </p>
        </div>
        <div className="text-white pr-12 w-full lg:w-auto mb-4 lg:mb-0">
          <p className="">Your holding</p>
          <p className="text-4xl">{artinuPercent.toFixed(2)}%</p>
        </div>
      </div>
    );
  }
}
