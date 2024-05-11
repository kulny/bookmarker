import * as React from "react";

function Modal(params) {
    const [url, setUrl] = React.useState('');
  return (
    <div id="modal">
      <input type="text" id="url" placeholder="Enter URL" value={url} onChange={onChange} />
      <button id="add-item" onClick={ async () => {
        let info = await window.myAPI.getScreenshot(url);
        console.log('info is ', info);
        /// add to storage / state to build Item element from
      }} >Add Item</button>
      <button id="close-modal" onClick={params.onCancel}>Cancel</button>
    </div>
  );

  function onChange(e) {
    console.log(e.target.value);
    setUrl(e.target.value);
  }
}

export {Modal};