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
import PortfolioList from "./PortfolioList"
import PortfolioData from "./PortfolioData"
import SideTransaction from "./SideTransaction"
import Confetti from "react-confetti";
import useWindowSize from "./useWindowSize";
import artinuLogo from "./images/logo.svg";
import Countdown from "react-countdown";
import Web3 from "web3";
import { Contract } from "ethers";
import contract_abi from "./contract";


const TOKEN_CONTRACT = "0xc1FF84C5C6FcF7e6E60D6bf4C1209BC4254629ad";
const ARTIST_WALLET = "0x853c64EdD278B9C30E8abf5F8cf42aeF64C3796D";

interface Props {
  selectedAccount:any,
}




const Portfolio: React.FC<Props> = ({
  selectedAccount,
}) => {

    const abi = new Interface(contract_abi);
    const contract = new Contract(TOKEN_CONTRACT, abi);
    
    const { activateBrowserWallet, account, active, error } = useEthers();
  
    const balanceOfArtinu = useContractCall({
      abi,
      address: TOKEN_CONTRACT,
      method: "balanceOf",
      args: [account],
    });
  
    const balanceArtinu = balanceOfArtinu && Web3.utils.fromWei(balanceOfArtinu.toString(), 'gwei');
    const balanceArtinuFinal = (Math.round(Number(balanceArtinu)))

    
    return (
      <div className="flex flex-wrap max-w-7xl mx-auto">
        <PortfolioData balanceArtinuFinal={balanceArtinuFinal}/>
        <PortfolioList selectedAccount={selectedAccount} account={account}/>
        <SideTransaction />
      </div>
    );
  
}

export default Portfolio;

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
