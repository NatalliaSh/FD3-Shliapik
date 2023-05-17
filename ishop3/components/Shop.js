import React from 'react';
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';

import './Shop.css';

import Product from './Product';

class Shop extends React.Component {
  static propTypes = {
    defproducts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
        imgURL: PropTypes.string.isRequired,
      }),
    ),
  };

  state = {
    products: this.props.defproducts,
    checkedProduct: null,
  };

  checkProductHandler = (id) => {
    this.setState({ checkedProduct: id });
  };

  deleteButtonHandler = (id) => {
    this.setState((prevState, props) => {
      var productArr = prevState.products.filter(
        (element) => element.id !== id,
      );

      return { products: productArr };
    });
  };

  render() {
    return DOM.table(
      {
        className: 'Shop',
        style: { borderCollapse: 'collapse' },
      },

      DOM.thead(
        null,
        DOM.tr(
          { className: 'Shop__header' },
          DOM.th({ className: 'Shop__header--img' }, 'Товар'),
          DOM.th(
            { className: 'Shop__header--name' },
            'Наименование',
            DOM.br(null, null),
            'товара',
          ),
          DOM.th({ className: 'Shop__header--price' }, 'Цена'),
          DOM.th({ className: 'Shop__header--count' }, 'Количество'),
          DOM.th({ className: 'Shop__header--control' }, 'Control'),
        ),
      ),

      DOM.tbody(
        null,
        this.state.products.map((element) => {
          return React.createElement(Product, {
            key: element.id,
            product: element,
            cbCheckProductHandler: this.checkProductHandler,
            cbdeleteButtonHandler: this.deleteButtonHandler,
            selected: this.state.checkedProduct === element.id,
          });
        }),
      ),
    );
  }
}

export default Shop;
