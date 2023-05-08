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
    selected: React.PropTypes.bool,
    cbdeleteButtonHandler: React.PropTypes.func.isRequired,
  },

  checkProductHandler: function () {
    this.props.cbCheckProductHandler(this.props.product.id);
  },

  deleteButtonHandler: function () {
    this.props.cbdeleteButtonHandler(this.props.product.id);
  },

  render: function () {
    return React.DOM.tr(
      {
        className: 'Product',
        onClick: this.checkProductHandler,
        style: this.props.selected ? { backgroundColor: '#f76868' } : null,
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
        React.DOM.button(
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
  },
});
