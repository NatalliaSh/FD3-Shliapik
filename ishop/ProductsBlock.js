var ProductsBlock = React.createClass({
  displayName: 'ProductsBlock',

  propTypes: {
    shop: React.PropTypes.string.isRequired,
    products: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        count: React.PropTypes.number.isRequired,
        imgURL: React.PropTypes.string.isRequired,
      }),
    ),
  },

  render: function () {
    return React.DOM.table(
      {
        className: 'ProductsBlock',
        style: { borderCollapse: 'collapse' },
      },

      React.DOM.thead(
        null,
        React.DOM.tr(
          { className: 'ProductsBlock__head' },
          React.DOM.th({ className: 'ProductsBlock__header--img' }, 'Товар'),
          React.DOM.th(
            { className: 'ProductsBlock__header--name' },
            'Наименование',
            React.DOM.br(null, null),
            'товара',
          ),
          React.DOM.th({ className: 'ProductsBlock__header--price' }, 'Цена'),
          React.DOM.th(
            { className: 'ProductsBlock__header--count' },
            'Количество',
          ),
        ),
      ),

      React.createElement(ProductSpecification, {
        shop: this.props.shop,
        products: this.props.products,
      }),
    );
  },
});
