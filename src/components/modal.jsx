import * as React from "react";

function Modal(params) {
  const [toggleButton, setToggleButton] = React.useState(false);

  return (
    <div id="modal">
      <div className="modal-background">
        <h2>Add a new item</h2>
        <input
          type="text"
          id="url"
          autoFocus={true}
          placeholder="Enter URL"
          value={params.url}
          onChange={params.onChangeUrl}
          onKeyUp={inputShortcuts()}
        />
        <input
          type="text"
          id="userTitle"
          placeholder="Title"
          value={params.userTitle}
          onKeyUp={inputShortcuts()}
          onChange={params.onChangeUserTitle}
        />
        <div className="modal-button-container">
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
      </div>
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
      let info = await window.myAPI.getScreenshot(params.url);
      /// add to storage / state to build Item element from
      info.userTitle = params.userTitle;
      params.onAddItem(info);

      // reenable the button
      setToggleButton(false);
    } catch (error) {
      console.log(error);
      setToggleButton(false);
    }
  }
}

export { Modal };
