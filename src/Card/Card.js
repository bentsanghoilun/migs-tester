import React from 'react';
import Item from './../Item/Item';

const card = () => {
    var text = "this is text";
    return <div className="card">
        <p>{text}</p>
        <Item/>
    </div>
}

export default card;