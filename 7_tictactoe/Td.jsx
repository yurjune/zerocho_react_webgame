import React, { useCallback, useRef, useEffect, memo } from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td = memo(({ rowIndex, cellIndex, cellData, dispatch }) => {
  console.log('td rendered');

  // 무엇때문에 렌더링 되는지 확인하는 법
  const ref = useRef([]);
  useEffect(() => {
    // 여기서 false가 나오는 것이 바뀐 요소
    console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], cellData === ref.current[2],
      dispatch === ref.current[3]);
    ref.current = [rowIndex, cellIndex, cellData, dispatch];
  }, [rowIndex, cellIndex, cellData, dispatch]);

  const onClickTd = useCallback(() => {
    // console.log(rowIndex, cellIndex);
    if (cellData) {
      return;
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);

  return(
    <td onClick={onClickTd}>{cellData}</td>
  )
});

export default Td;
