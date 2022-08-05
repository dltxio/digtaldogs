import { createContext, useState } from "react";
import { ethers, providers } from "ethers";
import WalletTypes from "../Types/Wallet";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Event from "../Types/Event";
import config from "../../contracts.config.json";
import { triggerEvent } from "../Utils/event";

export type WalletContextType = {
  account: string | undefined;
  network: string | undefined;
  connect(any): void;
  disconnect(): void;
  getSigner(): void;
  getProvider(): void;
};

let currentWeb3: any;
declare let window: any;

export let provider: any;
export let disconnectFromWalletConnect: any;
export let signer: any;

export const WalletContext = createContext<WalletContextType>(null as any);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [account, setAccount] = useState<string | undefined>(undefined);
  const [network, setNetwork] = useState<string | undefined>(undefined);

  const getNetworkName = async (provider) => {
    const network = await provider.getNetwork();
    return chainIdToNetwork(network.chainId);
  };

  const chainIdToNetwork = (chainId) => {
    return Object.keys(config).find((x) => config[x].chainId === chainId);
  };

  const setProvider = async (p, dontUpdateNetworkInStore) => {
    provider = p;
    if (!dontUpdateNetworkInStore) {
      const network = await getNetworkName(p);
      setNetwork(network);
    }
  };
  const setSigner = async (p) => {
    setProvider(p, true);
    signer = p.getSigner();
    const network = await getNetworkName(p);
    const account = await signer.getAddress();
    window.localStorage.setItem("walletAddress", account);
    setAccount(account);
    setNetwork(network);
    triggerEvent(Event.WalletUpdate);
  };

  const connect = async (provider) => {
    try {
      if (provider === WalletTypes.Metamask) {
        await connectMetamask();
      } else if (provider === WalletTypes.WalletConnect) {
        await connectWalletConnect();
      } else {
        console.error("Unknown wallet provider", provider);
      }
    } catch (e) {
      console.log(e);
      init();
    }
  };

  const connectWalletConnect = async () => {
    const web3 = new WalletConnectProvider({
      infuraId: process.env.REACT_APP_INFURA_ID,
      bridge: "https://polygon.bridge.walletconnect.org"
    });

    disconnectFromWalletConnect = async () => {
      await web3.disconnect();
      window.localStorage.removeItem("walletconnect");
    };

    await web3.enable();
    const provider = new providers.Web3Provider(web3);
    await setSigner(provider);
    addListeners(web3, connectWalletConnect);
    window.localStorage.setItem("walletChoice", WalletTypes.WalletConnect);
  };

  const connectMetamask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    await setSigner(provider);
    addListeners(window.ethereum, connectMetamask);
    window.localStorage.setItem("walletChoice", WalletTypes.Metamask);
  };

  const connectDefaultProvider = () => {
    setProvider(
      window.ethereum
        ? new ethers.providers.Web3Provider(window.ethereum)
        : new ethers.providers.InfuraProvider(
            process.env.HARDHAT_NETWORK,
            process.env.REACT_APP_INFURA_ID
          ),
      false
    );

    if (window.ethereum) {
      addListeners(window.ethereum, connectDefaultProvider);
    }
  };

  const init = async () => {
    const walletchoice = window.localStorage.getItem("walletChoice");

    if (
      !!window.localStorage.getItem("walletconnect") &&
      walletchoice === WalletTypes.WalletConnect
    ) {
      return connectWalletConnect();
    }

    if (window.ethereum && walletchoice === WalletTypes.Metamask) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts"
      });
      if (accounts.length) {
        return connectMetamask();
      }
    }

    connectDefaultProvider();
  };

  const addListeners = (web3, initProvider) => {
    if (currentWeb3) {
      currentWeb3.removeAllListeners(Event.WalletAccountChange);
      currentWeb3.removeAllListeners(Event.WalletChainChange);
      currentWeb3.removeAllListeners(Event.WalletDisconnect);
    }

    web3.on(Event.WalletAccountChange, initProvider);
    web3.on(Event.WalletChainChange, initProvider);
    web3.on(Event.WalletDisconnect, init);

    currentWeb3 = web3;
  };

  const getProvider = () => provider;
  const getSigner = () => signer;

  const disconnect = () => {
    resetSigner();

    if (disconnectFromWalletConnect) {
      disconnectFromWalletConnect();
      disconnectFromWalletConnect = null;
    }
    window.localStorage.removeItem("walletChoice");
    window.localStorage.removeItem("walletAddress");

    connectDefaultProvider();
  };

  const resetSigner = () => {
    signer = null;
    if (account) {
      setAccount(undefined);
    }
    triggerEvent(Event.WalletUpdate);
  };

  return (
    <WalletContext.Provider
      value={{ account, network, getSigner, getProvider, connect, disconnect }}
    >
      {children}
    </WalletContext.Provider>
  );
};
