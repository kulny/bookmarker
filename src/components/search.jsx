import * as React from "react";

function SearchBar(params) {
  const [searchVal, setSearchVal] = React.useState("");

  return (
    <div>
      <div className="search-container text-2xl mb-6 ">
        <button className="p-1 rounded-lg mr-1 w-12 bg-blue2 border-none hover:bg-blue3" id="show-modal" onClick={params.onClick}>
          +
        </button>
        <input
          type="text"
          placeholder="search"
          id="search"
          className="rounded-lg p-1 bg-blue2 border-2 border-solid border-transparent hover:border-blue3 focus:outline-none focus:border-blue3"
          value={searchVal}
          onChange={onChange}
        />
      </div>
    </div>
  );

  function onChange(e) {
    setSearchVal(e.target.value);
    params.onSearch(searchVal);
  }
}

export { SearchBar };
