import { useEthers, useContractCall } from "@usedapp/core";
import { useState, useEffect } from "react";
import { Interface } from "ethers/lib/utils";
import PortfolioList from "./PortfolioList";
import PortfolioData from "./PortfolioData";
import SideTransaction from "./SideTransaction";
import Web3 from "web3";
import contract_abi from "./contract";
import Button from "./Button";
import artinuLogo from "./images/logo.svg";

const TOKEN_CONTRACT = "0xc1FF84C5C6FcF7e6E60D6bf4C1209BC4254629ad";

interface Props {
  selectedAccount: any;
}

const Portfolio: React.FC<Props> = ({ selectedAccount }) => {
  const [listAssets, setAssets] = useState([]);
  const [listCollections, setCollections] = useState([]);
  const [listEvents, setEvents] = useState([]);
  const [errorFetch, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadedAssets, setIsLoadedAssets] = useState(false);
  const [ethPrice, setEthPrice] = useState("");

  const abi = new Interface(contract_abi);
  const { activateBrowserWallet, account, active, error } = useEthers();

  const balanceOfArtinu = useContractCall({
    abi,
    address: TOKEN_CONTRACT,
    method: "balanceOf",
    args: [account],
  });

  useEffect(() => {
    if (!selectedAccount) {
      return;
    }
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD`,
      {}
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setEthPrice(result.ethereum.usd);
        },
        // Remarque : il faut gérer les erreurs ici plutôt que dans
        // un bloc catch() afin que nous n’avalions pas les exceptions
        // dues à de véritables bugs dans les composants.
        (error) => {
          setIsLoaded(true);
          setError(errorFetch);
        }
      );
    fetch(
      `https://api.opensea.io/api/v1/assets?owner=${
        selectedAccount && selectedAccount
      }&order_direction=desc&offset=0`,
      {
        headers: {
          "X-API-KEY": "66aa3ceafbc64adfafcf84384b301b06",
        },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoadedAssets(true);
          setAssets(result.assets);
        },
        // Remarque : il faut gérer les erreurs ici plutôt que dans
        // un bloc catch() afin que nous n’avalions pas les exceptions
        // dues à de véritables bugs dans les composants.
        (error) => {
          setIsLoadedAssets(true);
          setError(errorFetch);
        }
      );
    fetch(
      `https://api.opensea.io/api/v1/collections?asset_owner=${
        selectedAccount && selectedAccount
      }&offset=0`,
      {
        headers: {
          "X-API-KEY": "66aa3ceafbc64adfafcf84384b301b06",
        },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCollections(result);
        },
        // Remarque : il faut gérer les erreurs ici plutôt que dans
        // un bloc catch() afin que nous n’avalions pas les exceptions
        // dues à de véritables bugs dans les composants.
        (error) => {
          setIsLoaded(true);
          setError(errorFetch);
        }
      );
    fetch(
      `https://api.opensea.io/api/v1/events?account_address=${
        selectedAccount && selectedAccount
      }&offset=0&limit=200`,
      {
        headers: {
          "X-API-KEY": "66aa3ceafbc64adfafcf84384b301b06",
        },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setEvents(result.asset_events);
        },
        // Remarque : il faut gérer les erreurs ici plutôt que dans
        // un bloc catch() afin que nous n’avalions pas les exceptions
        // dues à de véritables bugs dans les composants.
        (error) => {
          setIsLoaded(true);
          setError(errorFetch);
        }
      );
  }, [selectedAccount]);

  const balanceArtinu =
    balanceOfArtinu && Web3.utils.fromWei(balanceOfArtinu.toString(), "gwei");

  const balanceArtinuFinal = Math.round(Number(balanceArtinu));

  if (
    selectedAccount !== "0xC8605C3e0E670C1419147F6B9885335aF5Ed0E33" &&
    !account
  ) {
    return (
      <>
        {error && (
          <p className="text-red-500 text-center font-bold mb-2">
            An error has occured. Please check that you are connected to the
            Ethereum network and try unlocking again.
          </p>
        )}
        <div className="mx-auto text-center">
          <img className="mb-8 mx-auto" src={artinuLogo} alt="Logo" />
          <h2 className="text-xl text-white font-semibold">
            Welcome to Art Inu
          </h2>
          <p className="text-gray-400 mb-8">
            Unlock your wallet to access the platform
          </p>
          <div className="mt-2 mb-2 w-1/5 mx-auto">
            <Button
              onClick={() => {
                activateBrowserWallet();
              }}
            >
              Unlock wallet
            </Button>
          </div>
        </div>
      </>
    );
  }

  if (isLoadedAssets && listAssets.length === 0) {
    return (
      <>
        <div className="mx-auto text-center">
          <img className="mb-8 mx-auto" src={artinuLogo} alt="Logo" />
          <h2 className="text-xl text-white font-semibold">
            Your portfolio is empty
          </h2>
          <p className="text-gray-400 mb-8">
            Buy your first NFT on Opensea to display your portfolio
          </p>
          <div className="mt-2 mb-2 w-1/5 mx-auto"></div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-wrap max-w-7xl mx-auto">
      <PortfolioData
        balanceArtinuFinal={balanceArtinuFinal}
        selectedAccount={selectedAccount}
        listAssets={listAssets}
        listCollections={listCollections}
        listEvents={listEvents}
        isLoaded={isLoaded}
        ethPrice={ethPrice}
        account={account}
      />
      <PortfolioList
        selectedAccount={selectedAccount}
        account={account}
        listAssets={listAssets}
        listCollections={listCollections}
        isLoaded={isLoaded}
      />
      <SideTransaction
        listEvents={listEvents}
        selectedAccount={selectedAccount}
        isLoaded={isLoaded}
      />
    </div>
  );
};

export default Portfolio;
