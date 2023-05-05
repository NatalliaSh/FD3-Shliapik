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

  cbInputChangeHandler: function (text) {
    var sortedWords = this.state.checked
      ? this.filter(text, true)
      : this.filter(text, false);

    this.setState({ inputText: text, words: sortedWords });
  },

  filter: function (text, isSorted) {
    var filteredWordsArr = this.props.defwords.filter(
      (word) => word.toLowerCase().indexOf(text.toLowerCase()) !== -1,
    );

    return isSorted
      ? filteredWordsArr.sort().join('\n')
      : filteredWordsArr.join('\n');
  },

  cbCheckboxChangeHandler: function () {
    this.state.checked
      ? this.setState({
          checked: false,
          words: this.filter(this.state.inputText, false),
        })
      : this.setState({
          checked: true,
          words: this.filter(this.state.inputText, true),
        });
  },

  cbClickButtonHandler: function () {
    this.setState({
      checked: false,
      inputText: '',
      words: this.props.defwords.join('\n'),
    });
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
