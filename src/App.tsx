import "./index.css";
import "./App.css";
import { useEthers, useContractCall, useContractFunction } from "@usedapp/core";
import { Interface, parseEther } from "ethers/lib/utils";
import { Contract } from "ethers";
import contract_abi from "./contract";
import Card from "./Card";

const STAKING_CONTRACT = "0x7d0D9783260b62dAFb2e6170e23AE9e35AE4edDA";
const BUY_AMOUNT = 10;

function App() {
  const { activateBrowserWallet, account, error, ...props } = useEthers();
  const abi = new Interface(contract_abi);
  const contract = new Contract(STAKING_CONTRACT, abi);
  const { state, send } = useContractFunction(contract, "buyTokens");

  const whitelist = useContractCall({
    abi,
    address: STAKING_CONTRACT,
    method: "whitelist",
    // method: "whitelistedAddress",
    args: [account],
  });

  const buy = () => {
    const etherAmount = "0.1";
    const value = parseEther(etherAmount);
    console.log("value", value);

    send(value._hex);
  };

  console.log("state", state);

  return (
    <div className="bg-green-100 min-h-screen">
      <div className="pt-32 flex justify-center flex-col items-center">
        {error && (
          <p className="text-red-500 w-96 text-center font-bold mb-2">
            {String(error)}
          </p>
        )}
        <div className="bg-white w-96 rounded-lg border-solid text-center py-8 px-8">
          {/* @ts-ignore */}
          <Card
            account={account}
            activateBrowserWallet={activateBrowserWallet}
            whitelist={whitelist}
            buy={buy}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
