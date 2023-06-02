import React from 'react';
import PropTypes from 'prop-types';

import './MobileClient.css';

import { eventBus } from '../js/eventBus';

class MobileClient extends React.PureComponent {
  static propTypes = {
    info: PropTypes.shape({
      id: PropTypes.number.isRequired,
      fam: PropTypes.string.isRequired,
      im: PropTypes.string.isRequired,
      otch: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    }),
  };

  editClient = () => {
    eventBus.emit('StartEditClient', this.props.info);
  };

  deleteClient = () => {
    eventBus.emit('DeleteClient', this.props.info);
  };

  render() {
    console.log('MobileClient ' + this.props.info.fam + ' is rendered');

    return (
      <div className='MobileClient'>
        <div>{this.props.info.fam}</div>
        <div>{this.props.info.im}</div>
        <div>{this.props.info.otch}</div>
        <div>{this.props.info.balance}</div>
        {this.props.info.balance >= 0 ? (
          <div style={{ backgroundColor: 'green' }}>Активный</div>
        ) : (
          <div style={{ backgroundColor: 'red' }}>Заблокирован</div>
        )}
        <input type='button' value='Редактировать' onClick={this.editClient} />
        <input type='button' value='Удалить' onClick={this.deleteClient} />
      </div>
    );
  }
}

export default MobileClient;
