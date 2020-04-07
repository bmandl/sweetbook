import React from 'react';
import './index.scss';

export default (props) => (
    <div className="container shadow p-5 mt-6 mb-5 rounded-lg border">
        <div className="title-center-box"><h1 id="title" className="container-title rounded-lg shadow">{props.title}</h1></div>      
        {props.content}
    </div>
)