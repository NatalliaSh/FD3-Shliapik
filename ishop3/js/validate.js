export const validator = (nameOfStateProperty, self) => {
  const emptyError = self.state[nameOfStateProperty]
    ? ''
    : 'Поле не может быть пустым';

  let numberError = '';
  if (
    nameOfStateProperty === 'productPrice' ||
    nameOfStateProperty === 'productCount'
  ) {
    numberError =
      isNaN(self.state[nameOfStateProperty]) ||
      self.state[nameOfStateProperty] <= 0
        ? 'Введите числовое значение. Значение должно быть больше 0'
        : '';
  }

  const errorNameinState = nameOfStateProperty + 'Error';

  self.setState(
    {
      [errorNameinState]: emptyError || numberError,
    },
    () => {
      self.setState({
        isValid: !(
          emptyError ||
          numberError ||
          self.state.productNameError ||
          self.state.productPriceError ||
          self.state.productImgURLError ||
          self.state.productCountError
        ),
      });
    },
  );
};
