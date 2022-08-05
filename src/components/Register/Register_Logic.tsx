import React, { useState } from "react";
import setting from "../../settings.json";
import dogsERC721 from "../../build/contracts/DogERC721.sol/DogERC721.json";
import useWallet from "../Hooks/useWallet";
import { ethers, utils } from "ethers";
import RegisterView from "./Register_View";

const RegisterLogic: React.FC = () => {
  const { getSigner } = useWallet();
  const [error, setError] = useState<string>();
  const [showError, setShowError] = useState(false);
  const [txHash, setTxHash] = useState();
  const [showTxHash, setShowTxHash] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const getContract = async () => {
    const signer: any = await getSigner();
    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS
        ? process.env.REACT_APP_CONTRACT_ADDRESS
        : "",
      dogsERC721.abi,
      signer
    );
    return contract;
  };

  const onSubmit = async (value) => {
    try {
      const contract = await getContract();

      const tx = await contract.addOwnPuppy(
        value.name.toUpperCase(),
        value.dob,
        value.microchip,
        value.damID,
        value.sireID,
        value.sex
      );
      setTxHash(tx.hash);
      setShowTxHash(true);
    } catch (error) {
      setError(JSON.stringify(error));
      setShowError(true);
      console.error(error);
    }
  };

  return (
    <RegisterView
      error={error}
      showError={showError}
      txHash={txHash}
      showTxHash={showTxHash}
      onSubmit={onSubmit}
      startDate={startDate}
      setStartDate={setStartDate}
    />
  );
};

export default RegisterLogic;
