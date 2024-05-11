import * as React from "react";

function Item(params) {
    return (
        <div>
            <a href={params.url} target="_blank">
                {/* <img src="${params.imgSrc}" alt="" /> */}
                <h2>{params.title}</h2>
            </a>
        </div>
    )
}

export {Item};