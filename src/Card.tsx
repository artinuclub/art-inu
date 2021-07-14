import React, { useState } from 'react';
import { useEthers, useContractCall, useContractFunction,useEtherBalance } from "@usedapp/core";
import { Interface, parseEther, formatEther } from "ethers/lib/utils";
import { useForm, Controller } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import Confetti from "react-confetti";
import useWindowSize from "./useWindowSize";
import artinuLogo from "./images/logo.svg"



interface Props {
  account: any;
  activateBrowserWallet: any;
  whitelist: any;
  buy: any;
  status?: string;
  etherBalance: any;
  whitelistedAmount: any;
}

const MIN_VALUE = "0.07";
const MAX_VALUE = "0.14";
const MAX_TOKEN = "0.00116666662"



const Card: React.FC<Props> = ({
  account,
  activateBrowserWallet,
  whitelist,
  buy,
  status,
  etherBalance,
  whitelistedAmount,
}) => {
  const size = useWindowSize();

  // if (MAX_TOKEN !== whitelistedAmount || status === "Success") {
  //   console.log(whitelistedAmount)
  //   return (
  //     <>
  //       <h1 className="text-xl mb-2">Congratulations!</h1>
  //       <p className="text-gray-500">You're part of the Artinu family</p>
  //       <Confetti
  //         width={size.width}
  //         height={size.height}
  //         tweenDuration={200}
  //         numberOfPieces={100}
  //       />
  //     </>
  //   );
  // }

  if (!account) {
    return (
      <>
        <div className="">
           <img className="mb-8" src={artinuLogo} alt="Logo" />
        </div>
        <h1 className="text-xl mb-2">Welcome to the presale</h1>
        <p className="text-gray-500">
          Only whitelisted address will be able to join, make sure you’re
          connected on the right account
        </p>
        <div className="mt-6">
          <Button
            onClick={() => {
              activateBrowserWallet();
            }}
          >
            Unlock wallet
          </Button>
        </div>
      </>
    );
  }

  if (account && whitelist && whitelist[0] === true) {
    return <SectionBuy buy={buy} status={status} etherBalance={etherBalance}/>;
  }

  if (account && whitelist && !whitelist[0]) {
    return (
      
      <>
        <h1 className="text-xl mb-2">Your address is not whitelisted</h1>
        <p className="text-gray-500">
          Only whitelisted address can participate in the presale
        </p>
        <div className="mt-6">
          <Button
            className="bg-black rounded-3xl text-white active:bg-pink-600 font-bold uppercase text-sm px-8 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 "
            onClick={() => {
              const url = "https://t.me/artinu_club";

              const win = window.open(url, "_blank");
              win?.focus();
            }}
          >
            Open Telegram
          </Button>
        </div>
      </>
    );
  }

  return null;
};


const AmountRaised = ({etherBalance} : {etherBalance:any}) => {
  const fullNumb = Number(etherBalance && formatEther(etherBalance))
  console.log(fullNumb)
  if(etherBalance){
  return(
    <div className="mb-12">
      <div className="bg-gray-100 mb-2">
      <div className="h-1 bg-black rounded-full bg-pink-400" style={{width:(fullNumb*50) + "px"}}></div>
      </div>
      <p className="float-left">{etherBalance && formatEther(etherBalance)} </p>
      <p className="float-right">50 ETH</p>
      <div className="bg-gray-100 h-px mt-12"></div>
    </div>
    
  )
  }else{
    return(
      <>
      <p>loading</p>
      </>
    )
  }
}


// @ts-ignore
const SectionBuy = ({ buy, status,etherBalance }) => {
  const { control, handleSubmit, setValue, reset } = useForm();
  const onSubmit = (data: any) => {
    if (!data) {
      return;
    }
    
    buy(data.amount);
    // reset(
    //   { amount: 0 },
    //   {
    //     keepValues: false,
    //   }
    // );
  };

  const [inputValue, setInputValue] = React.useState("0");

  const onChangeHandler = (event:any) => {
    setInputValue(event.target.value);
  };


  return (
    <>
      <AmountRaised etherBalance={etherBalance} />
      <h1 className="text-xl mb-2">Participate in the presale</h1>
      <p className="text-gray-500 mb-2">How much do you want to buy?</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <Controller
            name="amount"
            control={control}
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  type="number"
                  hasMax
                  min={MIN_VALUE}
                  max={MAX_VALUE}
                  step="0.001"
                  onChange={onChangeHandler}
                />
              );
            }}
          />
          <div className="text-sm mt-4 text-gray-500">You will receive ≈ {Number(inputValue)*8333333} tokens</div>
          <div className="mt-4">
            <Button type="submit" isLoading={status === "Mining"}>
              Buy tokens
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};




export default Card;
