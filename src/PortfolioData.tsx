import React, { useState, useEffect, Component } from "react";
import {
  useEthers,
  useContractCall,
  useContractFunction,
  useEtherBalance,
} from "@usedapp/core";
import { Interface, parseEther, formatEther } from "ethers/lib/utils";
import { useForm, Controller } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import Confetti from "react-confetti";
import useWindowSize from "./useWindowSize";
import artinuLogo from "./images/logo.svg";
import Countdown from "react-countdown";
import Web3 from "web3";

let collections: Array<any> = [];
let portfolioItems: Array<any> = [];
let portfolioTransactions: Array<any> = [];

type MyProps = {
  balanceArtinuFinal: any;
};

export default class PortfolioData extends Component<MyProps> {
  state = {
    portfolioItems,
    collections,
    portfolioTransactions,
  };

  fetchUpcoming() {
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
  }

  componentDidMount() {
    this.fetchUpcoming();
  }

  render() {
    const artinuPercent =
      (Number(this.props.balanceArtinuFinal) * 100) / 650000000;

    let totalInvested =
      this.state.portfolioTransactions &&
      this.state.portfolioTransactions.reduce((a, c) => {
        return a + +Web3.utils.fromWei(c.total_price.toString(), "ether");
      }, 0);

    return (
      <div className="flex flex-wrap justify-between w-full bg-gray-800 rounded-xl p-8 mb-8">
        <div className="text-white lg:pl-12 w-full lg:w-auto mb-4 lg:mb-0">
          <p className="">Current value</p>
          <p className="text-4xl text-artinuMain">$6,500</p>
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
            {totalInvested.toFixed(2)} Ξ
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

// interface Props {
//   balanceOf:any,
//   artinuPriceInEth:any,
// }

// const Portfolio: React.FC<Props> = ({
//   balanceOf,
//   artinuPriceInEth
// }) => {
//   const size = useWindowSize();

// const [advice, setAdvice] = useState("");

// useEffect(() => {
//     const url = "https://api.opensea.io/api/v1/assets?owner=0x8f804dec80028cb5bbc5537762b27629a4ab6c94&order_direction=desc&offset=0&limit=20";

//     const fetchData = async () => {
//         try {
//             const response = await fetch(url);
//             const json = await response.json();
//             console.log(json);
//             setAdvice(json);
//         } catch (error) {
//             console.log("error", error);
//         }
//     };

//     fetchData();
// }, []);

//   return (
//     <>

//     </>
//   );

//   return <p>loading...</p>;
// };
