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
import CardArtist from "./CardArtist";
import CardHolder from "./CardHolder";
import Portfolio from "./Portfolio";
import CardJoinArtist from "./CardJoinArtist";
import CardDAO from "./CardDAO";
import FormArtist from "./FormArtist";
import Header from "./Header";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";
import Web3 from 'web3'
import React, { useEffect, useState } from "react";



const TOKEN_CONTRACT = "0xc1FF84C5C6FcF7e6E60D6bf4C1209BC4254629ad";
const ARTIST_WALLET = "0x853c64EdD278B9C30E8abf5F8cf42aeF64C3796D";

export const Client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
  cache: new InMemoryCache(),
});




const ARTINU_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      tradeVolumeUSD
    }
  }
`


function App() {
  const { activateBrowserWallet, account, active, error } = useEthers();


  // const {data} = useFetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD");
  // console.log(data);



const [advice, setAdvice] = useState("");

useEffect(() => {
    const url = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD";

    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json.ethereum.usd);
            setAdvice(json.ethereum.usd);
        } catch (error) {
            console.log("error", error);
        }
    };

    fetchData();
}, []);


  

  const abi = new Interface(contract_abi);
  const contract = new Contract(TOKEN_CONTRACT, abi);

  //const { state, send } = useContractFunction(contract, "buyTokens");
  //const etherBalance = useEtherBalance(TOKEN_CONTRACT);


  const { loading: artinuLoading, data: artinuData } = useQuery(ARTINU_QUERY, {
    variables: {
      tokenAddress: "0xc1ff84c5c6fcf7e6e60d6bf4c1209bc4254629ad",
    },
  })

  const artinuPriceInEth = (parseFloat(artinuData && artinuData.tokens[0].derivedETH) * Number(advice)).toFixed(6)
  const artinuTotalLiquidity = artinuData && artinuData.tokens[0].tradeVolumeUSD  


  //const ethPriceInUSD = ethPriceData && ethPriceData.bundles[0].ethPrice

  const balanceOf = useContractCall({
    abi,
    address: TOKEN_CONTRACT,
    method: "balanceOf",
    args: [ARTIST_WALLET],
  });

  const etherUserBalance = useEtherBalance(account);


  const balanceOfArtinu = useContractCall({
    abi,
    address: TOKEN_CONTRACT,
    method: "balanceOf",
    args: [account],
  });

  const balanceArtinu = balanceOfArtinu && Web3.utils.fromWei(balanceOfArtinu.toString(), 'gwei');
  const balanceArtinuFinal = (Math.round(Number(balanceArtinu)))

  console.log(balanceArtinuFinal)

  const tabs = 1

  return (
    <div className="">
      {/* <Header account={account} /> */}
      <div className="clear-both pt-16 max-w-7xl mx-auto">
        {error && (
          <p className="text-red-500 text-center font-bold mb-2">
            An error has occured. Please check that you are connected to the
            Ethereum network and try unlocking again.
          </p>
        )}
        <div className="mx-2">
          <div className="bg-gray-800 p-8 w-full rounded-lg  shadow-xl py-8">
          {/* <div>
        Dai price:{' '}
        {daiLoading
          ? 'Loading token data...'
          : '$' +
            // parse responses as floats and fix to 2 decimals
            ((parseFloat(daiPriceInEth) * 2400).toFixed(5))}
      </div> */}
            <Card
              isLoading={!active}
              account={account}
              artinuPriceInEth={artinuPriceInEth}
              artinuLoading={artinuLoading}
              //etherBalance={etherBalance}
              activateBrowserWallet={activateBrowserWallet}
              //status={state?.status}
              balanceOf={balanceOf}
              artinuTotalLiquidity={artinuTotalLiquidity}
            />
          </div>
          
          {account &&
          <div className="flex flex-wrap">
            <div className="lg:w-6/12 w-full">
              <div className="bg-gray-800 h-72 p-8 mt-4 lg:mr-2 m-0 rounded-lg  shadow-xl py-12 ">
                <CardArtist balanceOf={balanceOf} artinuPriceInEth={artinuPriceInEth} /> 
              </div>
            </div>
            <div className="lg:w-6/12 w-full">
              <div className="bg-gray-800 h-72 p-8 mt-4 lg:ml-2 m-0 rounded-lg shadow-xl py-12 ">
                <CardHolder balanceOf={balanceOf} artinuPriceInEth={artinuPriceInEth} balanceArtinuFinal={balanceArtinuFinal}/>
              </div>
            </div>
            <div className="lg:w-6/12 w-full">
              <div className="bg-gray-800 h-96 p-8 mt-4 lg:mr-2 m-0 rounded-lg shadow-xl py-12 ">
                <CardJoinArtist balanceOf={balanceOf} />
              </div>
            </div>
            <div className="lg:w-6/12 w-full">
              <div className="bg-gray-800 h-96 p-8 mt-4 lg:ml-2 m-0 rounded-lg shadow-xl py-12 relative">
                <CardDAO balanceOf={balanceOf} />
              </div>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  );
}

// - Régler le problème du onchange qui empêche de submit et de buy
// - Actuellement lorsqu'on actualise la page on voit tous les états de la card apparaître avant que ça s'arrête sur le bon, ça fait vraiment buggy
// - Si je suis pas sur le bon network j'ai plus d'erreur et je vois tj les infos et je suis sur l'écran "congrats"

export default App;
