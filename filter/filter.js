var filter = React.createClass({
  displayName: 'filter',

  propTypes: {
    defwords: React.PropTypes.arrayOf(React.PropTypes.string.isRequired),
  },

  getInitialState: function () {
    return {
      words: this.props.defwords.join('\n'),
      inputText: '',
      checked: false,
    };
  },

  cbInputChangeHandler: function (text = '') {
    this.setState((prevState, props) => {
      var sortedWords = this.state.checked
        ? this.filter(text).sort().join('\n')
        : this.filter(text).join('\n');

      return { inputText: text, words: sortedWords };
    });
  },

  filter: function (text) {
    var filteredWordsArr = this.props.defwords.filter(
      (word) => word.toLowerCase().indexOf(text.toLowerCase()) !== -1,
    );

    return filteredWordsArr;
  },

  sort: function () {
    this.setState({ words: this.state.words.split('\n').sort().join('\n') });
  },

  unsort: function () {
    this.setState({ words: this.filter(this.state.inputText).join('\n') });
  },

  cbCheckboxChangeHandler: function () {
    this.state.checked
      ? this.setState({ checked: false }, this.unsort())
      : this.setState({ checked: true }, this.sort());
  },

  cbClickButtonHandler: function () {
    this.setState({ checked: false, inputText: '' }, this.cbInputChangeHandler);
  },

  render: function () {
    return React.DOM.div(
      {
        className: 'Filter',
      },

      React.DOM.div(
        {
          className: 'Filter__userChoice',
        },
        React.DOM.input(
          {
            type: 'checkbox',
            checked: this.state.checked,
            onClick: this.cbCheckboxChangeHandler,
          },
          null,
        ),
        React.DOM.input(
          {
            type: 'text',
            value: this.state.inputText,
            onChange: ({ target: { value } }) =>
              this.cbInputChangeHandler(value),
          },
          null,
        ),
        React.DOM.button(
          { type: 'button ', onClick: this.cbClickButtonHandler },
          'сброс',
        ),
      ),

      React.DOM.div({ className: 'Filter__text' }, this.state.words),
    );
  },
});
