import React, { useState, useRef, useEffect } from 'react';

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

const RSP = () => {
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);
  const interval = useRef();

  useEffect(() => {
    console.log('다시 실행');
    interval.current = setInterval(changeHand, 100);
    return (() => {  // componentWillUnmount 역할
      console.log('종료');
      clearInterval(interval.current);
    });
    // 두 번째 인자 배열에 넣은 값이 바뀔 때 useEffect가 실행
  }, [imgCoord]);

  const changeHand = () => {
    // 그림: 바위 -> 가위 -> 보 순서
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  }

  const onClickBtn = (choice) => () => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(imgCoord)];
      const diff = myScore - cpuScore;
      
      // 내가 이기면 diff는 -1 or 2, 지면 1 or -2
      if (diff === 0) {
        setResult('비겼습니다!');
      } else if ([-1, 2].includes(diff)) {
        setResult('이겼습니다!');
        setScore(prevScore => prevScore + 1)
      } else {
        setResult('졌습니다!');
        setScore(prevScore => prevScore - 1)
      }
      setTimeout(() => {
        interval.current = setInterval(changeHand, 100);
      }, 1000);
    }
  }

  return (
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
      <div className="btn">
        <button id="rock" onClick={onClickBtn('바위')}>바위</button>
        <button id="scissors" onClick={onClickBtn('가위')}>가위</button>
        <button id="paper" onClick={onClickBtn('보')}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  )
}

export default RSP;
