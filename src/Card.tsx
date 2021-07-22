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
import artinuLogo from "./images/logo.svg"
import Countdown from 'react-countdown';



interface Props {
  isLoading: boolean;
  account: any;
  activateBrowserWallet: any;
  whitelist: any;
  buy: any;
  status?: string;
  etherBalance: any;
  whitelistedAmount: any;
  balanceOf: any;
}

const MIN_VALUE = "0.04";
const MAX_VALUE = "0.4";
const MAX_TOKEN = 2800000000000000




const Card: React.FC<Props> = ({
  isLoading,
  account,
  activateBrowserWallet,
  whitelist,
  buy,
  status,
  etherBalance,
  whitelistedAmount,
  balanceOf,
}) => {
  const size = useWindowSize();

  const fullNumb = Number(etherBalance && formatEther(etherBalance))
  const balanceNumber = Number(balanceOf)
 
  console.log(balanceNumber)
  
  if(etherBalance && fullNumb >=50){
    return (
      
      <>
        <h1 className="text-xl mb-2 font-semibold">The presale is over!</h1>
        <p className="text-gray-500">
          The presale is now over, join our Telegram if you have any question!
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

  if (status === "Success" || balanceNumber >= MAX_TOKEN) {

    return (
      <>
        <img className="mb-8 mx-auto" src={artinuLogo} alt="Logo" />
        <h1 className="text-xl mb-2 font-semibold">Congratulations!</h1>
        <p className="text-gray-500">You're part of the Artinu family</p>
        <div className="bg-gray-100 h-px mt-12"></div>
        <p className="mt-8 font-semibold">Add ARTINU to Metamask</p>
        <p className="text-gray-500 mb-4 mt-2 text-xs text-center">0x48Df9e374600b6966c5A290350Be4F9b119Dd084</p>
        <Button
          onClick={() =>
            navigator.clipboard.writeText(
              "0x48Df9e374600b6966c5A290350Be4F9b119Dd084"
            )
          }
        >
          Copy to clipboard
        </Button>
        <Confetti
          width={size.width}
          height={size.height}
          tweenDuration={200}
          numberOfPieces={100}
        />
      </>
    );
  }

  if (!account) {
    return (
      <>
        <div className="">
          <img className="mb-8 mx-auto" src={artinuLogo} alt="Logo" />
        </div>
        {/* <Countdown className="bg-gray-100 px-4 py-2 rounded-full"
          date='2021-07-20T22:00:00' 
          zeroPadTime={2}
        /> */}
        <h1 className="text-xl mb-2 font-semibold mt-8">Welcome to the Art Inu presale</h1>
        <p className="text-gray-500 mb-8">
          The presale is now open to everyone
        </p>
        <div className="flex flex-wrap justify-center">
          <div className="mb-8 px-8">
            <p className="text-xl">20 ETH</p>
            <p className="text-sm text-gray-400">Softcap</p>
          </div>
          <div className="h-14 w-0.5 bg-gray-100"></div>
          <div className="mb-8 px-8">
            <p className="text-xl">50 ETH</p>
            <p className="text-sm text-gray-400">Hardcap</p>
          </div>
        </div>
        <div className="mt-2 mb-2">
          <Button
            onClick={() => {
              activateBrowserWallet();
            }}
          >
            Unlock wallet
          </Button>
        </div>
        <div className="bg-gray-100 h-px mt-8"></div>
        <p className="mt-8 font-semibold">Important</p>
        <p className="text-gray-500 mb-4 mt-2">- Listing will happen between 24 and 48 hours after the presale ends to hype the launch<br/>- Tokens will instantly be sent to your wallet<br/>- If the softcap is not reached you will get a refund</p>
      </>
    );
  }

  if (account && whitelist && !whitelist[0]) {
    return <SectionBuy buy={buy} status={status} etherBalance={etherBalance}/>;
  }

  // if (account && whitelist && !whitelist[0]) {
  //   return (
  //     <>
  //       <h1 className="text-xl mb-2 font-semibold">
  //         Your address is not whitelisted
  //       </h1>
  //       <p className="text-gray-500">
  //         Only whitelisted addresses can participate in the presale
  //       </p>
  //       <div className="mt-6">
  //         <Button
  //           className="bg-black rounded-3xl text-white active:bg-pink-600 font-bold uppercase text-sm px-8 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 "
  //           onClick={() => {
  //             const url = "https://t.me/artinu_club";

  //             const win = window.open(url, "_blank");
  //             win?.focus();
  //           }}
  //         >
  //           Open Telegram
  //         </Button>
  //       </div>
  //     </>
  //   );
  // }

  return <p>loading...</p>;
};

const AmountRaised = ({ etherBalance }: { etherBalance: any }) => {
  const fullNumb = Number(etherBalance && formatEther(etherBalance));

  if (!etherBalance) {
    return <p>loading...</p>;
  }

  if (etherBalance) {
    return (
      <div className="mb-12">
        <div className="bg-gray-100 mb-2">
          <div
            className="h-1 bg-black rounded-full bg-pink-400"
            style={{ width: (fullNumb * 100) / 50 + "%" }}
          ></div>
        </div>
        <p className="float-left font-semibold">
          {etherBalance && formatEther(etherBalance)} ETH
        </p>
        <p className="float-right">50 ETH</p>
        <div className="bg-gray-100 h-px mt-12"></div>
      </div>
    );
  }

  return null;
};

// @ts-ignore
const SectionBuy = ({ buy, status, etherBalance }) => {
  const { control, handleSubmit, reset, watch } = useForm();
  const amountValue = watch("amount");

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

  return (
    <>
      <AmountRaised etherBalance={etherBalance} />
      <h1 className="text-xl mb-2 font-semibold">How much do you want to buy?</h1>
      <p className="text-gray-500 mb-6">Min. 0.04 / Max. 0.40 ETH</p>
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
                  placeholder="0.00"
                />
              );
            }}
          />
          <div className="text-sm mt-4 text-gray-500">
            You will receive ≈ {amountValue ? Number(amountValue) * 7000000 : 0}{" "}
            tokens
          </div>
          <div className="mt-4">
            <Button type="submit" isLoading={status === "Mining"}>
              Buy tokens
            </Button>
          </div>
        </div>
      </form>
      <div className="bg-gray-100 h-px mt-8"></div>
        <p className="mt-8 font-semibold">Important</p>
        <p className="text-gray-500 mb-4 mt-2">- Check <a className="font-semibold" href="https://artinu.club/presale" target="_blank">artinu.club/presale</a> to learn more  <br/>about the presale<br/>- Tokens will instantly be sent to your wallet<br/>- If the softcap is not reached you will get a refund</p>
    </>
  );
};

export default Card;

