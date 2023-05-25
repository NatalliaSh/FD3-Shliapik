import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './RainbowFrame.css';

class RainbowFrame extends React.Component {
  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string),
  };
  render() {
    let content = this.props.children;
    for (let color of this.props.colors) {
      content = (
        <div
          className='RainbowFrame'
          style={{ border: `solid 3px ${color}`, padding: '10px' }}
        >
          {content}
        </div>
      );
    }

    /*const content = this.props.colors.reduce((acc, color) => {
      return (
        <div
          className='RainbowFrame'
          style={{ border: `solid 3px ${color}`, padding: '10px' }}
        >
          {acc}
        </div>
      );
    }, this.props.children);*/

    return <Fragment>{content}</Fragment>;
  }
}

export default RainbowFrame;
