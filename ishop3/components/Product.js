import React from 'react';
import PropTypes from 'prop-types';

import './Product.css';

class Product extends React.Component {
  static propTypes = {
    product: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
      imgURL: PropTypes.string.isRequired,
    }),
    cbCheckProductHandler: PropTypes.func.isRequired,
    selected: PropTypes.bool,
    cbdeleteButtonHandler: PropTypes.func.isRequired,
    cbEditButtonHandler: PropTypes.func.isRequired,
    isEditStart: PropTypes.bool,
  };

  checkProductHandler = () => {
    this.props.cbCheckProductHandler(this.props.product.id);
  };

  deleteButtonHandler = () => {
    this.props.cbdeleteButtonHandler(this.props.product.id);
  };

  editButtonHandler = () => {
    this.props.cbEditButtonHandler(this.props.product.id);
  };

  render() {
    return (
      <tr
        className='Product'
        onClick={this.checkProductHandler}
        style={
          this.props.selected && !this.props.isEditStart
            ? { backgroundColor: '#f76868' }
            : null
        }
      >
        <td className='Product__img'>
          <img src={this.props.product.imgURL}></img>
        </td>
        <td className='Product__name'>{this.props.product.name}</td>
        <td className='Product__price'>{this.props.product.price + ' BYN'}</td>
        <td className='Product__count'>{this.props.product.count}</td>
        <td className='Product__control'>
          <button
            disabled={this.props.isEditStart}
            onClick={(EO) => {
              this.editButtonHandler();
              EO.stopPropagation();
            }}
          >
            Редактировать
          </button>
          <button
            disabled={this.props.isEditStart}
            onClick={(EO) => {
              this.deleteButtonHandler();
              EO.stopPropagation();
            }}
          >
            Удалить
          </button>
        </td>
      </tr>
    );
  }
}

export default Product;
