import artinuLogoHeader from "./images/logoHeader.svg"
import React from "react"
import { useEthers, useContractCall, useContractFunction,useEtherBalance } from "@usedapp/core";
import { Interface, parseEther, formatEther } from "ethers/lib/utils";



function Header (props:any){

    const etherUserBalance = useEtherBalance(props.account);
    
    return(
    <div className="max-w-screen-lg mx-auto px-4 pt-12 ">
    <header className="">
        <a href="www.artinu.club" target="_blank"><img className="mb-8 float-left" src={artinuLogoHeader} alt="Logo" /></a>
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
        </div>
    </header>
    </div>
    )
}

export default Header