import { useEthers, useContractCall } from "@usedapp/core";
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
  const abi = new Interface(contract_abi);
  const { account } = useEthers();

  const balanceOfArtinu = useContractCall({
    abi,
    address: TOKEN_CONTRACT,
    method: "balanceOf",
    args: [account],
  });

  //todo: all fetch api call and passed props

  const balanceArtinu =
    balanceOfArtinu && Web3.utils.fromWei(balanceOfArtinu.toString(), "gwei");

  const balanceArtinuFinal = Math.round(Number(balanceArtinu));

  return (
    <div className="flex flex-wrap max-w-7xl mx-auto">
      <PortfolioData balanceArtinuFinal={balanceArtinuFinal} />
      <PortfolioList selectedAccount={selectedAccount} account={account} />
      <SideTransaction />
    </div>
  );
};

export default Portfolio;
