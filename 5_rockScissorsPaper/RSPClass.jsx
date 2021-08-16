/* 
클래스에서 컴포넌트의 라이프사이클:
constructor -> 첫 render -> ref -> componentDidMount
setState/props바뀔 때 -> shouldComponentUpdate(true) -> render -> componentDidUpdate 
부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸

hooks는 라이프 사이클이 없지만 흉내를 낸다.
*/

import React, { Component } from 'react';

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];  // '가위' or '바위' or '보'
};

class RSP extends Component {
  state = {
    result: '',
    imgCoord: rspCoords.바위,
    score: 0,
  }

  interval;

  // 컴포넌트가 첫 렌더링된 후 실행, 여기에 비동기 요청을 많이 한다.
  componentDidMount() {
    this.interval = setInterval(this.changeHand, 100);
  }
  
  // 리렌더링시 실행
  componentDidUpdate() {}

  // 컴포넌트가 제거되기 직전에 실행, 비동기 요청 정리를 많이 한다.
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  changeHand = () => {
    // cf) 비동기함수가 바깥 변수를 참조하면 클로저문제가 발생한다.
    // 그림: 바위 -> 가위 -> 보 순서
    const { imgCoord } = this.state;
    if (imgCoord === rspCoords.바위) {
      this.setState({ imgCoord: rspCoords.가위 });
    } else if (imgCoord === rspCoords.가위) {
      this.setState({ imgCoord: rspCoords.보 });
    } else if (imgCoord === rspCoords.보) {
      this.setState({ imgCoord: rspCoords.바위 });
    } 
  }

  onClickBtn = (choice) => () => {  // high-order-function
    const { imgCoord } = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;

    // 내가 이기면 diff는 -1 or 2, 지면 1 or -2
    if (diff === 0) {
      this.setState({
        result: '비겼습니다!',
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: '이겼습니다!',
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: '졌습니다!',
          score: prevState.score - 1,
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 100);
    }, 1000);
  };



  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
        <div className="btn">
          <button id="rock" onClick={this.onClickBtn('바위')}>바위</button>
          <button id="scissors" onClick={this.onClickBtn('가위')}>가위</button>
          <button id="paper" onClick={this.onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
}

export default RSP;
