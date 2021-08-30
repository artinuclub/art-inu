import artinuLogoHeader from "./images/logoHeader.svg";
import { useEthers, useContractCall, useEtherBalance } from "@usedapp/core";
import { Interface, formatEther } from "ethers/lib/utils";
import contract_abi from "./contract";
import Web3 from "web3";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import menuHome from "./images/home.svg";
import menuDashboard from "./images/trending-up.svg";
import menuPortfolio from "./images/user.svg";
import menuLaunchpad from "./images/codepen.svg";

const TOKEN_CONTRACT = "0xc1FF84C5C6FcF7e6E60D6bf4C1209BC4254629ad";
const ARTIST_WALLET = "0x853c64EdD278B9C30E8abf5F8cf42aeF64C3796D";

function Header(props: any) {
  const { activateBrowserWallet, account, active, error } = useEthers();
  const etherUserBalance = useEtherBalance(props.account);
  const abi = new Interface(contract_abi);

  const balanceOfArtinu = useContractCall({
    abi,
    address: TOKEN_CONTRACT,
    method: "balanceOf",
    args: [props.account],
  });

  const balanceArtinu =
    balanceOfArtinu && Web3.utils.fromWei(balanceOfArtinu.toString(), "gwei");
  const balanceArtinuFinal = Math.round(Number(balanceArtinu)).toLocaleString();

  return (
    <div className=" mx-auto px-4 pt-8 pb-8 mb-12  text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between">
          <div className="text-white flex items-center hidden sm:flex">
            <a href="https://www.artinu.club" target="_blank" className="block">
              <img className="float-left" src={artinuLogoHeader} alt="Logo" />
            </a>
            <NavLink exact activeClassName="active" className="mx-4" to="/">
              Portfolio
            </NavLink>
            <NavLink
              exact
              activeClassName="active"
              className="mx-4"
              to="/dashboard"
            >
              Dashboard
            </NavLink>
            <NavLink
              exact
              activeClassName="active"
              className="mx-4"
              to="/myportfolio"
            >
              My portfolio
            </NavLink>
            <NavLink
              exact
              activeClassName="active"
              className="mx-4"
              to="/launchpad"
            >
              Launchpad
            </NavLink>
          </div>

          {/* Menu mobile */}
          <div className="bg-gray-900 border-t-1 border-gray-400 w-full h-92 fixed bottom-0 left-0 flex items-center block sm:hidden py-4">
            <div className="w-1/4 text-center">
              <img className="mx-auto" src={menuHome} alt="Logo" width="24px" />
              <NavLink
                exact
                activeClassName="active"
                className="mx-4 text-xxs"
                to="/"
              >
                Portfolio
              </NavLink>
            </div>
            <div className="w-1/4 text-center">
              <img
                className="mx-auto"
                src={menuDashboard}
                alt="Logo"
                width="24px"
              />
              <NavLink
                exact
                activeClassName="active"
                className="mx-4 text-xxs"
                to="/dashboard"
              >
                Dashboard
              </NavLink>
            </div>
            <div className="w-1/4 text-center">
              <img
                className="mx-auto"
                src={menuPortfolio}
                alt="Logo"
                width="24px"
              />
              <NavLink
                exact
                activeClassName="active"
                className="mx-4 text-xxs"
                to="/myportfolio"
              >
                My portfolio
              </NavLink>
            </div>
            <div className="w-1/4 text-center">
              <img
                className="mx-auto"
                src={menuLaunchpad}
                alt="Logo"
                width="24px"
              />
              <NavLink
                exact
                activeClassName="active"
                className="mx-4 text-xxs"
                to="/launchpad"
              >
                Launchpad
              </NavLink>
            </div>
          </div>

          <div className="flex">
            {etherUserBalance && (
              <div className=" bg-gray-800 rounded-full b px-4 shadow-sm py-2 hidden">
                <p className="font-semibold">
                  {etherUserBalance &&
                    parseFloat(formatEther(etherUserBalance)).toFixed(2)}{" "}
                  ETH
                </p>
              </div>
            )}
            {etherUserBalance && (
              <div className="lg:clear-none clear-both  rounded-full px-4 py-2 shadow-sm mr-2 block">
                <p className="font-semibold text-xs lg:text-base">
                  {balanceArtinuFinal} ARTINU
                </p>
              </div>
            )}
            {!account && (
              <div className="">
                <Button
                  onClick={() => {
                    activateBrowserWallet();
                  }}
                >
                  Unlock wallet
                </Button>
              </div>
            )}
            {etherUserBalance && (
              <div className=" truncate w-48 bg-gray-800 rounded-full ml-2 px-4 py-2 shadow-sm text-xs lg:text-base">
                <p>{props.account}</p>
              </div>
            )}
          </div>
        </header>
      </div>
    </div>
  );
}

export default Header;
