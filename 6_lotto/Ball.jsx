import React, { memo } from 'react';

// hook와 함수 컴포넌트는 다르다. 함수 컴포넌트에서 hook을 호출한다.
// hook은 useState, useEffect와 같은 것
const Ball = memo(({ number }) => {
  let background;
  if (number <= 10) {
    background = 'red';
  } else if (number <= 20) {
    background = 'orange';
  } else if (number <= 30) {
    background = 'yellow';
  } else if (number <= 40) {
    background = 'blue';
  } else {
    background = 'green';
  }

  return (
    // style 중괄호 2개: 왜??
    <div className="ball" style={{ background }}>{number}</div>
  )
});

export default Ball;
