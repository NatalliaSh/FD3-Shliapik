import React from 'react';
import PropTypes from 'prop-types';

import MobileClient from './MobileClient';
import AddClient from './AddClient';
import EditClient from './EditClient';

import './Mobile.css';

import { eventBus } from '../js/eventBus';

class Mobile extends React.PureComponent {
  static propTypes = {
    clients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        fam: PropTypes.string.isRequired,
        im: PropTypes.string.isRequired,
        otch: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
      }),
    ),
  };

  allClients = this.props.clients;

  state = {
    workMode: 0, //0-start, 1-edit, 2-addClient
    clients: this.allClients,
    clientEditInfo: null,
  };

  showAll = () => {
    this.setState({ clients: this.allClients });
  };

  showActive = () => {
    const activeClients = this.allClients.filter(
      (client) => client.balance >= 0,
    );

    this.setState({ clients: activeClients });
  };

  showBlocked = () => {
    const blockedClients = this.allClients.filter(
      (client) => client.balance < 0,
    );
    this.setState({ clients: blockedClients });
  };

  addClient = () => {
    this.setState({ workMode: 2 });
  };

  startEditClientHandler = (info) => {
    this.setState({ workMode: 1, clientEditInfo: info });
  };

  cancelAddOrEditHandler = () => {
    this.setState({ workMode: 0, clientEditInfo: null });
  };

  //?если сделать всех клиентов из пропсов, то добавить можно только одно, т.к. каждый раз будет браться из пропсов. Если из state то как согласовать работу кнопок фильтрации, ведь они берут из проспсов, а в пропсах нет нового клиента и получается при фильтрации сбрасывается все. Поэтому добавила свойство allClients

  addNewClientHandler = (clientInfo) => {
    this.allClients = [...this.allClients, clientInfo];
    this.setState({ clients: this.allClients, workMode: 0 });
  };

  saveChangesHandler = (clientInfo) => {
    const currentClient = this.allClients.slice();
    const indexOfClient = currentClient.findIndex(
      (client) => client.id === clientInfo.id,
    );

    currentClient[indexOfClient] = {
      ...currentClient[indexOfClient],
      fam: clientInfo.fam,
      im: clientInfo.im,
      otch: clientInfo.otch,
      balance: clientInfo.balance,
    };

    this.allClients = currentClient;

    this.setState({
      clients: this.allClients,
      workMode: 0,
      clientEditInfo: null,
    });
  };

  deleteClientHandler = (clientInfo) => {
    const currentClient = this.allClients.slice();
    const indexOfClient = currentClient.findIndex(
      (client) => client.id === clientInfo.id,
    );

    currentClient.splice(indexOfClient, 1);

    this.allClients = currentClient;

    this.setState({
      clients: this.allClients,
    });
  };

  componentDidMount = () => {
    eventBus.addListener('CancelAddOrEdit', this.cancelAddOrEditHandler);

    eventBus.addListener('AddNewClient', this.addNewClientHandler);

    eventBus.addListener('StartEditClient', this.startEditClientHandler);

    eventBus.addListener('SaveChangesInClient', this.saveChangesHandler);

    eventBus.addListener('DeleteClient', this.deleteClientHandler);
  };

  componentWillUnmount = () => {
    eventBus.removeListener('CancelAddOrEdit', this.cancelAddOrEditHandler);

    eventBus.removeListener('AddNewClient', this.addNewClientHandler);

    eventBus.removeListener('StartEditClient', this.startEditClientHandler);

    eventBus.removeListener('SaveChangesInClient', this.saveChangesHandler);

    eventBus.removeListener('DeleteClient', this.deleteClientHandler);
  };

  render() {
    const clientsCode = this.state.clients.map((client) => (
      <MobileClient key={client.id} info={client} />
    ));

    return (
      <div className='Mobile'>
        <input type='button' value='Все' onClick={this.showAll} />
        <input type='button' value='Активные' onClick={this.showActive} />
        <input
          type='button'
          value='Заблокированные'
          onClick={this.showBlocked}
        />
        <div className='Mobile__tableHeaders'>
          <div>Фамилия</div>
          <div>Имя</div>
          <div>Отчество</div>
          <div>Баланс</div>
          <div>Статус</div>
          <div>Редактировать</div>
          <div>Удалить</div>
        </div>

        {clientsCode}
        <input
          type='button'
          value='Добавить клиента'
          onClick={this.addClient}
        />

        {this.state.workMode === 1 && (
          <EditClient clientInfo={this.state.clientEditInfo} />
        )}

        {this.state.workMode === 2 && <AddClient />}
      </div>
    );
  }
}

export default Mobile;
