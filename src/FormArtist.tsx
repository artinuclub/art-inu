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
import contract_abi from "./contract";
import Web3 from "web3";

const TOKEN_CONTRACT = "0xc1FF84C5C6FcF7e6E60D6bf4C1209BC4254629ad";

interface Props {
  balanceOf: any;
  account: any;
}

const MIN_VALUE = "0.04";
const MAX_VALUE = "0.4";
const MAX_TOKEN = 2800000000000000;

const FormArtist: React.FC<Props> = ({ balanceOf, account }) => {
  const size = useWindowSize();

  const etherUserBalance = useEtherBalance(account);
  const abi = new Interface(contract_abi);

  const balanceOfArtinu = useContractCall({
    abi,
    address: TOKEN_CONTRACT,
    method: "balanceOf",
    args: [account],
  });

  const balanceArtinu =
    balanceOfArtinu && Web3.utils.fromWei(balanceOfArtinu.toString(), "gwei");
  const balanceArtinuFinal = Math.round(Number(balanceArtinu)).toLocaleString();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {}; // your form submit function which will invoke after successful validation

  return (
    <div>
      <h2 className="text-xl font-semibold">
        You're an NFT artist and want to earn money?
      </h2>
      <p className="text-gray-500 mb-8">
        Submit your profile and start earning rewards
      </p>
      <div>
        <p>
          You have{" "}
          <span className="text-artinuMain font-semibold">
            {balanceArtinuFinal} ARTINU
          </span>{" "}
          in your wallet
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <Input type="Name" placeholder="Name" />

        <Input type="Name" placeholder="Link to NFT profile" />

        <Button type="submit">Buy tokens</Button>
      </form>
    </div>
  );
};

export default FormArtist;
