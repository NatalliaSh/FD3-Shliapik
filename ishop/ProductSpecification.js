var ProductSpecification = React.createClass({
  displayName: 'ProductSpecification',

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
    return React.DOM.tbody(
      { className: 'ProductSpecification' },
      React.DOM.tr(
        { className: 'ProductSpecification__shopName' },
        React.DOM.th({ colSpan: 4 }, this.props.shop),
      ),
      this.props.products.map((product) =>
        React.DOM.tr(
          { key: product.id, className: 'ProductSpecification__selfProduct' },
          React.DOM.td(
            { className: 'img' },
            React.DOM.img({ src: `${product.imgURL}` }, null),
          ),
          React.DOM.td({ className: 'name' }, product.name),
          React.DOM.td({ className: 'price' }, product.price + ' BYN'),
          React.DOM.td({ className: 'count' }, product.count),
        ),
      ),
    );
  },
});
