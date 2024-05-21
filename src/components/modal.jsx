import * as React from "react";

function Modal(params) {
  const [toggleButton, setToggleButton] = React.useState(false);

  const inputStyle = "border-none text-base p-1"
  const buttonStyle = "border-none m-1 rounded-lg p-1 cursor-pointer"

  return (
    <div id="modal" className="fixed top-0 bg-modalBg w-screen h-full flex justify-center items-center gap-2 flex-col">
      <div className="modal-background h-2/6 w-2/6 bg-blue3 flex flex-col justify-center items-center gap-2 rounded-lg text-white p-2">
        <h2 className="m-0 p-0">Add a new item</h2>
        <input
          type="text"
          id="url"
          autoFocus={true}
          placeholder="Enter URL"
          value={params.url}
          onChange={params.onChangeUrl}
          onKeyUp={inputShortcuts()}
          className={inputStyle}
        />
        <input
          type="text"
          id="userTitle"
          placeholder="Title"
          value={params.userTitle}
          onKeyUp={inputShortcuts()}
          onChange={params.onChangeUserTitle}
          className={inputStyle}

        />
        <div className="modal-button-container">
          <button
            id="add-item"
            disabled={toggleButton}
            onClick={async () => {
              await manageClick();
            }}
            className={buttonStyle}
          >
            Add Item
          </button>
          <button id="close-modal" onClick={params.onCancel}
          
          className={buttonStyle}
          >
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
