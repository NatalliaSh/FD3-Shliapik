import React from 'react';
import PropTypes from 'prop-types';

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
    return (
      <table className='Shop' style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr className='Shop__header'>
            <th className='Shop__header--img'>Товар</th>
            <th className='Shop__header--name'>
              Наименование
              <br></br>
              товара
            </th>
            <th className='Shop__header--price'>Цена</th>
            <th className='Shop__header--count'>Количество</th>
            <th className='Shop__header--control'>Control</th>
          </tr>
        </thead>
        <tbody>
          {this.state.products.map((element) => {
            return (
              <Product
                key={element.id}
                product={element}
                cbCheckProductHandler={this.checkProductHandler}
                cbdeleteButtonHandler={this.deleteButtonHandler}
                selected={this.state.checkedProduct === element.id}
              ></Product>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Shop;
