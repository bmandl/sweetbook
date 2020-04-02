import React from 'react';
import './index.scss';

export default (props) => (
    <div>
        <div class="title-center-box"><h1 id="title" class="container-title rounded-lg shadow">{props.title}</h1></div>      
        {props.content}
    </div>
)