import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getWinNumbers');
  // fill() 사용시 elements가 undefined로 초기화
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    // candidate배열에서 랜덤하게 삭제한 요소를 shuffle배열에 push
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1));
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c); // return p-c는 숫자 오름차순 정렬
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  // useMemo는 함수의 리턴값을 기억, useCallback은 함수 자체를 기억
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumber] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  const runTimeouts = () => {
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls(prevBall => [...prevBall, winNumbers[i]]);
      }, (i+1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7 * 1000);
  }

  // 첫 렌더링 때 말고 리렌더링때만 useEffect 실행하는법
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      // code
    }
  }, [/* code */]);


  useEffect(() => {
    console.log('useEffect');
    runTimeouts();
    console.log('로또 숫자를 생성합니다');
    return () => {
      timeouts.current.forEach(v => {
        console.log('삭제됩니다.');
        clearTimeout(v);
      });
    }
  }, [timeouts.current]);

  /*
  함수 생성자체가 고비용일 때 useCallback으로 기억하면 좋다.
  함수를 자식컴포넌트에게 props로 넘겨줄경우 useCallback을 사용하지 않으면
  매번 함수를 생성할때마다 props를 새로 넘겨주어 자식은 매번 새로 렌더링한다.
  */
  const onClickRedo = useCallback(() => {
    console.log('onClickRedo');
    console.log(winNumbers);
    setWinNumber(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]);

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map(v => <Ball key={v} number={v}/>)}
      </div>
      <div>보너스</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
}

export default Lotto;
