import React from 'react';
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';

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
  };

  checkProductHandler = () => {
    this.props.cbCheckProductHandler(this.props.product.id);
  };

  deleteButtonHandler = () => {
    this.props.cbdeleteButtonHandler(this.props.product.id);
  };

  render() {
    return DOM.tr(
      {
        className: 'Product',
        onClick: this.checkProductHandler,
        style: this.props.selected ? { backgroundColor: '#f76868' } : null,
      },
      DOM.td(
        { className: 'Product__img' },
        DOM.img({ src: `${this.props.product.imgURL}` }, null),
      ),
      DOM.td({ className: 'Product__name' }, this.props.product.name),
      DOM.td(
        { className: 'Product__price' },
        this.props.product.price + ' BYN',
      ),
      DOM.td({ className: 'Product__count' }, this.props.product.count),
      DOM.td(
        { className: 'Product__control' },
        DOM.button(
          {
            onClick: (EO) => {
              this.deleteButtonHandler();
              EO.stopPropagation();
            },
          },
          'Удалить',
        ),
      ),
    );
  }
}

export default Product;
