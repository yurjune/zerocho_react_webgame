import React, { useState, useRef } from "react";
import RenderAverage from "./RenderAverage";

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요');
  const [result, setResult] = useState([]);

  /*
  useRef는 DOM에 접근하는 것 이외에도 컴포넌트의 변수 관리에 사용된다.
  항상 current 프로퍼티를 사용한다.
  useState와 useRef의 차이:
  useState는 내용이 변경되면 함수의 return부분이 다시 실행되면서 렌더링이 된다
  useRef는 내용이 변경되도 리렌더링이 되지 않는다
  */
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === 'waiting') {
      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);  // 2~3초 사이 
      setState('ready');
      setMessage('초록색이 되면 클릭하세요');
    } else if (state === 'ready') {
      clearTimeout(timeout.current);
      setState('waiting');
      setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요');
    } else if (state === 'now') {
      endTime.current = new Date();
      setState('waiting');
      setMessage('클릭해서 시작하세요');
      setResult(prevResult => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  }

  const onReset = () => {
    setResult([]);
  }

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {/* <RenderAverage resultInfo={result} resetInfo={onReset}/> */}
      {/* return 내부에서 조건문, 반복문 사용: 즉시실행함수 이용 */}
      {(() => {
        if (result.length === 0) {
          return null;
        } else {
          return <>
            <span>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</span>
            <button id="btn" onClick={onReset}>리셋</button>
          </>
        }
      })()}
    </>
  )
}

export default ResponseCheck;
