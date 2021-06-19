import React, { ChangeEvent, FC } from 'react';

interface FileImportProps {
  importedCallback: (file: File) => void;
};

const FileImport:FC<FileImportProps> = (fileImportProps: FileImportProps) => {

  const fileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file: File = event.target.files[0];
      fileImportProps.importedCallback(file);
    }
  };

  return (
    <div>
      <input type='file' name='file' onChange={fileSelected} />
    </div>
  );
};

export default FileImport;
