import artinuLogoHeader from "./images/logoHeader.svg"
import React from "react"
import { useEthers, useContractCall, useContractFunction,useEtherBalance } from "@usedapp/core";
import { Interface, parseEther, formatEther } from "ethers/lib/utils";
import contract_abi from "./contract"
import Web3 from 'web3'
import { FiExternalLink } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import Button from "./Button";

const TOKEN_CONTRACT = "0xc1FF84C5C6FcF7e6E60D6bf4C1209BC4254629ad";
const ARTIST_WALLET = "0x853c64EdD278B9C30E8abf5F8cf42aeF64C3796D"


function Header (props:any){
    const { activateBrowserWallet, account, active, error } = useEthers();
    const etherUserBalance = useEtherBalance(props.account);
    const abi = new Interface(contract_abi);

    const balanceOfArtinu = useContractCall({
        abi,
        address: TOKEN_CONTRACT,
        method: "balanceOf",
        args: [props.account],
      });
    
      const balanceArtinu = balanceOfArtinu && Web3.utils.fromWei(balanceOfArtinu.toString(), 'gwei');
      const balanceArtinuFinal = (Math.round(Number(balanceArtinu))).toLocaleString()
      

      

    return(
    <div className=" mx-auto px-4 pt-8 pb-8 mb-12  text-white border-b border-gray-800">
    <div className="max-w-7xl mx-auto">
    <header className="">
        <a href="https://www.artinu.club" target="_blank"><img className="float-left" src={artinuLogoHeader} alt="Logo" /></a>
        <div>
        {etherUserBalance &&
        <div className="float-right truncate w-48 bg-gray-800 rounded-full ml-2 px-4  shadow-sm">
            <p>{props.account}</p>
        </div>
        }
        {etherUserBalance &&
        <div className="float-right bg-gray-800 rounded-full b px-4 shadow-sm hidden lg:block">
            <p className="font-semibold">{etherUserBalance && parseFloat(formatEther(etherUserBalance)).toFixed(2)} ETH</p>
        </div>
        }
        {etherUserBalance &&
        <div className="lg:clear-none clear-both float-right rounded-full px-4 shadow-sm mr-2 hidden lg:block">
            <p className="font-semibold">{balanceArtinuFinal} ARTINU</p>
        </div>
        }   
        </div>
        <div className="text-white">
      <NavLink exact activeClassName="active" className="mx-4" to="/">Portfolio</NavLink>
      <NavLink exact activeClassName="active" className="mx-4" to="/Dashboard">Dashboard</NavLink>
      <NavLink exact activeClassName="active" className="mx-4" to="/myportfolio">My portfolio</NavLink>
        
      {!account &&  
      <div className="float-right">
      <Button
            onClick={() => {
              activateBrowserWallet();
            }}
          >
            Unlock wallet
          </Button>
      </div>
     }
    </div>
    </header>
    </div>
    </div>
    )
}

export default Header