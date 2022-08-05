import React from "react";
type Props = {
  supply: number;
  breed: string;
  loadSupply(): void;
  loadBreed(): void;
};
const Count: React.FC<Props> = (props) => {
  return (
    <>
      <div className="my-5 nm-flat-white text-black p-8 rounded-2xl">
        <div className="text-left font-bold text-3xl text-primary-p5 p-4 rounded-xl text-center">
          Animals
        </div>
        <div className="text-left my-6 font-sans text-gray-600 text-3xl font-bold py-6 text-center">
          {props.breed} {props.supply}
        </div>
      </div>
    </>
  );
};
export default Count;
