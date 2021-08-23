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

let portfolioTransactions: Array<any> = [];

export default class SideTransaction extends Component {
  state = {
    portfolioTransactions,
  };

  fetchUpcoming() {
    fetch(
      `https://api.opensea.io/api/v1/events?account_address=0xC8605C3e0E670C1419147F6B9885335aF5Ed0E33&offset=0&limit=16`, {
        headers: {
          'X-API-KEY': '66aa3ceafbc64adfafcf84384b301b06',
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
    //     fetch(
    //       `https://api.opensea.io/api/v1/collections?asset_owner=0xC8605C3e0E670C1419147F6B9885335aF5Ed0E33&offset=0&limit=300`
    //     )
    //       // We get the API response and receive data in JSON format...
    //       .then((response) => response.json())
    //       // ...then we update upcomingMovies State
    //       .then((data) =>
    //         this.setState({
    //           collections: data,
    //         })
    //       );
  }

  componentDidMount() {
    this.fetchUpcoming();
  }

  render() {

    

    return (
      <div className="hidden lg:block w-2/5 px-12">
        <h1 className="text-white text-sm mb-4">Latest transactions</h1>
        {this.state.portfolioTransactions &&
          this.state.portfolioTransactions.map((portfolioTransaction, key) => {

            

           

            if(portfolioTransaction.winner_account){
            
            const typeTransaction = portfolioTransaction.asset.owner.user.username
            let typeTransactionFinal

            if(typeTransaction === "artinu_club"){
              typeTransactionFinal = "Bought"
            }else{
              typeTransactionFinal = "Sold"
            }

            return (
              <div key={portfolioTransaction.id} className="flex text-white px-8 py-4">
                <div className="w-2 h-2 bg-artinuMain rounded-full mt-4 mr-4"></div>
                <div>
                  <p className="">{portfolioTransaction.asset.asset_contract.name} #{portfolioTransaction.asset.token_id}</p>
                  <p className="text-gray-500">{typeTransactionFinal} 
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
