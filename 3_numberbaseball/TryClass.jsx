import React, { PureComponent } from 'react';
// PureComponent: shouldComponentUpdate()를 자동으로 적용

class Try extends PureComponent {
  render() {
    const { tryInfo } = this.props;
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    );
  }
}

export default Try;
