import React from 'react';
import ReactDOM from 'react-dom';

import Shop from './components/Shop';

import productsArr from './products.json';

// или так let productsArr = require('./products.json');

ReactDOM.render(
  <Shop defproducts={productsArr} />,
  document.getElementById('container'),
);
