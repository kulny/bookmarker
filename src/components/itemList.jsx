import * as React from "react";
import {Item} from './item.jsx';

function ItemList(params) {
    return (
        <div className="item-list-container">
            {params.toReadItems.map((item) => {
               return <Item url={item.url} title={item.title} key={item.url} onDelete={params.onDelete} /> 
            })}
        </div>
    )
}

export {ItemList};