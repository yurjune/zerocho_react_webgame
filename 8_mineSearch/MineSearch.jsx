import React, { useEffect, useReducer, createContext, useMemo } from 'react';
import Form from './Form';
import Table from './Table';

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0,  // 0 이상은 다 OPENED
}

export const TableContext = createContext({
  // 초기 값
  tableData: [],
  dispatch: () => {},
  halted: true,
});

const initialState = {
  tableData: [],
  data: {
    row: 0,
    cell: 0,
    mine: 0,
  },
  timer: 0,
  result: '',
  halted: true,
  openedCount: 0,
};

const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  const candidate = Array(row * cell).fill().map((v, i) => {
    return i; // 0부터 99까지의 숫자
  });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1);
    shuffle.push(chosen);
  }
  const data = []
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor((shuffle[k] / cell));
    const hor = Math.floor((shuffle[k] % cell));
    data[ver][hor] = CODE.MINE;
  }
  console.log(data);
  return data;
}

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        data: {
          row: action.row,
          cell: action.cell,
          mine: action.mine,
        },
        tableData: plantMine(action.row, action.cell, action.mine),
        timer: 0,
        result: '',
        halted: false,
        openedCount: 0,
      }
    case OPEN_CELL: {
      const tableData = [...state.tableData];
      /* 재귀를 통해 주변에 지뢰가 없을시 한번에 열기 구현할 때
      클릭한 칸 뿐만 아니라 주변 칸들도 불변성을 지켜줘야한다
      따라서 모든 칸들을 새로 만들어 준다
      */
      tableData.forEach((row, i) => {
        tableData[i] = [...state.tableData[i]];
      });
      let openedCount = 0;
      const checked = []
      const checkAround = (row, cell) => {
        if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) {
          return;
        } // 게임판 바깥은 안열기
        if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) {
          return;
        } // 닫힌 칸만 열기
        if (checked.includes(row + ',' + cell)) {
          return;
        } else {
          checked.push(row + ',' + cell)
        } // 이미 열린 칸 무시하기
        let around = [
          tableData[row][cell - 1], tableData[row][cell + 1],
        ];
        // row의 경우만 게임판을 벗어났는지 검사하는 이유:
        // undefined[cell] 같이 undefined 속성에 접근하는 경우에 에러가 남
        if (tableData[row - 1]) {
          around = around.concat([tableData[row - 1][cell - 1], tableData[row - 1][cell], tableData[row - 1][cell + 1]]);
        }
        if (tableData[row + 1]) {
          around = around.concat([tableData[row + 1][cell - 1], tableData[row + 1][cell], tableData[row + 1][cell + 1]]);
        }
        const count = around.filter(v => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
        if (count === 0) {  // 주변에 지뢰가 없으면
          const near = [];
          if (row > 0) {
            near.push([row - 1, cell - 1]);
            near.push([row - 1, cell]);
            near.push([row - 1, cell + 1]);
          }
          near.push([row, cell - 1]);
          near.push([row, cell + 1]);
          if (row < tableData.length - 1) {
            near.push([row + 1, cell - 1]);
            near.push([row + 1, cell]);
            near.push([row + 1, cell + 1]);
          }
          near.forEach(n => {
            if (tableData[n[0]][n[1]] !== CODE.OPENED) {
              checkAround(n[0], n[1]);
            }
          });
        }
        if (tableData[row][cell] === CODE.NORMAL) { // 닫힌 칸일때만 카운트 증가
          openedCount += 1;
        }
        tableData[row][cell] = count;
      }
      checkAround(action.row, action.cell);
      let halted = false;
      let result = '';
      console.log(state.data.row * state.data.cell - state.data.mine, state.openedCount + openedCount);
      if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) { // 승리
        halted = true;
        result = `${state.timer}초만에 승리하셨습니다!`;
      }
      return {
        ...state,
        tableData,
        openedCount: state.openedCount + openedCount,
        halted,
        result,
      }
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true, // 게임 멈추기
      }
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      }
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      }
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE;
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      }
    }
    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
      }
    }
    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, halted } = state;

  // 자식들 매번 리렌더링 방지
  const value = useMemo(() => ({ tableData, dispatch, halted }), [tableData, halted]);

  useEffect(() => {
    let timer;
    if (halted === false) {
      timer = setInterval(() => {
        dispatch({ type: INCREMENT_TIMER });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    }
  }, [halted]);

  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>time: {state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>
  )
}

export default MineSearch;
