import * as React from "react";

function SearchBar(params) {
    const [searchVal, setSearchVal] = React.useState('');

  return (
    <div>
      <div className="search-container">
        <button id="show-modal" onClick={params.onClick}>+</button>
        <input type="text" placeholder="search" id="search" value={searchVal} onChange={onChange} />
      </div>
    </div>
  );

  function onChange(e) {
    setSearchVal(e.target.value);
    params.onSearch(searchVal);
  }
}

export {SearchBar};
