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
  balanceOf: any;
  artinuPriceInEth: any;
}

const MIN_VALUE = "0.04";
const MAX_VALUE = "0.4";
const MAX_TOKEN = 2800000000000000;

const Card: React.FC<Props> = ({ balanceOf, artinuPriceInEth }) => {
  const size = useWindowSize();
  const etherValue =
    balanceOf && Web3.utils.fromWei(balanceOf.toString(), "gwei");
  const etherValueRound = Math.round(Number(etherValue)).toLocaleString();

  return (
    <>
      <div className="">
        <span className="text-3xl">👩‍🎤</span>
        <h1 className="text-base mb-2 font-semibold text-gray-400 mt-2">
          Artists wallet
        </h1>
        <h2 className="text-3xl text-white">{etherValueRound} ARTINU</h2>
        <p className="text-gray-400">
          ≈ ${Math.round(artinuPriceInEth * etherValue).toLocaleString()}
        </p>
        <div className="mt-4">
          <Button
            onClick={() =>
              navigator.clipboard.writeText(
                "0x853c64EdD278B9C30E8abf5F8cf42aeF64C3796D"
              )
            }
          >
            Copy address to donate
          </Button>
        </div>
      </div>
    </>
  );

  return <p>loading...</p>;
};

export default Card;
