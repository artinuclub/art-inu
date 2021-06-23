import "./index.css";
import "./App.css";
import { useEthers, useContractCall } from "@usedapp/core";
import { Interface } from "ethers/lib/utils";
import contract from "./contract";

const STAKING_CONTRACT = "0x7d0D9783260b62dAFb2e6170e23AE9e35AE4edDA";
const BUY_AMOUNT = 10;

function App() {
  const { activateBrowserWallet, account, error, ...props } = useEthers();
  const abi = new Interface(contract);

  const whitelist = useContractCall({
    abi,
    address: STAKING_CONTRACT,
    method: "whitelist",
    args: [account],
  });
  // const buyTokens = useContractCall({
  //   abi,
  //   address: STAKING_CONTRACT,
  //   method: "buyTokens",
  //   args: [],
  // });

  // console.log("buyTokens", buyTokens);

  return (
    <div className="bg-green-100 min-h-screen">
      <div className="pt-32 flex justify-center flex-col items-center">
        {error && (
          <p className="text-red-500 w-96 text-center font-bold mb-2">
            {String(error)}
          </p>
        )}
        <div className="bg-white w-96 rounded-lg border-solid text-center py-8 px-8">
          {!whitelist ? (
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
          ) : (
            <>
              <h1 className="text-xl mb-2">Congratulations!</h1>
              <p className="text-gray-500">
                You're whitelisted, you can buy $INU
              </p>
              <div className="mt-6">
                <button
                  className="bg-black rounded-3xl text-white active:bg-pink-600 font-bold uppercase text-sm px-8 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 "
                  onClick={() => {
                    activateBrowserWallet();
                  }}
                >
                  Buy
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
