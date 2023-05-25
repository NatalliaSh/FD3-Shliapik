import React from 'react';
import PropTypes from 'prop-types';

import './DoubleButton.css';

class DoubleButton extends React.Component {
  static propTypes = {
    caption1: PropTypes.string.isRequired,
    caption2: PropTypes.string.isRequired,
    cbPressed: PropTypes.func.isRequired,
  };

  pressed = (EO) => this.props.cbPressed(EO.target.dataset.number);
  render() {
    return (
      <div className='DoubleButton'>
        <input
          type='button'
          defaultValue={this.props.caption1}
          onClick={this.pressed}
          data-number={1}
        />
        {this.props.children}
        <input
          type='button'
          defaultValue={this.props.caption2}
          onClick={this.pressed}
          data-number={2}
        />
      </div>
    );
  }
}

export default DoubleButton;
