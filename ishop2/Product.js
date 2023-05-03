var Product = React.createClass({
  displayName: 'Product',

  propTypes: {
    product: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      id: React.PropTypes.string.isRequired,
      price: React.PropTypes.number.isRequired,
      count: React.PropTypes.number.isRequired,
      imgURL: React.PropTypes.string.isRequired,
    }),
    cbCheckProductHandler: React.PropTypes.func.isRequired,
  },

  checkProductHandler: function (code) {
    console.log(code);
  },

  render: function () {
    return React.DOM.tr(
      {
        key: this.props.product.id,
        id: this.props.product.id,
        className: 'Product',
        onClick: ({ currentTarget: { id } }) => this.checkProductHandler(id),
      },
      React.DOM.td(
        { className: 'Product__img' },
        React.DOM.img({ src: `${this.props.product.imgURL}` }, null),
      ),
      React.DOM.td({ className: 'Product__name' }, this.props.product.name),
      React.DOM.td(
        { className: 'Product__price' },
        this.props.product.price + ' BYN',
      ),
      React.DOM.td({ className: 'Product__count' }, this.props.product.count),
      React.DOM.td(
        { className: 'Product__control' },
        React.DOM.button(null, 'Удалить'),
      ),
    );
  },
});
