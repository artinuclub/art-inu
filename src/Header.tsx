import artinuLogoHeader from "./images/logoHeader.svg"
import React from "react"
import { useEthers, useContractCall, useContractFunction,useEtherBalance } from "@usedapp/core";
import { Interface, parseEther, formatEther } from "ethers/lib/utils";
import contract_abi from "./contract"
import Web3 from 'web3'
import { FiExternalLink } from "react-icons/fi";

const TOKEN_CONTRACT = "0xc1FF84C5C6FcF7e6E60D6bf4C1209BC4254629ad";
const ARTIST_WALLET = "0x853c64EdD278B9C30E8abf5F8cf42aeF64C3796D"


function Header (props:any){

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
    <div className="max-w-screen-lg mx-auto px-4 pt-12">
    <header className="">
        <a href="https://www.artinu.club" target="_blank"><img className="mb-8 float-left" src={artinuLogoHeader} alt="Logo" /></a>
        <div>
        {etherUserBalance &&
        <div className="float-right truncate w-48 bg-white p-2 rounded-full ml-2 px-4 border border-gray-200  shadow-sm">
            <p>{props.account}</p>
        </div>
        }
        {etherUserBalance &&
        <div className="float-right bg-white p-2 rounded-full border border-gray-200 px-4 shadow-sm">
            <p className="font-semibold">{etherUserBalance && parseFloat(formatEther(etherUserBalance)).toFixed(2)} ETH</p>
        </div>
        }
        {etherUserBalance &&
        <div className="lg:clear-none clear-both float-right bg-white p-2 rounded-full border border-gray-200 px-4 shadow-sm mr-2">
            <p className="font-semibold">{balanceArtinuFinal} ARTINU</p>
        </div>
        }   
        </div>
    </header>
    <div className="lg:w-3/5 w-full mx-auto">
        <ul className="flex flex-wrap clear-both justify-between pt-12">
            <li className="mx-2 border-b-2 border-artinuMain">
                <p className="font-semibold text-artinuMain ">Dashboard</p>
            </li>
            <a href="https://www.dextools.io/app/uniswap/pair-explorer/0xd244f5d9bd7405ecb0068e69c4b6040298c576fa" target="_blank" className="inline-flex"><li className="mx-2">
                Open chart 
            </li><FiExternalLink className="mt-1"/></a>
            <a href="https://t.me/artinu_club" target="_blank" className="inline-flex"><li className="mx-2">
                Telegram
            </li><FiExternalLink className="mt-1"/></a>
            <a href="https://uploads-ssl.webflow.com/60c5bf93e74f6b85411cf86c/6102b9d45dca76424ca0fe68_TECHAUDIT_ART_INU.pdf" target="_blank" className="inline-flex"><li className="mx-2">
                Audit
            </li><FiExternalLink className="mt-1"/></a>
        </ul>
    </div>
    </div>
    )
}

export default Header