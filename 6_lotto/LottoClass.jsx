import React, { Component } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getWinNumbers');
  // fill() 사용시 elements가 undefined로 초기화
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    // candidate배열에서 랜덤하게 삭제한 요소를 shuffle배열에 push
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c); // return p-c는 숫자 오름차순 정렬
  return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
  state = {
    /* getWinNumbers를 상태에 넣는이유:
    클래스 컴포넌트 밖에서 함수가 선언되었기 때문에 컴포넌트에 종속되지 않음
    그래서 상태에 넣지 않으면 컴포넌트 재사용시 문제가 될 수 있다
    */
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  };
  
  timeouts = [];

  runTimeouts = () => {
    console.log('runTimeouts');
    const { winNumbers } = this.state;
    // winNumbers의 7개 공 중 6개가 winBalls, 1개가 bonus
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        // 아래 setState의 콜백에서 return+중괄호 생략이 동작 안한다 왜일까??
        this.setState(prevState => {
          return { winBalls: [...prevState.winBalls, winNumbers[i]] };
        });
      }, (i + 1) * 1000);
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000);
  }

  componentDidMount() {
    console.log('didMount');
    this.runTimeouts();
    console.log('로또 숫자를 생성합니다.');
  }

  componentDidUpdate(prevProps, prevState) {
    const { winBalls, winNumbers } = this.state;
    console.log('didUpdate');
    if (winBalls.length === 0) {
      this.runTimeouts();
    }
    if (prevState.winNumbers !== winNumbers) {
      console.log('로또 숫자를 생성합니다.');
    }
  }

  componentWillUnmount() {
    console.log('willUnmount');
    this.timeouts.forEach(v => {
      clearTimeout(v);
    });
  }

  onClickRedo = () => {
    console.log('onClickRedo');
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  }

  render() {
    const { winBalls, bonus, redo } = this.state;
    const { onClickRedo } = this;
    return(
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map(v => <Ball key={v} number={v} />)}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={onClickRedo}>한 번 더!</button>}
      </>
    );
  }
}

export default Lotto;
