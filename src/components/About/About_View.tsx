import React from "react";
type Props = {};
const About: React.FC<Props> = (props) => {
  return (
    <>
      <div className="my-5 nm-flat-white text-black p-8 rounded-2xl">
        <div className="text-left font-bold text-3xl text-primary-p5 text-xl p-4 rounded-xl text-center">
          About
        </div>
        <div className="text-left my-6 font-sans text-m text-gray-600 py-6">
          Digital Dogs is an integrated digital registry of pedigree dogs for
          Breeders, Dog Associations, Microchip Registries and Government
          Bodies.
          <br></br>
          <br></br>
          Built on Blockchain technology, the registry provides provable
          ownership, lineage and certificate of pedigree for more secure,
          transparent, robust and affordable dog registration.
        </div>
      </div>
    </>
  );
};
export default About;
