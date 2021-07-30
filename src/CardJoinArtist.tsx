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
}

const MIN_VALUE = "0.04";
const MAX_VALUE = "0.4";
const MAX_TOKEN = 2800000000000000;



const Card: React.FC<Props> = ({
  balanceOf
}) => {
  const size = useWindowSize();
  const etherValue =
  balanceOf && Web3.utils.fromWei(balanceOf.toString(), "gwei");
  const etherValueRound = Math.round(Number(etherValue)).toLocaleString();

  return (
    <>
      <div className="">
      <img className="mb-8 mx-auto" src={artinuLogo} alt="Logo" />
        <h2 className="text-xl font-semibold">You're an NFT artist and want to earn money?</h2>
        <p className="text-gray-500">Submit your profile and start earning rewards</p>
        <div className="mt-8">
        <span className="opacity-20"><Button>
            Submit my profile (SOON)
          </Button></span>
        </div>
      </div>
    </>
  );

  return <p>loading...</p>;
};

export default Card;
