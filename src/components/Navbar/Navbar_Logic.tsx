import { useState } from "react";
import NavBarView from "./Navbar_View";
import useWallet from "../Hooks/useWallet";
import WalletTypes from "../../components/Types/Wallet";
import { WalletModal } from "..";

const Navbar: React.FC = () => {
  const { connect, disconnect, account } = useWallet();
  const [showWalletModal, setOpenWalletModal] = useState(false);

  const openWalletModal = async () => {
    setOpenWalletModal(true);
  };
  const connectMetamask = async () => {
    await connectWallet(WalletTypes.Metamask);
    setOpenWalletModal(false);
  };

  const connectWallet = async (provider) => {
    await connect(provider);
  };

  const disconnectWallet = async () => {
    await disconnect();
  };

  const connectWalletConnect = async () => {
    await connectWallet(WalletTypes.WalletConnect);
    setOpenWalletModal(false);
  };
  return (
    <>
      <NavBarView
        disconnectWallet={disconnectWallet}
        account={account}
        openWalletModal={openWalletModal}
      />
      <WalletModal
        connectMetamask={connectMetamask}
        connectWalletConnect={connectWalletConnect}
        show={showWalletModal}
        onClose={() => setOpenWalletModal(false)}
      />
    </>
  );
};

export default Navbar;
