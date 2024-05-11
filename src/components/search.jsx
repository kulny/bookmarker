import * as React from "react";

function SearchBar(params) {
    const [searchVal, setSearchVal] = React.useState('');

  return (
    <div>
      <button id="show-modal" onClick={params.onClick}>+</button>
      <input type="text" placeholder="search" id="search" value={searchVal} onChange={onChange} />
    </div>
  );

  function onChange(e) {
    setSearchVal(e.target.value);
  }
}

export {SearchBar};
