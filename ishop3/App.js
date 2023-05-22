import React from 'react';
import ReactDOM from 'react-dom';

import Shop from './components/Shop';

let productsArr = require('./products.json');

ReactDOM.render(
  <Shop defproducts={productsArr} />,
  document.getElementById('container'),
);
