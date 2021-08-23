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
import Loader from "./Loader";
import Confetti from "react-confetti";
import useWindowSize from "./useWindowSize";
import artinuLogo from "./images/logo.svg";
import Countdown from "react-countdown";
import Web3 from "web3";

let collections: Array<any> = [];
let portfolioItems: Array<any> = [];
let totalFloor = 0
let loading

type MyProps = {
  selectedAccount: any;
  account:any;
};


const updateUser = "0xC8605C3e0E670C1419147F6B9885335aF5Ed0E33"


export default class PortfolioList extends Component<MyProps> {

  
  
  state = {
    portfolioItems,
    collections,
    loading,
  };

  fetchUpcoming() {
    this.setState({
      loading:true
    })
    fetch(
      `https://api.opensea.io/api/v1/assets?owner=${this.props.selectedAccount}&order_direction=asc&offset=0`, {
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
          portfolioItems: data.assets,
          loading:false,
        })
      );
    fetch(
      `https://api.opensea.io/api/v1/collections?asset_owner=${this.props.selectedAccount}&offset=0`, {
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
          collections: data,
        })
      );
  }

  componentDidMount() {
    this.fetchUpcoming();
  }

  render() {
    //console.log(this.state.collections[0] && this.state.collections[0].name )

    console.log(this.props.selectedAccount)

    
    if (loading == true){
    return(
      <Loader />
    )
    }else{
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2  grid-rows-2 gap-4 w-full lg:w-3/5">
        {this.state.portfolioItems && 
          this.state.portfolioItems.map((portfolioItem, i) => {


           const selectedCollection = this.state.collections.find((collection:any) => collection.primary_asset_contracts[0] && collection.primary_asset_contracts[0].address === portfolioItem.asset_contract.address )
           
         

            return (
              <div className="">
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
                      <p className="text-xl">{Web3.utils.fromWei(
                        portfolioItem.last_sale.total_price.toString(),
                        "ether"
                      )} Ξ</p>
                      <p className="text-gray-500">Bought at</p>
                    </div>
                    <div className="text-center px-4">
                      <p className="text-xl">{selectedCollection && selectedCollection.stats.floor_price} Ξ</p>
                      <p className="text-gray-500">Current floor</p>
                    </div>
                  </div>
                  <a className="mt-8" href={portfolioItem.permalink} target="_blank">
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
