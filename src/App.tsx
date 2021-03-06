import React, { FC } from 'react';
import FileExport from './components/FileExport/FileExport';
import FileImport from './components/FileImport/FileImport';
import Table from './components/Table/Table';
import useCsv from './hooks/useCsv';
import useCsvExport from './hooks/useCsvExport';

const App:FC = () => {
  const [csv, setCsv] = useCsv();
  const csvExport = useCsvExport();

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
            ? <div>
                <FileExport exportCallback={() => csvExport(csv)} />
                <Table csv={csv} />
              </div> 
            : null
        }
      </div>
    </div>
  );
};

export default App;
