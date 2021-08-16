import React, { Component, createRef } from 'react';
import Try from './TryClass'

const getNumbers = () => {
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(), // ex: [1,3,5,7]
    tries: [],  // push 사용불가: 리액트가 뭐가 바뀌었는지 감지 못함
    // 새 배열에 기존 배열 복사 후 새 항목을 추가해야 함
    // ex) tries = [...tries, 1]
    // 불변성
  }

  inputRef = createRef();

  onSubmitForm = (e) => {
    const { value, tries, answer } = this.state;
    e.preventDefault();
    if (value === answer.join('')) {
      alert('홈런! 게임을 다시 시작합니다!');
      this.setState({
        result: '홈런!',
        value: '',
        answer: getNumbers(),
        tries: [],
      });
      this.inputRef.current.focus();
    } else { // 답 틀렸으면
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) { // 10번 이상 틀렸을 때
        alert('실패ㅠㅠ 게임을 다시 시작합니다!');
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`,
          value: '',
          answer: getNumbers(),
          tries: [],
        });
        this.inputRef.current.focus();
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return {
            tries: [...prevState.tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`}],
            value: '',
          };
        });
        this.inputRef.current.focus();
      }
    }
  };

  onChangeInput = (e) => {
    console.log(this.state.answer);
    this.setState({ value: e.target.value });
  }

  render() {
    const { result, value, tries } = this.state;
    return(
      <>
        <h2>숫자야구 게임하기!</h2>
        <h2>{result}</h2>
        <form onSubmit={this.onSubmitForm}>
          <span>입력: </span>
          <input ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput}/>
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
}

export default NumberBaseball;
