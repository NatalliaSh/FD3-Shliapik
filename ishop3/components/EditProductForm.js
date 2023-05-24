import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './EditProductForm.css';

import { validator } from '../js/validate';

class EditProductForm extends React.Component {
  static propTypes = {
    product: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
      imgURL: PropTypes.string.isRequired,
    }),
    cbEditStarted: PropTypes.func.isRequired,
    cbSave: PropTypes.func.isRequired,
    cbcancel: PropTypes.func.isRequired,
  };

  state = {
    productName: this.props.product.name,
    productPrice: this.props.product.price,
    productImgURL: this.props.product.imgURL,
    productCount: this.props.product.count,
    productNameError: '',
    productPriceError: '',
    productImgURLError: '',
    productCountError: '',
    isValid: false,
  };

  /* componentDidUpdate = (oldProps, oldState) => {
    if (oldProps.product.id !== this.props.product.id) {
      this.setState({
        productName: this.props.product.name,
        productPrice: this.props.product.price,
        productImgURL: this.props.product.imgURL,
        productCount: this.props.product.count,
      });
    }
  };*/ //в данном случае лучше в shop к EditProductForm добавить key и сделать перемонтирование

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

  save = () => {
    this.props.cbSave(this.props.product.id, {
      name: this.state.productName,
      price: parseFloat(this.state.productPrice),
      imgURL: this.state.productImgURL,
      count: parseFloat(this.state.productPrice),
    });
  };

  cancel = () => {
    this.setState(
      {
        productName: this.props.product.name,
        productPrice: this.props.product.price,
        productImgURL: this.props.product.imgURL,
        productCount: this.props.product.count,
      },
      this.props.cbcancel,
    );
  };

  render() {
    return (
      <div className='EditProductForm'>
        <h3>Редактировать выбранный продукт</h3>
        <div className='EditProductForm__id'>ID: {this.props.product.id}</div>
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

        <button onClick={this.save} disabled={!this.state.isValid}>
          Сохранить
        </button>
        <button onClick={this.cancel}>Отменить</button>
      </div>
    );
  }
}

export default EditProductForm;
