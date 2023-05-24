import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './Shop.css';

import Product from './Product';
import ProductCard from './ProductCard';
import EditProductForm from './EditProductForm';
import AddNewProduct from './AddNewProduct';

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
    workMode: 0, //0-start, 1-view, 2-edit, 3-addNewProduct
    products: this.props.defproducts,
    checkedProduct: null,
    isEditStart: false,
  };

  checkProductHandler = (id) => {
    if (!this.state.isEditStart) {
      this.setState({ checkedProduct: id, workMode: 1 });
    }
  };

  deleteButtonHandler = (id) => {
    let isSure = confirm('Вы действительно хотите удалить выбранный товар?');
    if (isSure) {
      this.setState((prevState, props) => {
        const productArr = prevState.products.filter(
          (element) => element.id !== id,
        );

        const workModeNew =
          this.state.checkedProduct === id ? 0 : this.state.workMode;

        return { products: productArr, workMode: workModeNew };
      });
    }
  };

  editButtonHandler = (id) => {
    this.setState({ workMode: 2, checkedProduct: id });
  };

  newButtonHandler = () => {
    this.setState({ workMode: 3, checkedProduct: null });
  };

  editStarted = () => {
    this.setState({ isEditStart: true });
  };

  save = (productID, changes) => {
    const products = this.state.products.slice();
    const productIndex = products.findIndex((prod) => prod.id === productID);
    const product = products[productIndex];
    const modifiedProduct = { ...product, ...changes }; //ключи в changes перебьют ключи в product
    products[productIndex] = modifiedProduct;
    this.setState({
      products,
      workMode: 1,
      isEditStart: false,
    });
  };

  add = (product) => {
    const products = this.state.products.slice();
    products.push(product);
    this.setState({
      products,
      workMode: 0,
      isEditStart: false,
    });
  };

  cancel = () => {
    this.setState({
      workMode: 1,
      isEditStart: false,
    });
  };

  cancelAdd = () => {
    this.setState({
      workMode: 0,
      isEditStart: false,
    });
  };

  render() {
    console.log('render' + this.state.checkedProduct);
    let selectedProduct = this.state.products.find(
      (element) => element.id === this.state.checkedProduct,
    );
    console.log(selectedProduct);
    return (
      <Fragment>
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
                  cbEditButtonHandler={this.editButtonHandler}
                  selected={this.state.checkedProduct === element.id}
                  isEditStart={this.state.isEditStart}
                ></Product>
              );
            })}
          </tbody>
        </table>
        <button
          disabled={this.state.isEditStart}
          onClick={this.newButtonHandler}
        >
          Новый
        </button>
        {this.state.workMode === 1 && (
          <ProductCard product={selectedProduct}></ProductCard>
        )}
        {this.state.workMode === 2 && (
          <EditProductForm
            key={this.state.checkedProduct}
            product={selectedProduct}
            cbEditStarted={this.editStarted}
            cbSave={this.save}
            cbcancel={this.cancel}
          ></EditProductForm>
        )}
        {this.state.workMode === 3 && (
          <AddNewProduct
            cbEditStarted={this.editStarted}
            cbAdd={this.add}
            cbCancelAdd={this.cancelAdd}
          ></AddNewProduct>
        )}
      </Fragment>
    );
  }
}

export default Shop;
