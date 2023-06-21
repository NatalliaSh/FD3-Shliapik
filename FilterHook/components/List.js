import React, { useState, useEffect } from 'react';

import './List.css';

export const List = ({ words }) => {
  return <div className='List'>{words}</div>;
};
