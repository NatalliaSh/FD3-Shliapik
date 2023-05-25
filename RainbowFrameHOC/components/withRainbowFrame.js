import React, { Fragment } from 'react';

const withRainbowFrame = (colorsArr) => (Component) => (props) => {
  let content = <Component {...props} />;
  for (let color of colorsArr) {
    content = (
      <div
        className='RainbowFrame'
        style={{ border: `solid 3px ${color}`, padding: '10px' }}
      >
        {content}
      </div>
    );
  }
  return <Fragment>{content}</Fragment>;
};

export default withRainbowFrame;

/*function withRainbowFrame(colorsArr) {
  return function (Component) {
    function ComponentWithRainbowFrame(props) {
      let content = <Component {...props} />;
      for (let color of colorsArr) {
        content = (
          <div
            className='RainbowFrame'
            style={{ border: `solid 3px ${color}`, padding: '10px' }}
          >
            {content}
          </div>
        );
      }
      return <Fragment>{content}</Fragment>;
    }
    return ComponentWithRainbowFrame;
  };
}

export default withRainbowFrame;*/

/*function withRainbowFrame(colorsArr) {
  return function (Component) {
    class ComponentWithRainbowFrame extends React.Component {
      render() {
        let content = <Component {...this.props} />;
        for (let color of colorsArr) {
          content = (
            <div
              className='RainbowFrame'
              style={{ border: `solid 3px ${color}`, padding: '10px' }}
            >
              {content}
            </div>
          );
        }
        return <Fragment>{content}</Fragment>;
      }
    }
    return ComponentWithRainbowFrame;
  };
}

export default withRainbowFrame;
*/
