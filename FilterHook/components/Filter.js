import React, { useState, useCallback } from 'react';
import { Fragment } from 'react';
import { Controls } from './Controls';
import { List } from './List';

import './Filter.css';

export const Filter = ({ initWords }) => {
  const [words, setWords] = useState(initWords.join('\n'));

  function filterWords(userText, isSorted) {
    const filteredWordsArr = userText
      ? initWords.filter(
          (word) => word.toLowerCase().indexOf(userText.toLowerCase()) !== -1,
        )
      : initWords.slice();

    const newWords = isSorted
      ? filteredWordsArr.sort().join('\n')
      : filteredWordsArr.join('\n');

    setWords(newWords);
  }

  const memoizedFilterWords = useCallback(filterWords, []);

  return (
    <Fragment>
      <Controls cbFilter={memoizedFilterWords} />
      <List words={words} />
    </Fragment>
  );
};
