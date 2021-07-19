const React = require('react');
const { useState, useRef } = React;

const GuGuDan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);  // DOM에 접근

  const onChangeInput = (e) => {
    setValue(e.target.value);
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (parseInt(value) === first * second) {
      setResult(`${first} x ${second} = ${value} 정답!`); // prevResult 사용법?
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
