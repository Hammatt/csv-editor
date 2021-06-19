import Csv from "../models/Csv";

// https://datatracker.ietf.org/doc/html/rfc4180
const useCsvExport: () => (csv: Csv) => string = () => {
  const getRow: (row: string[]) => string = (row) => {
    let result = '';

    let firstCell = true;
    for (const cell of row) {
      if (firstCell) {
        firstCell = false;
      } else {
        result = result + ',';
      }
      if (cell.includes(',')) {
        result = result + '"' + cell + '"';
      } else {
        result = result + cell;
      }
    }

    result = result + '\r\n';

    return result;
  };

  return (csv: Csv) => {
    let buffer: string = '';

    //TODO: make headers optional
    buffer = buffer + getRow(csv.columnHeadings);

    for (const row of csv.data) {
      buffer = buffer + getRow(row);
    }

    return buffer;
  };
};

export default useCsvExport;
