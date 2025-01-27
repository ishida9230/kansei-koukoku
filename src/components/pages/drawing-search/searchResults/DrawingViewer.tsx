'use client';

import React from 'react';
import { PDFPreview } from '@/components/pages/drawing-register/drawingForm/components/PDFPreview';

interface DrawingViewerProps {
  pdfUrl: string | null;
}

export const DrawingViewer: React.FC<DrawingViewerProps> = ({ pdfUrl }) => {
  return (
    <div className="h-full border rounded">
      {pdfUrl ? (
        <PDFPreview url={pdfUrl} />
      ) : (
        <div className="h-full flex items-center justify-center text-gray-500">
          図面を選択してください
        </div>
      )}
    </div>
  );
};
