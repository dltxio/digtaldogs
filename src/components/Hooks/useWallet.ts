import React from "react";
import { WalletContext, WalletContextType } from "../Providers/Wallet";

const useWallet = (): WalletContextType => {
  return React.useContext(WalletContext) as WalletContextType;
};

export default useWallet;
