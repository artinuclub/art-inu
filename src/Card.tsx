import React from "react";

interface Props {
  account: string | null | undefined;
}

// @ts-ignore
const Card = ({ account, activateBrowserWallet, whitelist, buy }) => {
  if (!account) {
    return (
      <>
        <h1 className="text-xl mb-2">Welcome to the presale</h1>
        <p className="text-gray-500">
          Only whitelisted address will be able to join, make sure you’re
          connected on the right account
        </p>
        <div className="mt-6">
          <button
            className="bg-black rounded-3xl text-white active:bg-pink-600 font-bold uppercase text-sm px-8 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 "
            onClick={() => {
              activateBrowserWallet();
            }}
          >
            Unlock wallet
          </button>
        </div>
      </>
    );
  }

  if (account && whitelist) {
    return (
      <>
        <h1 className="text-xl mb-2">Your allocation: 0.66 BNB</h1>
        <p className="text-gray-500">You will get 1,000,000 Tokens</p>
        <div className="mt-6">
          <button
            className="bg-black rounded-3xl text-white active:bg-pink-600 font-bold uppercase text-sm px-8 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 "
            onClick={buy}
          >
            Purchase for 0.66 BNB
          </button>
        </div>
      </>
    );
  }

  if (account && !whitelist) {
    return (
      <>
        <h1 className="text-xl mb-2">Your address is not whitelisted</h1>
        <p className="text-gray-500">
          Only whitelisted address can participate in the presale
        </p>
        <div className="mt-6">
          <button
            className="bg-black rounded-3xl text-white active:bg-pink-600 font-bold uppercase text-sm px-8 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 "
            onClick={() => {
              const url = "https://t.me/artinu_club";

              const win = window.open(url, "_blank");
              win?.focus();
            }}
          >
            Open Telegram
          </button>
        </div>
      </>
    );
  }

  if (false) {
    return (
      <>
        <h1 className="text-xl mb-2">Congratulations</h1>
        <p className="text-gray-500">
          1,000,000 ARTINU has been sent to your wallet
        </p>
      </>
    );
  }
};

export default Card;
