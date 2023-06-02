import React from 'react';
import PropTypes from 'prop-types';

import { eventBus } from '../js/eventBus';

import './EditClient.css';

class EditClient extends React.PureComponent {
  static propTypes = {
    clientInfo: PropTypes.shape({
      id: PropTypes.number.isRequired,
      fam: PropTypes.string.isRequired,
      im: PropTypes.string.isRequired,
      otch: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    }),
  };

  famInputRef = React.createRef();
  imInputRef = React.createRef();
  otchInputRef = React.createRef();
  balanceInputRef = React.createRef();

  save = () => {
    eventBus.emit('SaveChangesInClient', {
      id: this.props.clientInfo.id,
      fam: this.famInputRef.current.value,
      im: this.imInputRef.current.value,
      otch: this.otchInputRef.current.value,
      balance: parseFloat(this.balanceInputRef.current.value),
    });
  };

  cancel = () => eventBus.emit('CancelAddOrEdit', null);

  render() {
    return (
      <div className='EditClient'>
        <h3>Редактировать данные клиента</h3>
        <div className='EditClient__id'>ID: {this.props.clientInfo.id}</div>
        <label>
          <div className='fieldName'>Фамилия</div>
          <input
            type='text'
            defaultValue={this.props.clientInfo.fam}
            ref={this.famInputRef}
          />
        </label>
        <label>
          <div className='fieldName'>Имя</div>
          <input
            type='text'
            defaultValue={this.props.clientInfo.im}
            ref={this.imInputRef}
          />
        </label>
        <label>
          <div className='fieldName'>Отчество</div>
          <input
            type='text'
            defaultValue={this.props.clientInfo.otch}
            ref={this.otchInputRef}
          />
        </label>
        <label>
          <div className='fieldName'>Баланс</div>
          <input
            type='text'
            defaultValue={this.props.clientInfo.balance}
            ref={this.balanceInputRef}
          />
        </label>

        <button onClick={this.save}>Сохранить</button>
        <button onClick={this.cancel}>Отменить</button>
      </div>
    );
  }
}

export default EditClient;
