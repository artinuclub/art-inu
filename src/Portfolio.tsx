import { useEthers, useContractCall } from "@usedapp/core";
import { useState, useEffect } from "react";
import { Interface } from "ethers/lib/utils";
import PortfolioList from "./PortfolioList";
import PortfolioData from "./PortfolioData";
import SideTransaction from "./SideTransaction";
import Web3 from "web3";
import contract_abi from "./contract";

const TOKEN_CONTRACT = "0xc1FF84C5C6FcF7e6E60D6bf4C1209BC4254629ad";

interface Props {
  selectedAccount: any;
}

const Portfolio: React.FC<Props> = ({ selectedAccount }) => {
  const [listAssets, setAssets] = useState([]);
  const [listCollections, setCollections] = useState([]);
  const [listEvents, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const abi = new Interface(contract_abi);
  const { account } = useEthers();

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
      `https://api.opensea.io/api/v1/assets?owner=${
        selectedAccount && selectedAccount
      }&order_direction=asc&offset=0`,
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
          setAssets(result.assets);
        },
        // Remarque : il faut gérer les erreurs ici plutôt que dans
        // un bloc catch() afin que nous n’avalions pas les exceptions
        // dues à de véritables bugs dans les composants.
        (error) => {
          setIsLoaded(true);
          setError(error);
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
          setError(error);
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
          setError(error);
        }
      );
  }, [selectedAccount]);

  const balanceArtinu =
    balanceOfArtinu && Web3.utils.fromWei(balanceOfArtinu.toString(), "gwei");

  const balanceArtinuFinal = Math.round(Number(balanceArtinu));

  return (
    <div className="flex flex-wrap max-w-7xl mx-auto">
      <PortfolioData
        balanceArtinuFinal={balanceArtinuFinal}
        selectedAccount={selectedAccount}
        listAssets={listAssets}
        listCollections={listCollections}
        listEvents={listEvents}
        isLoaded={isLoaded}
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
