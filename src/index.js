import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import ContentTemplate from './ContentTemplate.jsx';
import AddRecipe from './AddRecipe.js';

ReactDOM.render(
  <React.StrictMode>
    <ContentTemplate title="Add recipe" content={AddRecipe()} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
