/*
useReducer에서 state는 비동기적으로 바뀐다.
비동기state에 따른 결과를 처리할 때는 useEffect를 쓴다.

cf) setState도 비동기
*/

import React, { useEffect, useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ],
  recentCell: [-1, -1], // 없는 칸으로 초기화
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      // 기존 state를 직접 바꾸지 않고 새로운 state를 만듬
      return {
        ...state,
        winner: action.winner,
      };

    case CLICK_CELL:
      const tableData = [...state.tableData];  // 얕은 복사
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],  // 좌표를 기억
      };

    case CHANGE_TURN:
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      };

    case RESET_GAME:
      return {
        ...state,
        turn: 'O',
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', '']
        ],
        recentCell: [-1, -1]
      }

    default:
      return state;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { winner, turn, tableData, recentCell } = state;
  const [ row, cell ] = recentCell;

  const onClickTable = useCallback(() => {
    // dispatch의 인수: action 객체
    dispatch({ type: SET_WINNER, winner: 'O' });
  }, []);

  const checkWin = () => {
    let win = false;
    const td = tableData;
    if (td[row][0] === turn && td[row][1] === turn && td[row][2] === turn) {
      win = true;
    }
    if (td[0][cell] === turn && td[1][cell] === turn && td[2][cell] === turn) {
      win = true;
    }
    if (td[0][0] === turn && td[1][1] === turn && td[2][2] === turn) {
      win = true;
    }
    if (td[0][2] === turn && td[1][1] === turn && td[2][0] === turn) {
      win = true;
    }
    return win;
  }

  useEffect(() => {
    if (row < 0) {
      return; // 첫 렌더링시 실행 방지
    }
    const win = checkWin();
    console.log(win, row, cell, turn);
    if (win) {
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
    } else {
      let all = true;
      tableData.forEach(row => {  // 무승부 검사
        row.forEach(cell => {
          if (!cell) {  // 칸이 비어있다면
            all = false;
          }
        });
      });
      if (all) {
        dispatch({ type: RESET_GAME });
      } else {
        dispatch({ type: CHANGE_TURN });
      }
    }
  }, [tableData]) ;

  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner} 님의 승리!</div>}
    </>
  )
};

export default TicTacToe;
