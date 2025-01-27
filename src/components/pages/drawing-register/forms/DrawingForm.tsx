'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import { PDFDocument } from 'pdf-lib';
import { FormData } from '../types';

interface DrawingFile {
  file: File;
  type: 'jww' | 'pdf' | 'detail';
  status: 'valid' | 'invalid';
  error?: string;
  url?: string;
}

interface DrawingFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

// ステップの型定義を分離
type StructureStep = 'jww' | 'pdf' | 'complete';
type DetailStep = 'importing' | 'complete';

export const DrawingForm: React.FC<DrawingFormProps> = ({ formData, setFormData }) => {
  const [drawingFile, setDrawingFile] = useState<DrawingFile | null>(null);
  const [detailFile, setDetailFile] = useState<DrawingFile | null>(null);
  const [structureStep, setStructureStep] = useState<StructureStep>('jww');
  const [detailStep, setDetailStep] = useState<DetailStep>('importing');

  // JWWのドロップハンドラー
  const handleJWWDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setDrawingFile({
      file,
      type: 'jww',
      status: 'valid'
    });
    setFormData(prev => ({ ...prev, drawingFile: file }));
    setStructureStep('pdf');
  }, [setFormData]);

  // PDFのドロップハンドラー
  const handlePDFDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      // ファイルサイズチェック
      if (file.size > 30 * 1024 * 1024) {
        throw new Error('PDFファイルは30MB以下にしてください');
      }

      // PDFの検証
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // ページ数チェック
      if (pdfDoc.getPageCount() > 10) {
        throw new Error('PDFは10ページ以下にしてください');
      }

      // プレビュー用URL生成
      const url = URL.createObjectURL(file);

      setDrawingFile({
        file,
        type: 'pdf',
        status: 'valid',
        url
      });
      setFormData(prev => ({ ...prev, drawingFile: file }));
      setStructureStep('complete');
    } catch (error) {
      setDrawingFile({
        file,
        type: 'pdf',
        status: 'invalid',
        error: error instanceof Error ? error.message : '不明なエラーが発生しました'
      });
      setFormData(prev => ({ ...prev, drawingFile: null }));
    }
  }, [setFormData]);

  // 詳細図面のドロップハンドラー
  const handleDetailDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      // ファイルサイズチェック
      if (file.size > 30 * 1024 * 1024) {
        throw new Error('PDFファイルは30MB以下にしてください');
      }

      // PDFの検証
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // ページ数チェック
      if (pdfDoc.getPageCount() > 10) {
        throw new Error('PDFは10ページ以下にしてください');
      }

      // プレビュー用URL生成
      const url = URL.createObjectURL(file);

      setDetailFile({
        file,
        type: 'detail',
        status: 'valid',
        url
      });
      setFormData(prev => ({ ...prev, detailFile: file }));
      setDetailStep('complete');
    } catch (error) {
      setDetailFile({
        file,
        type: 'detail',
        status: 'invalid',
        error: error instanceof Error ? error.message : '不明なエラーが発生しました'
      });
      setFormData(prev => ({ ...prev, detailFile: null }));
    }
  }, [setFormData]);

  // Dropzone設定を更新
  const { getRootProps: getJWWRootProps, getInputProps: getJWWInputProps, isDragActive: isJWWDragActive } = useDropzone({
    onDrop: handleJWWDrop,
    accept: { 'application/jww': ['.jww'] },
    maxSize: 20 * 1024 * 1024,
    multiple: false,
    disabled: structureStep !== 'jww'
  });

  const { getRootProps: getPDFRootProps, getInputProps: getPDFInputProps, isDragActive: isPDFDragActive } = useDropzone({
    onDrop: handlePDFDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: 30 * 1024 * 1024,
    multiple: false,
    disabled: structureStep !== 'pdf'
  });

  const { getRootProps: getDetailRootProps, getInputProps: getDetailInputProps, isDragActive: isDetailDragActive } = useDropzone({
    onDrop: handleDetailDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: 30 * 1024 * 1024,
    multiple: false,
    disabled: detailStep !== 'importing'
  });

  // PDFプレビュー表示
  const renderPDFPreview = () => {
    if (!drawingFile?.url) return null;

    return (
      <div className="h-full">
        <iframe
          src={drawingFile.url}
          className="w-full h-full border-0"
          title="PDF preview"
        />
      </div>
    );
  };

  // PDFインポートUI
  const renderPDFImport = () => (
    <div
      {...getPDFRootProps()}
      className="relative h-full flex flex-col"
    >
      <div className={`
        absolute inset-0 flex flex-col items-center justify-center
        transition-colors duration-200 z-10
        ${isPDFDragActive ? 'bg-blue-50/90' : 'bg-white/90'}
        ${drawingFile?.type === 'pdf' && drawingFile?.status === 'invalid' ? 'bg-red-50/90' : ''}
        ${drawingFile?.type === 'pdf' && drawingFile?.status === 'valid' ? 'bg-green-50/90' : ''}
      `}>
        <input {...getPDFInputProps()} />
        <FiUpload className="w-12 h-12 text-gray-400" />
        <p className="mt-2 text-gray-600">
          ドラッグ&ドロップまたはクリックしてPDFファイルを選択
        </p>
        <p className="mt-1 text-sm text-gray-500">
          (.pdf形式、最大30MB、300dpi推奨)
        </p>
        {drawingFile?.type === 'pdf' && drawingFile?.error && (
          <p className="mt-2 text-red-500">{drawingFile.error}</p>
        )}
      </div>
    </div>
  );

  // JWWインポートUI
  const renderJWWImport = () => (
    <div
      {...getJWWRootProps()}
      className="relative h-full flex flex-col"
    >
      <div className={`
        absolute inset-0 flex flex-col items-center justify-center
        transition-colors duration-200 z-10
        ${isJWWDragActive ? 'bg-blue-50/90' : 'bg-white/90'}
        ${drawingFile?.type === 'jww' && drawingFile?.status === 'invalid' ? 'bg-red-50/90' : ''}
        ${drawingFile?.type === 'jww' && drawingFile?.status === 'valid' ? 'bg-green-50/90' : ''}
      `}>
        <input {...getJWWInputProps()} />
        <FiUpload className="w-12 h-12 text-gray-400" />
        <p className="mt-2 text-gray-600">
          ドラッグ&ドロップまたはクリックしてJWWファイルを選択
        </p>
        <p className="mt-1 text-sm text-gray-500">
          (.jww形式、最大20MB、JW-CAD 8.0以降)
        </p>
        {drawingFile?.type === 'jww' && drawingFile?.error && (
          <p className="mt-2 text-red-500">{drawingFile.error}</p>
        )}
      </div>
    </div>
  );

  // 詳細図面プレビュー表示
  const renderDetailPreview = () => {
    if (!detailFile?.url) return null;

    return (
      <div className="h-full">
        <iframe
          src={detailFile.url}
          className="w-full h-full border-0"
          title="Detail PDF preview"
        />
      </div>
    );
  };

  // 詳細図面インポートUI
  const renderDetailImport = () => (
    <div
      {...getDetailRootProps()}
      className="relative h-full flex flex-col"
    >
      <div className={`
        absolute inset-0 flex flex-col items-center justify-center
        transition-colors duration-200 z-10
        ${isDetailDragActive ? 'bg-blue-50/90' : 'bg-white/90'}
        ${detailFile?.status === 'invalid' ? 'bg-red-50/90' : ''}
        ${detailFile?.status === 'valid' ? 'bg-green-50/90' : ''}
      `}>
        <input {...getDetailInputProps()} />
        <FiUpload className="w-12 h-12 text-gray-400" />
        <p className="mt-2 text-gray-600">
          ドラッグ&ドロップまたはクリックして詳細図面をアップロード
        </p>
        <p className="mt-1 text-sm text-gray-500">
          (.pdf形式、最大30MB、300dpi推奨)
        </p>
        {detailFile?.error && (
          <p className="mt-2 text-red-500">{detailFile.error}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      {/* 構造図エリア */}
      <div className="min-h-[800px] w-full h-full bg-white">
        <div className="h-full border border-gray-200">
          {structureStep === 'jww' && renderJWWImport()}
          {structureStep === 'pdf' && renderPDFImport()}
          {structureStep === 'complete' && renderPDFPreview()}
        </div>
      </div>

      {/* 詳細図エリア */}
      <div className="min-h-[800px] w-full h-full bg-white border border-gray-200">
        {detailStep === 'importing' && renderDetailImport()}
        {detailStep === 'complete' && renderDetailPreview()}
      </div>
    </div>
  );
};