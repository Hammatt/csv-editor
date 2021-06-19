import React, { useEffect, useState, ChangeEvent, FC } from 'react';

interface CellProps {
  initialValue: string;
  onUpdate: (newValue: string) => void;
}

const Cell:FC<CellProps> = (cellProps: CellProps) => {
  const [value, setValue] = useState(cellProps.initialValue);
  useEffect(() => {
    setValue(cellProps.initialValue)
  }, [cellProps.initialValue]);
  
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onBlur = () => {
    cellProps.onUpdate(value);
  };

  return (
    <td>
      <input value={value} onChange={onChange} onBlur={onBlur} />
    </td>
  );
};

export default Cell;
