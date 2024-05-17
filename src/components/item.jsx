import * as React from "react";
import deleteIcon from "./assets/recycle-bin-icon.svg";
// on loading icons/images in electron
// https://www.debugandrelease.com/how-to-load-images-in-electron-applications/

function Item(params) {
  return (
    <div className="read-item" onAuxClick={openContextMenu}>
      <a href={params.url} target="_blank">
        <div className="read-item-container">
          {(params.imgSrc != null) ? <img src={params.imgSrc} alt="" className="to-read-item-img"/> : null}
          <h3>{params.userTitle}</h3>
          <p>{params.openGraphTitle == null ? params.title : params.openGraphTitle}</p>
          
        </div>
      </a>
      <button
            className="delete"
            onClick={() => {
              params.onDelete(params.url);
            }}
          >
            <img src={deleteIcon} alt="" className="deleteIcon" />
          </button>
    </div>
  );

  function openContextMenu() {
    window.myAPI.openContextMenu(params.url);
  }
}

export { Item };
