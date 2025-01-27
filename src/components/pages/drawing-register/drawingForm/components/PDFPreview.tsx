'use client';

import React from 'react';

interface PDFPreviewProps {
  url: string;
  className?: string;
}

export const PDFPreview: React.FC<PDFPreviewProps> = ({ url, className }) => {
  return (
    <iframe
      src={url}
      className={className}
      style={{ width: '100%', height: '100%', border: 'none' }}
    />
  );
}; 