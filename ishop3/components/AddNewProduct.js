import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './AddNewProduct.css';
import { validator } from '../js/validate';

class AddNewProduct extends React.Component {
  static propTypes = {
    cbEditStarted: PropTypes.func.isRequired,
    cbAdd: PropTypes.func.isRequired,
    cbCancelAdd: PropTypes.func.isRequired,
  };

  state = {
    id: Date.now(),
    productName: '',
    productPrice: '',
    productImgURL: '',
    productCount: '',
    productNameError:
      'Поле не может быть пустым. Значение должно быть строковым',
    productPriceError:
      'Поле не может быть пустым. Значение должно быть числом, больше 0',
    productImgURLError:
      'Поле не может быть пустым. Значение должно быть строковым',
    productCountError:
      'Поле не может быть пустым. Значение должно быть числом,которое больше 0',
    isValid: false,
  };

  changeProductName = (value) => {
    this.setState({ productName: value }, () => this.validate('productName'));
  };
  changeProductPrice = (value) => {
    this.setState({ productPrice: value }, () => this.validate('productPrice'));
  };
  changeProductImgURL = (value) => {
    this.setState({ productImgURL: value }, () =>
      this.validate('productImgURL'),
    );
  };
  changeProductCount = (value) => {
    this.setState({ productCount: value }, () => this.validate('productCount'));
  };

  validate = (nameOfStateProperty) => {
    validator(nameOfStateProperty, this);
  };

  editStarted = () => {
    this.props.cbEditStarted();
  };

  add = () => {
    this.props.cbAdd({
      id: String(this.state.id),
      name: this.state.productName,
      price: parseFloat(this.state.productPrice),
      imgURL: this.state.productImgURL,
      count: parseFloat(this.state.productCount),
    });
  };

  cancel = () => this.props.cbCancelAdd();

  render() {
    return (
      <div className='AddNewProduct'>
        <h3>Добавить новый продукт</h3>
        <div className='AddNewProduct__id'>ID: {this.state.id}</div>
        <label>
          <div className='fieldName'>Наименование товара</div>
          <input
            type='text'
            value={this.state.productName}
            onChange={({ target: { value } }) => {
              this.changeProductName(value);
              this.editStarted();
            }}
          ></input>
          <div className='error'>{this.state.productNameError}</div>
        </label>

        <label>
          <div className='fieldName'>Цена</div>
          <input
            type='text'
            value={this.state.productPrice}
            onChange={({ target: { value } }) => {
              this.changeProductPrice(value);
              this.editStarted();
            }}
          ></input>
          <div className='error'>{this.state.productPriceError}</div>
        </label>

        <label>
          <div className='fieldName'>URL</div>
          <input
            type='text'
            value={this.state.productImgURL}
            onChange={({ target: { value } }) => {
              this.changeProductImgURL(value);
              this.editStarted();
            }}
          ></input>
          <div className='error'>{this.state.productImgURLError}</div>
        </label>

        <label>
          <div className='fieldName'>Количество</div>
          <input
            type='text'
            value={this.state.productCount}
            onChange={({ target: { value } }) => {
              this.changeProductCount(value);
              this.editStarted();
            }}
          ></input>
          <div className='error'>{this.state.productCountError}</div>
        </label>

        <button onClick={this.add} disabled={!this.state.isValid}>
          Добавить
        </button>
        <button onClick={this.cancel}>Отменить</button>
      </div>
    );
  }
}

export default AddNewProduct;
