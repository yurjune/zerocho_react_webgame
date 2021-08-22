/* 
함수형 컴포넌트는 리렌더링 될 때마다 컴포넌트 전체가 다시 실행된다.
*/
const React = require('react');
const { useState, useRef } = React;

const GuGuDan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onChangeInput = (e) => {
    setValue(e.target.value);
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (parseInt(value) === first * second) {
      setResult(`${first} x ${second} = ${value} 정답!`);
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue('');
    } else {
      setResult('땡');
      setValue('');
    }
    inputRef.current.focus();
  }

  return(
    <>
      <div>{first} 곱하기 {second}는?</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputRef} onChange={onChangeInput} value={value}/>
        <button>입력</button>
      </form>
      <div id="result">{result}</div>
    </>
  )
}

module.exports = GuGuDan;
