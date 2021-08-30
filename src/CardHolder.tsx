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
  balanceOf:any,
  artinuPriceInEth:any,
  balanceArtinuFinal:any,
}

const MIN_VALUE = "0.04";
const MAX_VALUE = "0.4";
const MAX_TOKEN = 2800000000000000;



const CardHolder: React.FC<Props> = ({
  balanceOf,
  artinuPriceInEth,
  balanceArtinuFinal,
}) => {
  const size = useWindowSize();
  const etherValue =
  balanceOf && Web3.utils.fromWei(balanceOf.toString(), "gwei");
  const etherValueRound = Math.round(Number(etherValue)).toLocaleString();

  const artinuPercent = (Number(balanceArtinuFinal) * 100) / 650000000

  return (
    <>
      <div className="">
        <span className="text-3xl">💰</span>
        <h1 className="text-base mb-2 font-semibold text-gray-500 mt-2">You own</h1>
        <h2 className="text-3xl text-white">{(balanceArtinuFinal && balanceArtinuFinal).toLocaleString()} ARTINU</h2>
        <p className="text-gray-500">That's <span className="font-semibold">{artinuPercent.toFixed(2)}%</span> of the supply, that's worth <span className="font-semibold">${Math.round(artinuPriceInEth * balanceArtinuFinal).toLocaleString()}</span></p>
        
        <div className="mt-4">
        <a href="https://app.uniswap.org/#/swap?outputCurrency=0xc1FF84C5C6FcF7e6E60D6bf4C1209BC4254629ad&use=V2" target="_blank"><Button>
            Buy ARTINU
          </Button></a>
        </div>
      </div>
    </>
  );

  return <p>loading...</p>;
};

export default CardHolder;
