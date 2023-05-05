/*Должно быть описано два компонента — «Магазин» и «Товар».
Один из товаров может быть сделан «выбранным» щелчком в любое место строки. Строка выбранного товара выделяется цветом.
В каждой строке с товаром — кнопка «удалить».
По нажатию кнопки «удалить» у пользователя запрашивается подтверждения удаления (confirm) и товар удаляется. Можно удалить любой товар, не обязательно выделенный; после удаления товара, выделенный товар остаётся выделенным.*/

var Shop = React.createClass({
  displayName: 'Shop',

  propTypes: {
    defproducts: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        count: React.PropTypes.number.isRequired,
        imgURL: React.PropTypes.string.isRequired,
      }),
    ),
  },

  getInitialState: function () {
    return {
      products: this.props.defproducts,
      checkedProduct: null,
    };
  },

  checkProductHandler: function (id) {
    this.setState({ checkedProduct: id });
  },

  deleteButtonHandler: function (id) {
    this.setState((prevState, props) => {
      var productArr = prevState.products.filter(
        (element) => element.id !== id,
      );
      return { products: productArr };
    });
  },

  render: function () {
    return React.DOM.table(
      {
        className: 'Shop',
        style: { borderCollapse: 'collapse' },
      },

      React.DOM.thead(
        null,
        React.DOM.tr(
          { className: 'Shop__header' },
          React.DOM.th({ className: 'Shop__header--img' }, 'Товар'),
          React.DOM.th(
            { className: 'Shop__header--name' },
            'Наименование',
            React.DOM.br(null, null),
            'товара',
          ),
          React.DOM.th({ className: 'Shop__header--price' }, 'Цена'),
          React.DOM.th({ className: 'Shop__header--count' }, 'Количество'),
          React.DOM.th({ className: 'Shop__header--control' }, 'Control'),
        ),
      ),

      React.DOM.tbody(
        null,
        this.state.products.map((element) => {
          return this.state.checkedProduct === element.id
            ? React.createElement(Product, {
                key: element.id,
                product: element,
                cbCheckProductHandler: this.checkProductHandler,
                cbdeleteButtonHandler: this.deleteButtonHandler,
                style: { backgroundColor: '#f76868' },
              })
            : React.createElement(Product, {
                key: element.id,
                product: element,
                cbCheckProductHandler: this.checkProductHandler,
                cbdeleteButtonHandler: this.deleteButtonHandler,
              });
        }),
      ),
    );
  },
});
