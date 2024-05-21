import * as React from "react";
import deleteIcon from "./assets/recycle-bin-icon.svg";
// on loading icons/images in electron
// https://www.debugandrelease.com/how-to-load-images-in-electron-applications/

function Item(params) {
  return (
    <div className="read-item flex" onAuxClick={openContextMenu}>
      <a
        href={params.url}
        target="_blank"
        className="text-inherit no-underline"
      >
        <div className="read-item-container bg-blue2 rounded-l-lg flex flex-col pr-0 pb-3 mr-0 pt-3 pl-3 min-h-20 items-center justify-center hover:bg-blue3">
          {params.imgSrc != null ? (
            <img src={params.imgSrc} alt="" className="to-read-item-img w-6/12" />
          ) : null}
          <h3 className="mx-0 mr-3">{params.userTitle}</h3>
          <p>
            {params.openGraphTitle == null
              ? params.title
              : params.openGraphTitle}
          </p>
        </div>
      </a>
      <button
        className="delete bg-red-500 m-0 p-2 border-none rounded-r-lg text-3xl cursor-pointer hover:bg-red-800 flex items-center justify-center"
        onClick={() => {
          params.onDelete(params.url);
        }}
      >
        <img src={deleteIcon} alt="" className="deleteIcon w-9/12" />
      </button>
    </div>
  );

  function openContextMenu() {
    window.myAPI.openContextMenu(params.url);
  }
}

export { Item };
