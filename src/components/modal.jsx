import * as React from "react";

function Modal(params) {
  const [url, setUrl] = React.useState("");
  const [userTitle, setUserTitle] = React.useState("");
  const [toggleButton, setToggleButton] = React.useState(false);
  return (
    <div id="modal">
      <input
        type="text"
        id="url"
        autoFocus={true}
        placeholder="Enter URL"
        value={url}
        onChange={onChange}
        onKeyUp={inputShortcuts()}
      />
      <input
        type="text"
        id="userTitle"
        placeholder="Title"
        value={userTitle}
        onKeyUp={inputShortcuts()}
        onChange={(e) => {
          setUserTitle(e.target.value);
        }}
      />
      <button
        id="add-item"
        disabled={toggleButton}
        onClick={async () => {
          await manageClick();
        }}
      >
        Add Item
      </button>
      <button id="close-modal" onClick={params.onCancel}>
        Cancel
      </button>
    </div>
  );

  function inputShortcuts() {
    return async (e) => {
      if (e.key === "Enter") {
        await manageClick();
      } else if (e.key === "Escape") {
        params.onCancel();
      }
    };
  }

  async function manageClick() {
    // disable this button until logic has finished
    setToggleButton(true);

    try {
      let info = await window.myAPI.getScreenshot(url);
      /// add to storage / state to build Item element from
      info.userTitle = userTitle;
      params.onAddItem(info);

      // reenable the button
      setToggleButton(false);
    } catch (error) {
      setToggleButton(false);
    }
  }

  function onChange(e) {
    console.log(e.target.value);
    setUrl(e.target.value);
  }
}

export { Modal };
