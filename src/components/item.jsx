import * as React from "react";
import deleteIcon from "./assets/recycle-bin-icon.svg";
// on loading icons/images in electron
// https://www.debugandrelease.com/how-to-load-images-in-electron-applications/

function Item(params) {
  console.log('item params', params);
  return (
    <div className="read-item">
      <a href={params.url} target="_blank">
        <div className="read-item-container">
          {(params.imgSrc != null) ? <img src={params.imgSrc} alt="" className="to-read-item-img"/> : null}
          <h2>{params.openGraphTitle == null ? params.title : params.openGraphTitle}</h2>
          
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
}

export { Item };
