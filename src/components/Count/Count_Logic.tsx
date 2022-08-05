import React, { useState } from "react";
import useWallet from "../Hooks/useWallet";
import { ethers, utils } from "ethers";
import dogsERC721 from "../../build/contracts/DogERC721.sol/DogERC721.json";
import CountView from "./Count_View";

const TotalSupply: React.FC = () => {
  const [supply, setSupply] = useState(0);
  const [breed, setBreed] = useState("");

  const { getSigner } = useWallet();
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

  const loadBreed = async () => {
    try {
      const contract = await getContract();
      const result = await contract.name();
      console.log(result);
      setBreed(result);
    } catch (error) {
      console.error(error);
    }
  };

  const loadSupply = async () => {
    try {
      const contract = await getContract();

      const result = await contract.count();
      console.log(result);
      setSupply(result);
    } catch (error) {
      console.error(error);
    }
  };

  loadSupply();
  loadBreed();

  return (
    <CountView
      supply={supply}
      breed={breed}
      loadSupply={loadSupply}
      loadBreed={loadBreed}
    />
  );
};

export default TotalSupply;
