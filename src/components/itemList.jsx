import * as React from "react";
import {Item} from './item.jsx';

function ItemList(params) {
    return (
        <div>
            <Item title='test' />
            {params.toReadItems.map((item) => {
               return <Item url={item.url} title={item.title} key={item.url} /> 
            })}
        </div>
    )
}

export {ItemList};