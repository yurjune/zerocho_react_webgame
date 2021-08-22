import React, { useState, useRef, useCallback } from 'react';
import Try from "./Try";

function getNumbers() { // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

const NumberBaseball = () => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);
  const inputEl = useRef(null);
  
  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    if (value === answer.join('')) {
      alert('홈런! 게임을 다시 시작합니다!');
      setResult('홈런!');
      setValue('');
      setAnswer(getNumbers());
      setTries([]);
      inputEl.current.focus();
    } else {
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        alert('실패ㅠㅠ 게임을 다시 시작합니다!');
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}이었습니다!`);
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
        inputEl.current.focus();
      } else {
        console.log('답은', answer.join(''));
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setTries(prevTries => {
          return [...prevTries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`}]
        });
        setValue('');
        inputEl.current.focus();
      }
    }
  }, [value, answer]);
  
  const onChangeInput = (e) => {
    setValue(e.target.value);
  }
  
  return (
    <>
    <h2>숫자야구 게임하기!</h2>
    <h2>{result}</h2>
    <form onSubmit={onSubmitForm}>
      <span>입력: </span>
      <input ref={inputEl} maxLength={4} value={value} onChange={onChangeInput}/>
    </form>
    <div>시도: {tries.length}</div>
    <ul>
      {tries.map((v, i) => {
        return (
          < Try key={`${i + 1}차 시도 :`} tryInfo={v} />
        )
      })}
    </ul>
  </>
  )
}

export default NumberBaseball;
