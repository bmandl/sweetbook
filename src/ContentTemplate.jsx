import React from 'react';
import './index.scss';

export default (props) => (
    <div class="container shadow p-5 mt-6 mb-5 rounded-lg border">
        <div class="title-center-box"><h1 id="title" class="container-title rounded-lg shadow">{props.title}</h1></div>      
        {props.content}
    </div>
)