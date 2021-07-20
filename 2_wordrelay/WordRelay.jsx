const React = require('react');
const { useState, useRef } = React;

const WordRelay = () => {
  const [word, setWord] = useState('비행기');
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const onChangeInput = (e) => {
    setValue(e.target.value);
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult("정답");
      setWord(value);
      setValue('');
    } else {
      setResult("땡");
      setValue('');
    }
    inputRef.current.focus();
  }

  return(
    <>
      <div>제시어: {word}</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputRef} type="text" value={value} onChange={onChangeInput}/>
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  )
}

module.exports = WordRelay
