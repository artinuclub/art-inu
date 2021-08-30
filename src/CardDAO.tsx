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
}

const MIN_VALUE = "0.04";
const MAX_VALUE = "0.4";
const MAX_TOKEN = 2800000000000000;

const CardDAO: React.FC<Props> = ({ balanceOf }) => {
  const size = useWindowSize();
  const etherValue =
    balanceOf && Web3.utils.fromWei(balanceOf.toString(), "gwei");
  const etherValueRound = Math.round(Number(etherValue)).toLocaleString();

  return (
    <div className="relative">
      <img className="mb-8 mx-auto" src={artinuLogo} alt="Logo" />
      {/* <div className="py-2 px-4 inline-block rounded-full mb-6 absolute top-0 left-0"><p className="text-green-500 text-sm font-semibold">1 active proposal</p></div> */}
      <div className="">
        <p className="font-semibold text-sm text-artinuMain mb-1">ARTINU DAO</p>
        <h2 className="text-xl text-white font-semibold">
          Vote or submit a proposal
        </h2>
        <p className="text-gray-400 mt-2">
          Use your ARTINU to participate in the decisions
        </p>
        <div className="mt-8">
          <a href="https://snapshot.org/#/artinu.eth" target="_blank">
            <Button>Vote on Snapshot</Button>
          </a>
        </div>
      </div>
    </div>
  );

  return <p>loading...</p>;
};

export default CardDAO;
