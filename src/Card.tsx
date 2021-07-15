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
}

const MIN_VALUE = "0.08";
const MAX_VALUE = "0.4";
const MAX_TOKEN = "0.0028"





const Card: React.FC<Props> = ({
  isLoading,
  account,
  activateBrowserWallet,
  whitelist,
  buy,
  status,
  etherBalance,
  whitelistedAmount,
}) => {
  const size = useWindowSize();

  const fullNumb = Number(etherBalance && formatEther(etherBalance))
  
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

  if (account && whitelist && whitelist[0] === true &&  MAX_TOKEN !== whitelistedAmount || status === "Success") {
    console.log(whitelistedAmount)
    return (
      <>
        <img className="mb-8 mx-auto" src={artinuLogo} alt="Logo" />
        <h1 className="text-xl mb-2 font-semibold">Congratulations!</h1>
        <p className="text-gray-500">You're part of the Artinu family</p>
        <div className="bg-gray-100 h-px mt-12"></div>
        <p className="mt-8 font-semibold">Add ARTINU to Metamask</p>
        <p className="text-gray-500 mb-4 mt-2">
          0xfc1022995e5643bfc6669947f69151911fb5aec3
        </p>
        <Button
          onClick={() =>
            navigator.clipboard.writeText(
              "0xfc1022995e5643bfc6669947f69151911fb5aec3"
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
        <h1 className="text-xl mb-2 font-semibold">Welcome to the Art Inu presale</h1>
        <p className="text-gray-500 mb-8">
          Only whitelisted addresses will be able to join, make sure you’re
          connected on the right account
        </p>
        <Countdown className="bg-gray-100 px-4 py-2 rounded-full"
          date='2021-07-16T01:02:03' 
          zeroPadTime={2}
        />
        <div className="bg-gray-100 h-px mt-12"></div>
        <p className="mt-8 font-semibold">Important</p>
        <p className="text-gray-500 mb-4 mt-2">- Listing will happen between 24 and 48 hours after the presale ends to hype the launch<br/>- Tokens will instantly be sent to your wallet</p>
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
    return <SectionBuy buy={buy} status={status} etherBalance={etherBalance} />;
  }

  if (account && whitelist && !whitelist[0]) {
    return (
      <>
        <h1 className="text-xl mb-2 font-semibold">
          Your address is not whitelisted
        </h1>
        <p className="text-gray-500">
          Only whitelisted addresses can participate in the presale
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
        <p className="float-left">
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
      <p className="text-gray-500 mb-6">Min. 0.08 / Max. 0.40 ETH</p>
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
            You will receive ≈ {amountValue ? Number(amountValue) * 8333333 : 0}{" "}
            tokens
          </div>
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
