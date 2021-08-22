import React, { memo } from 'react';

// memo: state나 props가 바뀌었을 때만 렌더링을 해준다.
// class의 PureComponent와 shouldComponentUpdate에 대응

const RenderAverage = memo(({resultInfo, resetInfo}) => {
  return resultInfo.length === 0
    ? null
    : <>
      <span>평균 시간: {resultInfo.reduce((a, c) => a + c) / resultInfo.length}ms</span>
      <button id="btn" onClick={resetInfo}>리셋</button>
    </>
});

export default RenderAverage;
