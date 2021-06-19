import React, { FC } from 'react';
import './Table.css';
import Cell from '../Cell/Cell';
import Csv from '../../models/Csv';

interface TableProps {
  csv: Csv;
}

const Table:FC<TableProps> = (tableProps: TableProps) => {
  const onCellUpdate = (row: number, column: number, value: string) => {
    tableProps.csv.data[row][column] = value;
  };

  return (
    <table>
      <thead>
        <tr>
          {tableProps.csv.columnHeadings.map((value, index) => {
            return <th key={index}>{value}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {tableProps.csv.data.map((value, row) => {
          return <tr key={row}>
            {value.map((value, column) => {
              return <Cell key={row + column} initialValue={value} onUpdate={(value: string) => onCellUpdate(row, column, value)} />
            })}
          </tr>
        })}
      </tbody>
    </table>
  );
};

export default Table;
