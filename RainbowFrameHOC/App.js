import React from 'react';
import ReactDOM from 'react-dom';

import DoubleButton from './components/DoubleButton';
import withRainbowFrame from './components/withRainbowFrame';

const colorsArr = [
  'red',
  'orange',
  'yellow',
  'green',
  '#00BFFF',
  'blue',
  'purple',
];

const FramedDoubleButton = withRainbowFrame(colorsArr)(DoubleButton);

ReactDOM.render(
  <FramedDoubleButton
    caption1='Однажды'
    caption2='пору'
    cbPressed={(num) => alert(`Pressed button ${num}`)}
  >
    в студеную зимнюю
  </FramedDoubleButton>,

  document.getElementById('container'),
);
