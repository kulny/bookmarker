import * as React from "react";

function Item(params) {
    return (
        <div>
            <img src="${params.imgSrc}" alt="" />
            <h2>${params.title}</h2>
        </div>
    )
}

export {Item};