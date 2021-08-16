import React, { PureComponent } from 'react'

class RenderAverage extends PureComponent {
  render() {
    const { resultInfo, resetInfo } = this.props;

    // 방법1: 부호연산자 이용
    return resultInfo.length !== 0 && <>
      <span>평균 시간: {resultInfo.reduce((a, c) => a + c) / resultInfo.length}ms</span>
      <button id="btn" onClick={resetInfo}>리셋</button>
    </>

    // // 방법2: 삼항연산자 이용
    // return resultInfo.length === 0
    //   ? null  // null, false, undefined: 태그없음을 의미
    //   : <>
    //     <span>평균시간: {resultInfo.reduce((a, c) => a + c) / resultInfo.length}ms</span>
    //     <button id="btn" onClick={resetInfo}>리셋</button>
    //   </>
  }
}

export default RenderAverage;
