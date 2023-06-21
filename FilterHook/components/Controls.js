import React, { useEffect, useState } from 'react';

import './Controls.css';

export const Controls = ({ cbFilter }) => {
  const [isChecked, setChecked] = useState(false);
  const [userText, setUserText] = useState('');

  useEffect(() => {
    cbFilter(userText, isChecked);
  }, [userText, isChecked]);

  return (
    <div className='Controls'>
      <input
        type='checkbox'
        checked={isChecked}
        onChange={({ target: { checked } }) => setChecked(checked)}
      />
      <input
        type='text'
        value={userText}
        onChange={({ target: { value } }) => setUserText(value)}
      />
      <button
        onClick={() => {
          setChecked(false);
          setUserText('');
        }}
      >
        сброс
      </button>
    </div>
  );
};
