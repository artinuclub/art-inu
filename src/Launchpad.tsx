import artinuBack from "./images/artinuBack.jpg";

interface Props {
  selectedAccount: any;
}

const Launchpad: React.FC<Props> = ({ selectedAccount }) => {
  return (
    <div>
      <p className="text-xl font-semibold text-artinuMain mb-2  text-center">
        COMING SOON
      </p>
      <h1 className="text-5xl text-white text-center">NFT Launchpad</h1>
      <p className="text-xl text-gray-500 mt-2  text-center mb-12">
        Fair and accessible fundraising for NFT artists and projects
      </p>
      <div className="max-w-7xl mx-auto text-center bg-artinuBack h-bigbig w-full bg-contain bg-no-repeat"></div>
    </div>
  );
};

export default Launchpad;
