import { Navbar } from "../";
import React, { useRef } from "react";

type Props = {
  children: React.ReactNode;
};

const PageLayout: React.FC<Props> = ({ children }) => {
  const url = (name: string, wrap = false) =>
    `${
      wrap ? "url(" : ""
    }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
      wrap ? ")" : ""
    }`;
  return (
    <div className="bg-white flex flex-1 h-screen">
      <header className="fixed w-full bg-background">
        <Navbar />
      </header>
      <main className="bg-cover overflow-y-auto flex flex-1 py-4 mt-16 bg-purple-100 py-10">
        <div className="flex flex-col flex-1 max-w-7xl px-3 md:mx-auto">
          <div className="">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
