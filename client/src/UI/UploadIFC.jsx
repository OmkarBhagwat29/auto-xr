import React, { useState } from 'react';

const UploadIFC = ({ onFileSelect }) => {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            onFileSelect(file);
        }
    };

    return (
        <div>

            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Upload IFC File</h2>
            <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-200 text-blue-600 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-600 hover:text-white transition-all">
                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M16.88 7.58l-4.3-4.29a2 2 0 00-2.83 0l-4.3 4.29a1 1 0 001.42 1.42l2.88-2.88V12a1 1 0 002 0V6.12l2.88 2.88a1 1 0 101.42-1.42zM6 16a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                <span className="mt-2 text-base leading-normal">Select an IFC file</span>
                <input type="file" className="hidden" accept=".ifc" onChange={handleFileChange} />
            </label>
            {fileName && (
                <p className="mt-4 text-center text-gray-600">Selected File: {fileName}</p>
            )}

        </div>
    )
}

export default UploadIFC
