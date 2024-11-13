// src/components/FileUpload.tsx
import React, { ChangeEvent, useState } from 'react';

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const onUpload = async () => {
    if (selectedFile) {
      console.log('File uploaded:', selectedFile.name, selectedFile.size, selectedFile.type);
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded-md shadow-md">
      <div className="mb-4">
        <label htmlFor="file" className="block mb-2 text-sm font-bold text-gray-700">
          Select File
        </label>
        <input
          type="file"
          id="file"
          onChange={onFileChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        onClick={onUpload}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
