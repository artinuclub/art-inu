import "./index.css";
import "./App.css";
import {
  useEthers,
  useContractCall,
  useContractFunction,
  useEtherBalance,
} from "@usedapp/core";
import { Interface, parseEther, formatEther } from "ethers/lib/utils";
import { Contract } from "ethers";
import contract_abi from "./contract";
import Card from "./Card";
import Header from "./Header";

const STAKING_CONTRACT = "0xbcaa995c32d6c5ce39ad2d6ff5fc96bf1d488509";
const TOKEN_CONTRACT = "0x48Df9e374600b6966c5A290350Be4F9b119Dd084";

function App() {
  const { activateBrowserWallet, account, active, error } = useEthers();

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

  const balanceOf = useContractCall({
    abi,
    address: TOKEN_CONTRACT,
    method: "balanceOf",
    args: [account],
  });



  // const onlyWhitelist = useContractCall({
  //   abi,
  //   address: STAKING_CONTRACT,
  //   method: "onlyWhitelisted",
  //   args: [],
  // });

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
    <div className="bg-hero-pattern bg-cover bg-opacity-60 min-h-screen">
      <Header account={account} />
      <div className="clear-both pt-16 max-w-lg mx-auto">
        {error && (
          <p className="text-red-500 text-center font-bold mb-2">
            An error has occured. Please check that you are connected to the Ethereum network and try unlocking again.
          </p>
        )}
        <div className="mx-2">
        <div className="bg-white p-8 w-full max-w-lg rounded-lg border border-gray-200  shadow-xl text-center py-12">
          <Card
            isLoading={!active}
            account={account}
            etherBalance={etherBalance}
            activateBrowserWallet={activateBrowserWallet}
            whitelist={whitelist}
            buy={buy}
            status={state?.status}
            balanceOf={balanceOf}
            whitelistedAmount={
              whitelistedAmount && formatEther(whitelistedAmount[0]._hex)
            }
          />
        </div>
        </div>
      </div>
    </div>
  );
}

// - Régler le problème du onchange qui empêche de submit et de buy
// - Actuellement lorsqu'on actualise la page on voit tous les états de la card apparaître avant que ça s'arrête sur le bon, ça fait vraiment buggy
// - Si je suis pas sur le bon network j'ai plus d'erreur et je vois tj les infos et je suis sur l'écran "congrats"

export default App;
