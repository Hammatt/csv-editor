import React, { FC } from 'react';
import './Table.css';
import Csv from '../../models/Csv';

interface TableProps {
  csv: Csv;
}

const Table:FC<TableProps> = (tableProps: TableProps) => {
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
        {tableProps.csv.data.map((value, index) => {
          return <tr key={index}>
            {value.map((value, index) => {
              return <td key={index}>{value}</td>
            })}
          </tr>
        })}
      </tbody>
    </table>
  );
};

export default Table;
