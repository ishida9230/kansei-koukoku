'use client';

import React from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

interface DetailImportProps {
  onDrop: (acceptedFiles: File[]) => void;
  isDragActive: boolean;
  disabled: boolean;
}

export const DetailImport: React.FC<DetailImportProps> = ({ onDrop, isDragActive, disabled }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: 30 * 1024 * 1024,
    multiple: false,
    disabled
  });

  return (
    <div
      {...getRootProps()}
      className="relative h-full flex flex-col"
    >
      <div className={`
        absolute inset-0 flex flex-col items-center justify-center
        transition-colors duration-200 z-10
        ${isDragActive ? 'bg-blue-50/90' : 'bg-white/90'}
      `}>
        <input {...getInputProps()} />
        <FiUpload className="w-12 h-12 text-gray-400" />
        <p className="mt-2 text-gray-600">
          ドラッグ&ドロップまたはクリックして詳細図面をアップロード
        </p>
        <p className="mt-1 text-sm text-gray-500">
          (.pdf形式、最大30MB、300dpi推奨)
        </p>
      </div>
    </div>
  );
}; 