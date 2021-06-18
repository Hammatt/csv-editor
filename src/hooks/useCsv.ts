import { useState } from 'react';
import Csv from '../models/Csv';

const useCsv = (): [Csv | null, (file: File) => void] => {
  const [csv, setCsv] = useState<Csv | null>(null);

  // https://datatracker.ietf.org/doc/html/rfc4180
  const handleImport = async (file: File) => {

    const csvString = await file.text();

    enum CsvParserState {
      Header,
      Record,
      QuotedField,
    }

    //TODO: make header optional
    let csvParserState: CsvParserState = CsvParserState.Header;
    let unquotedCsvParserState: CsvParserState = CsvParserState.Header;
    let headers: string[] = [];
    let rows: string[][] = [];
    let currentRow: string[] = [];

    let buffer: string = '';

    for (const char of csvString) {
      if (char === '\r') {
        continue;
      }
      switch(csvParserState) {
        case CsvParserState.Header:
          if (char === '"') {
            unquotedCsvParserState = csvParserState;
            csvParserState = CsvParserState.QuotedField;
          } else if (char === ',') {
            headers.push(buffer);
            buffer = '';
          } else if (char === '\n') {
            headers.push(buffer);
            buffer = '';
            csvParserState = CsvParserState.Record;
          } else {
            buffer = buffer + char;
          }
          break;
        case CsvParserState.QuotedField:
          if (char === '"') {
            csvParserState = unquotedCsvParserState;
          } else {
            buffer = buffer + char;
          }
          break;
        case CsvParserState.Record:
          if (char === '"') {
            unquotedCsvParserState = csvParserState;
            csvParserState = CsvParserState.QuotedField;
          } else if (char === ',') {
            currentRow.push(buffer);
            buffer = '';
          } else if (char === '\n') {
            currentRow.push(buffer);
            buffer = '';
            rows.push(currentRow);
            currentRow = [];
          } else {
            buffer = buffer + char;
          }
          break;
      }
    }

    setCsv({ columnHeadings: headers, data: rows });
  };

  return [csv, handleImport];
}

export default useCsv;