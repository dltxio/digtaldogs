import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type Props = {
  onSubmit(value: any): Promise<void>;
  setInput(searchInput: string): void;
  searchInput: string;
};
const SearchView: React.FC<Props> = (props) => {
  return (
    <>
      <div className="mt-5 text-black rounded-2xl">
        <div className="flex justify-start items-right">
          <div className="relative">
            <div className="absolute top-4 left-3">
              <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
              <FontAwesomeIcon className="text-gray-400" icon={faSearch} />
            </div>{" "}
            <input
              type="text"
              className="nm-inset-white-sm rounded-full h-14 w-48 md:w-96 pl-10 pr-20 rounded-lg z-0 border focus:border-gray-300 focus:outline-none"
              placeholder="Search ..."
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                props.setInput(target.value);
              }}
              value={props.searchInput}
            />
            <div className="absolute top-2 right-2">
              <button
                className="h-10 w-20 text-white rounded-full bg-primary-p1 hover:bg-primary-p3"
                onClick={() => props.onSubmit(props.searchInput)}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SearchView;
