import React from 'react';

import { eventBus } from '../js/eventBus';

import './AddClient.css';

class AddClient extends React.PureComponent {
  state = {
    id: Date.now(),
  };

  famInputRef = React.createRef();
  imInputRef = React.createRef();
  otchInputRef = React.createRef();
  balanceInputRef = React.createRef();

  add = () => {
    eventBus.emit('AddNewClient', {
      id: this.state.id,
      fam: this.famInputRef.current.value,
      im: this.imInputRef.current.value,
      otch: this.otchInputRef.current.value,
      balance: parseFloat(this.balanceInputRef.current.value),
    });
    /*
    Если пишу вот так код, то какая-то ерунда получается. Баланс видит, а id и фио - нет. Не понимаю почему, ведь тут я передаю просто кусок объекта под видом переменной. Почему не работает так же, как код выше?

    const clientInfo = {
      id: this.state.id,
      fam: this.famInputRef.current.value,
      im: this.imInputRef.current.value,
      otch: this.otchInputRef.current.value,
      balance: this.balanceInputRef.current.value,
    };

    eventBus.emit('AddNewClient', clientInfo);*/
  };

  cancel = () => eventBus.emit('CancelAddOrEdit', null);

  render() {
    return (
      <div className='AddClient'>
        <h3>Добавить нового клиента</h3>
        <div className='AddClient__id'>ID: {this.state.id}</div>
        <label>
          <div className='fieldName'>Фамилия</div>
          <input type='text' ref={this.famInputRef} />
        </label>
        <label>
          <div className='fieldName'>Имя</div>
          <input type='text' ref={this.imInputRef} />
        </label>
        <label>
          <div className='fieldName'>Отчество</div>
          <input type='text' ref={this.otchInputRef} />
        </label>
        <label>
          <div className='fieldName'>Баланс</div>
          <input type='text' ref={this.balanceInputRef} />
        </label>

        <button onClick={this.add}>Добавить</button>
        <button onClick={this.cancel}>Отменить</button>
      </div>
    );
  }
}

export default AddClient;
