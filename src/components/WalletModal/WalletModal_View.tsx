import { Modal } from "..";
import { Button } from "..";

type Props = {
  show: boolean;
  onClose: () => void;
  connectMetamask(): void;
  connectWalletConnect(): void;
};

const WalletModal: React.FC<Props> = (props) => {
  return (
    <Modal title="" show={props.show} onClose={props.onClose}>
      <div className="m-10 text-black flex justify-center">
        <div>
          <div className="">
            <img
              className="w-40 h-40 cursor-pointer"
              src="images/metamask-logo.svg"
              alt="MetaMask"
              onClick={props.connectMetamask}
            />
            <Button onClick={props.connectMetamask}>CONNECT METAMASK</Button>
          </div>
          <div className="w-20"></div>
          <div>
            <img
              className="w-40 h-40 cursor-pointer"
              src="images/walletconnect-logo.svg"
              alt="MetaMask"
              onClick={props.connectWalletConnect}
            />
            <Button onClick={props.connectWalletConnect}>WALLET CONNECT</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WalletModal;
