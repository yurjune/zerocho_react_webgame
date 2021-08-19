import React, { useContext, memo } from 'react';
import { TableContext } from './MineSearch';
import Tr from './Tr';

const Table = memo(() => {
  const { tableData } = useContext(TableContext);
  return (
    <table>
      <tbody>
        {Array(tableData.length).fill().map((v, i) =>
          <Tr rowIndex={i} />
        )}
      </tbody>
    </table>
  )
});

export default Table;
