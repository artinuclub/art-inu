import { useEthers, useContractCall } from "@usedapp/core";
import { Interface } from "ethers/lib/utils";
import contract from "../contract";

const STAKING_CONTRACT = "0x7d0D9783260b62dAFb2e6170e23AE9e35AE4edDA";

const UnlockWallet = () => {
  const { activateBrowserWallet, account, error, ...props } = useEthers();
  console.log("error", error);
  console.log("props", props);
  const abi = new Interface(contract);
  const whitelist = useContractCall({
    abi,
    address: STAKING_CONTRACT,
    method: "whitelist",
    args: [account],
  });

  console.log("whitelist", whitelist);

  return (
    <div>
      <div>
        <button
          onClick={() => {
            activateBrowserWallet();
          }}
        >
          Connect
        </button>
      </div>
      {account && <p>Account: {account}</p>}
      {whitelist ? "on whitelist" : "not on whitelist"}
    </div>
  );
};

export default UnlockWallet;
