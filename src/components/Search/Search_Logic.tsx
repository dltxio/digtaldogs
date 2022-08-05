import React, { useState } from "react";
import dogsERC721 from "../../build/contracts/DogERC721.sol/DogERC721.json";
import setting from "../../settings.json";
import useWallet from "../Hooks/useWallet";
import { ethers, utils } from "ethers";
import SearchView from "./Search_View";

const SearchLogic: React.FC = () => {
  const { getSigner } = useWallet();
  const [dog, setDog] = useState();
  const [input, setInput] = useState("");

  const OnSubmit = async (value) => {
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
    try {
      const contract = await getContract();
      const puppy = contract.getPuppy(value.index);
      const dog = puppy.decodeParameters(
        [
          { type: "string", name: "Name" },
          { type: "uint256", name: "DOB" },
          { type: "uint8", name: "Sex" },
          { type: "uint256", name: "Dam" },
          { type: "uint256", name: "Sire" }
        ],
        puppy.hash
      );
      setDog(dog);
      console.log(dog);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SearchView onSubmit={OnSubmit} setInput={setInput} searchInput={input} />
  );
};
export default SearchLogic;
