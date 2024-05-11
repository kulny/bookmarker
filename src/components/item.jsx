import * as React from "react";
import deleteIcon from "./assets/recycle-bin-icon.svg";
// on loading icons/images in electron
// https://www.debugandrelease.com/how-to-load-images-in-electron-applications/

function Item(params) {
  return (
    <div>
      <a href={params.url} target="_blank">
        <div className="read-item-container">
          {/* <img src="${params.imgSrc}" alt="" /> */}
          <h2>{params.title}</h2>
          <button className="delete">
            <img src={deleteIcon} alt="" className="deleteIcon"/>
          </button>
        </div>
      </a>
    </div>
  );
}

export { Item };

