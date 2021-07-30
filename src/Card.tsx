import React, { useState } from "react";
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

interface Props {
  isLoading: boolean;
  account: any;
  activateBrowserWallet: any;
  //status?: string;
  //etherBalance: any;
  balanceOf: any;
  artinuPriceInEth: any;
  artinuLoading: any;
  artinuTotalLiquidity:any;
}

const MIN_VALUE = "0.04";
const MAX_VALUE = "0.4";
const MAX_TOKEN = 2800000000000000;

const Card: React.FC<Props> = ({
  isLoading,
  account,
  activateBrowserWallet,
  //status,
  //etherBalance,
  balanceOf,
  artinuPriceInEth,
  artinuLoading,
  artinuTotalLiquidity,
}) => {
  const size = useWindowSize();

  const etherValue =
  balanceOf && Web3.utils.fromWei(balanceOf.toString(), "gwei");
  const etherValueRound = Math.round(Number(etherValue)).toLocaleString();
  console.log(etherValueRound);

  const circulatingSupply = 650000000

  if (account && etherValueRound) {
    return (
      <>
        {/* <div>
        Dai price:{' '}
        {daiLoading
          ? 'Loading token data...'
          : '$' +
            // parse responses as floats and fix to 2 decimals
            (parseFloat(daiPriceInEth)) * 2300 }
      </div> */}
        <div className="flex flex-wrap justify-between lg:mx-8 mx-2">
          <div className="lg:mb-0">
            <h1 className="text-xl font-semibold">${artinuPriceInEth}</h1>
            <p className="text-gray-500">Current price</p>
          </div>
          <div className="lg:mb-0 mb-2">
            <h1 className="text-xl font-semibold">{circulatingSupply.toLocaleString()}</h1>
            <p className="text-gray-500">Circulating supply</p>
          </div>
          <div className="lg:mb-0 mb-2">
            <h1 className="text-xl font-semibold">${(circulatingSupply * artinuPriceInEth).toLocaleString()}</h1>
            <p className="text-gray-500">Current mcap</p>
          </div>
          
        </div>
      </>
    );

    return <p>loading...</p>;
  }

  if (!account) {
    return (
      <>
        <div className="mx-auto text-center">
        <img className="mb-8 mx-auto" src={artinuLogo} alt="Logo" />
        <h2 className="text-xl font-semibold">Welcome to Art Inu</h2>
        <p className="text-gray-500 mb-8">Unlock your wallet to access the platform</p>
        <div className="mt-2 mb-2">
          <Button
            onClick={() => {
              activateBrowserWallet();
            }}
          >
            Unlock wallet
          </Button>
        </div>
        </div>
       
      </>
    );
  }

  return null;
};

export default Card;
