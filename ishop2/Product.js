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

  checkProductHandler: function (EO) {
    this.props.cbCheckProductHandler(EO.currentTarget.id);
  },

  deleteButtonHandler: function (EO) {
    this.props.cbdeleteButtonHandler(EO.target.dataset.id);
  },

  render: function () {
    return React.DOM.tr(
      {
        id: this.props.product.id,
        className: 'Product',
        onClick: (EO) => this.checkProductHandler(EO),
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
            'data-id': this.props.product.id,
            onClick: (EO) => {
              this.deleteButtonHandler(EO);
              EO.stopPropagation();
            },
          },
          'Удалить',
        ),
      ),
    );
  },
});
