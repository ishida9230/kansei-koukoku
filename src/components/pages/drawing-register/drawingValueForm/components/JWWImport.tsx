'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import { FormData } from '../../types';

interface JWWImportProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  disabled: boolean;
  onSuccess?: () => void;
}

export function JWWImport({
  formData,
  setFormData,
  disabled,
  onSuccess
}: JWWImportProps) {
  // JWWのドロップハンドラー
  const handleJWWDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFormData(prev => ({ ...prev, drawingFile: file }));
    onSuccess?.();
  }, [setFormData, onSuccess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleJWWDrop,
    accept: { 'application/jww': ['.jww'] },
    maxSize: 20 * 1024 * 1024,
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
        ${formData.drawingFile ? 'bg-green-50/90' : ''}
      `}>
        <input {...getInputProps()} />
        <FiUpload className="w-12 h-12 text-gray-400" />
        <p className="mt-2 text-gray-600">
          ドラッグ&ドロップまたはクリックしてJWWファイルを選択
        </p>
        <p className="mt-1 text-sm text-gray-500">
          (.jww形式、最大20MB、JW-CAD 8.0以降)
        </p>
      </div>
    </div>
  );
} 