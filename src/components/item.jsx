import * as React from "react";
import deleteIcon from "./assets/recycle-bin-icon.svg";
// on loading icons/images in electron
// https://www.debugandrelease.com/how-to-load-images-in-electron-applications/

function Item(params) {
  return (
    <div className="read-item">
      <a href={params.url} target="_blank">
        <div className="read-item-container">
          {/* <img src="${params.imgSrc}" alt="" /> */}
          <h2>{params.title}</h2>
          
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
