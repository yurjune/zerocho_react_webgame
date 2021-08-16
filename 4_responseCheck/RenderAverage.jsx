import React, { memo } from 'react';

const RenderAverage = memo(({resultInfo, resetInfo}) => {
  return resultInfo.length === 0
    ? null
    : <>
      <span>평균 시간: {resultInfo.reduce((a, c) => a + c) / resultInfo.length}ms</span>
      <button id="btn" onClick={resetInfo}>리셋</button>
    </>
});

export default RenderAverage;
