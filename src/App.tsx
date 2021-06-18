import React, { FC } from 'react';
import FileImport from './components/FileImport/FileImport';
import Table from './components/Table/Table';
import useCsv from './hooks/useCsv';

const App:FC = () => {
  const [csv, setCsv] = useCsv();

  return (
    <div>
      <h1>CVS Editor</h1>
      <div>
        {
          csv
            ? null
            : <h2>Import a file to get started</h2>
        }
        
        <FileImport importedCallback={setCsv} />
        { 
          csv 
            ? <Table csv={csv} /> 
            : null
        }
      </div>
    </div>
  );
};

export default App;
