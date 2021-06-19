import React, { FC } from 'react';

interface FileExportProps {
  exportCallback: () => string;
}

const FileExport:FC<FileExportProps> = (fileExportProps: FileExportProps) => {
  const onClick = () => {
    const rawCsv = fileExportProps.exportCallback();

    const data = 'data:text/csv;charset=utf-8;base64,' + btoa(rawCsv);
    window.open(data);
  };

  return (
    <button onClick={onClick}>Export</button>
  );
};

export default FileExport;
