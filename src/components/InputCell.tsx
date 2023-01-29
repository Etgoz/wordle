import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import { IUseWordle } from '../hooks/useWordle';

export type CellProps = {
  rowNumber: number;
  cellNumber: number;
};

export function InputCell({ rowNumber, cellNumber }: CellProps): JSX.Element {
  const { currentCell, refMatrix } = useContext(AppContext) as IUseWordle;
  const { curRow, curCell } = currentCell;
  const isCurrentCell: boolean = rowNumber === curRow && cellNumber === curCell;
  const letterStatus = refMatrix[rowNumber][cellNumber].status;
  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => cellRef.current?.focus(), [currentCell]);

  return (
    <div ref={cellRef} className={`input ${isCurrentCell && 'focused'} ${letterStatus}`} tabIndex={rowNumber * 5 + cellNumber + 1}>
      {refMatrix[rowNumber][cellNumber].content}
    </div>
  );
}
