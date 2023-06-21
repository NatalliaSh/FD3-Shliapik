import React from 'react';
import ReactDOM from 'react-dom';

import { Filter } from './components/filter';

const wordsArr = [
  'california',
  'everything',
  'aboveboard',
  'washington',
  'basketball',
  'weathering',
  'characters',
  'literature',
  'contraband',
  'appreciate',
];

ReactDOM.render(
  <Filter initWords={wordsArr} />,
  document.getElementById('container'),
);
