import React from 'react';
import PropTypes from 'prop-types';

import './ProductCard.css';

class ProductCard extends React.Component {
  static propTypes = {
    product: PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      imgURL: PropTypes.string.isRequired,
    }),
  };

  render() {
    return (
      <div className='ProductCard'>
        <h4 className='ProductCard__name'>{this.props.product.name}</h4>
        <img className='ProductCard__img' src={this.props.product.imgURL}></img>
        <p className='Product__price'>
          Price: <span> {this.props.product.price + ' BYN'} </span>
        </p>
      </div>
    );
  }
}

export default ProductCard;
