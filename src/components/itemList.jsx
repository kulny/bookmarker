import * as React from "react";
import { Item } from "./item.jsx";

function ItemList(params) {
  return (
    <div className="item-list-container flex flex-col h-full max-w-xl gap-2.5">
      {params.toReadItems.map((item) => {
        return (
          <Item
            url={item.url}
            title={item.title}
            key={item.url}
            onDelete={params.onDelete}
            imgSrc={item.openGraphImgUrl}
            openGraphTitle={item.openGraphTitle}
            userTitle={item.userTitle}
          />
        );
      })}
    </div>
  );
}

export { ItemList };
