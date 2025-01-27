'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FormData, FileData } from '../../types';
import { PDFPreview } from '../../drawingForm/components/PDFPreview';

interface DrawingFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  isConfirmMode?: boolean;
}

// ファイルタイプごとのサイズ制限（バイト単位）
const FILE_SIZE_LIMITS = {
  pdf: 3 * 1024 * 1024,    // 3MB
  jww: 2 * 1024 * 1024,    // 2MB
  other: 1 * 1024 * 1024,  // 1MB (Excel/ODS/BMP)
};

// 許可するファイル形式
const ACCEPTED_FILES = {
  'application/pdf': ['.pdf'],
  'application/jww': ['.jww'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'application/vnd.oasis.opendocument.spreadsheet': ['.ods'],
  'image/bmp': ['.bmp']
};

// 除外するシステムファイル
const SYSTEM_FILES = ['.DS_Store', 'Thumbs.db'];

export const DrawingForm: React.FC<DrawingFormProps> = ({ formData, setFormData, isConfirmMode }) => {
  const [error, setError] = useState<string | null>(null);

  // PDFファイルのみをフィルタリング（システムファイルを除外）
  const pdfFiles = formData.files
    .filter(fileData => {
      // システムファイルを除外
      if (SYSTEM_FILES.some(sysFile => fileData.file?.name.includes(sysFile))) {
        return false;
      }
      return fileData.type === 'pdf';
    })
    .sort((a, b) => {
      const aIsSpecial = a.category === '構造図' || a.category === '詳細図';
      const bIsSpecial = b.category === '構造図' || b.category === '詳細図';
      if (aIsSpecial && !bIsSpecial) return -1;
      if (!aIsSpecial && bIsSpecial) return 1;
      return 0;
    });

  // ファイルの種類を判定
  const getFileType = (fileName: string): FileData['type'] => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf': return 'pdf';
      case 'jww': return 'jww';
      case 'xlsx': return 'xlsx';
      case 'ods': return 'ods';
      case 'bmp': return 'bmp';
      default: return 'pdf'; // デフォルト値
    }
  };

  // ファイルのカテゴリを判定
  const getFileCategory = (fileName: string): FileData['category'] => {
    if (fileName.includes('構造図')) return '構造図';
    if (fileName.includes('詳細図')) return '詳細図';
    return 'その他';
  };

  // ファイルの検証（サイズと不要なファイルのチェック）
  const validateFile = (file: File): boolean => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    let limit = FILE_SIZE_LIMITS.other;

    if (extension === 'pdf') {
      limit = FILE_SIZE_LIMITS.pdf;
    } else if (extension === 'jww') {
      limit = FILE_SIZE_LIMITS.jww;
    }

    if (file.size > limit) {
      const limitMB = limit / (1024 * 1024);
      setError(`${file.name}: ファイルサイズは${limitMB}MB以下にしてください`);
      return false;
    }
    return true;
  };

  // ディレクトリ選択ハンドラー
  const handleDirectorySelect = useCallback((files: FileList | null) => {
    if (!files) return;
    setError(null);
    
    const filesArray = Array.from(files);
    const validFiles = filesArray.filter(validateFile);

    if (validFiles.length > 0) {
      const newFiles: FileData[] = validFiles.map(file => ({
        file,
        url: URL.createObjectURL(file),
        type: getFileType(file.name),
        category: getFileCategory(file.name)
      }));

      setFormData(prev => ({
        ...prev,
        files: [...prev.files, ...newFiles]
      }));
    }
  }, [setFormData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ACCEPTED_FILES,
    multiple: true
  });

  return (
    <div className="flex flex-col gap-4 h-full p-4">
      {formData.files.length === 0 ? (
        <div
          {...getRootProps()}
          className={`flex-1 w-full border-2 border-dashed p-4 flex flex-col items-center justify-center
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
        >
          <input {...getInputProps()} />
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={(e) => {
              e.stopPropagation();
              const input = document.createElement('input');
              input.type = 'file';
              input.webkitdirectory = true;
              input.onchange = (e) => {
                const target = e.target as HTMLInputElement;
                handleDirectorySelect(target.files);
              };
              input.click();
            }}
          >
            ディレクトリを選択
          </button>
          {error && (
            <p className="mt-4 text-red-500 text-sm">{error}</p>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* ファイル一覧 */}
          <div className="p-4 bg-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">インポートされたファイル:</h3>
              {!isConfirmMode && (
                <button
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                onClick={() => {
                  setFormData(prev => ({ ...prev, files: [] }));
                  setError(null);
                }}
              >
                  クリア
                </button>
              )}
            </div>
            <ul className="list-disc pl-5">
              {formData.files.map((fileData, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {fileData.file ? fileData.file.name : fileData.url.split('/').pop()}
                  {fileData.category && ` (${fileData.category})`}
                </li>
              ))}
            </ul>
          </div>

          {/* PDFプレビュー */}
          {pdfFiles.map((fileData, index) => (
            <div 
              key={index} 
              className="min-h-[800px] w-full h-full bg-white border border-gray-200"
            >
              <PDFPreview 
                url={fileData.url} 
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};






