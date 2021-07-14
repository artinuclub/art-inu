import "./index.css";
import "./App.css";
import { useEthers, useContractCall, useContractFunction,useEtherBalance } from "@usedapp/core";
import { Interface, parseEther, formatEther } from "ethers/lib/utils";
import { Contract } from "ethers";
import contract_abi from "./contract";
import Card from "./Card";

const STAKING_CONTRACT = "0xfc1022995e5643bfc6669947f69151911fb5aec3";

function App() {
  const { activateBrowserWallet, account, error } = useEthers();
  const abi = new Interface(contract_abi);
  const contract = new Contract(STAKING_CONTRACT, abi);
  const { state, send } = useContractFunction(contract, "buyTokens");
  const etherBalance = useEtherBalance(STAKING_CONTRACT);

  const whitelist = useContractCall({
    abi,
    address: STAKING_CONTRACT,
    method: "whitelistedAddress",
    args: [account],
  });

  const whitelistedAmount = useContractCall({
    abi,
    address: STAKING_CONTRACT,
    method: "whitelistedAmount",
    args: [account],
  });

  const buy = (data: string) => {
    const value = parseEther(data);

    send({ value });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      
      <div className="pt-32 flex justify-center flex-col items-center">
        {error && (
          <p className="text-red-500 w-96 text-center font-bold mb-2">
            {String(error)}
          </p>
        )}
        <div className="bg-white w-3/12 rounded-lg border border-gray-200  shadow-xl text-center py-12 px-12">
          <Card
            account={account}
            etherBalance={etherBalance}
            activateBrowserWallet={activateBrowserWallet}
            whitelist={whitelist}
            buy={buy}
            status={state?.status}
            whitelistedAmount={
              whitelistedAmount && formatEther(whitelistedAmount[0]._hex)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default App;
