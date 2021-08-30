import Web3 from "web3";
import Loader from "./Loader";

type Props = {
  balanceArtinuFinal: any;
  listAssets: any;
  listEvents: any;
  listCollections: any;
  isLoaded: any;
  selectedAccount: any;
  ethPrice: any;
  account: any;
};

const PortfolioData: React.FC<Props> = ({
  balanceArtinuFinal,
  selectedAccount,
  listAssets,
  listCollections,
  listEvents,
  isLoaded,
  ethPrice,
  account,
}) => {
  if (!isLoaded) {
    return <Loader />;
  }

  const artinuPercent = (Number(balanceArtinuFinal) * 100) / 650000000;

  const totalInvested =
    listEvents &&
    listEvents.length !== 0 &&
    listEvents?.reduce((a, c) => {
      if (!c?.seller) {
        return Number(a);
      }

      if (c?.seller?.address.toUpperCase() === selectedAccount.toUpperCase()) {
        return Number(a);
      }

      return a + Number(c.total_price);
    }, 0);

  console.log("listEvents", listEvents);

  const realizedProfits =
    listEvents &&
    listEvents.length !== 0 &&
    listEvents?.reduce((a, c) => {
      if (c?.seller?.address.toUpperCase() === selectedAccount.toUpperCase()) {
        console.log("yoooo");
        return a + Number(c.total_price);
      }
      return a;
    }, 0);

  const currentValue = listCollections.reduce((prev, curr) => {
    return prev + curr.owned_asset_count * curr.stats.floor_price;
  }, 0);

  return (
    <div className="flex flex-wrap justify-between w-full bg-gray-800 rounded-xl p-8 mb-8 border border-white border-opacity-5 shadow-xl">
      <div className="text-white lg:pl-12 w-full lg:w-auto mb-4 lg:mb-0">
        <p className="">Current value</p>
        <p className="text-4xl text-artinuMain">
          {currentValue && currentValue.toFixed(2)} Ξ
        </p>
        <p className="text-lg text-gray-400">
          = ${((currentValue && currentValue) * ethPrice).toFixed(0)}
        </p>
      </div>
      <div className="text-white w-full lg:w-auto mb-4 lg:mb-0">
        <p className="">Total invested</p>
        <p className="text-4xl text-artinuGreen">
          {totalInvested &&
            (+Web3.utils.fromWei(totalInvested.toString(), "ether")).toFixed(
              2
            )}{" "}
          Ξ
        </p>
      </div>
      <div className="text-white w-full lg:w-auto mb-4 lg:mb-0">
        <p className="">Total sold</p>
        <p className="text-4xl text-white">
          {realizedProfits &&
            (+Web3.utils.fromWei(realizedProfits.toString(), "ether")).toFixed(
              2
            )}{" "}
          Ξ
        </p>
      </div>
      {selectedAccount === "0xC8605C3e0E670C1419147F6B9885335aF5Ed0E33" &&
        account && (
          <div className="text-white w-full lg:w-auto mb-4 lg:mb-0">
            <p className="">Your holding</p>
            <p className="text-4xl">{artinuPercent.toFixed(2)}%</p>
            <p className="text-lg text-gray-400">
              = $
              {(
                (artinuPercent * ((currentValue && currentValue) * ethPrice)) /
                100
              ).toFixed(0)}
            </p>
          </div>
        )}
      <div className="text-white pr-12 w-full lg:w-auto mb-4 lg:mb-0">
        <p className="">Number of NFTs</p>
        <p className="text-4xl">
          {listAssets && Object.keys(listAssets).length}
        </p>
      </div>
    </div>
  );
};

export default PortfolioData;
