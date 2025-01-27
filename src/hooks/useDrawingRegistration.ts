import { useState } from 'react';

// 型定義
interface DrawingRegistration {
  file: {
    data: File | null;
    type: 'jww' | 'pdf' | null;
    status: 'valid' | 'invalid' | null;
    error?: string;
    url?: string;
  };
  step: 'jww' | 'pdf' | 'complete';
  form: {
    boardSide: 'single' | 'double';
    measurements: {
      height: number;
      width: number;
      bottomMargin: number;
      surfaces: number;
    }[];
  };
}

export const useDrawingRegistration = () => {
  const [registration, setRegistration] = useState<DrawingRegistration>({
    file: {
      data: null,
      type: null,
      status: null
    },
    step: 'jww',
    form: {
      boardSide: 'single',
      measurements: [{ height: 0, width: 0, bottomMargin: 0, surfaces: 1 }]
    }
  });

  // ファイル処理関連の関数
  const fileOperations = {
    handleJWW: (file: File) => {
      setRegistration(prev => ({
        ...prev,
        file: {
          data: file,
          type: 'jww',
          status: 'valid'
        },
        step: 'pdf'
      }));
    },

    handlePDF: async (file: File) => {
      try {
        const url = URL.createObjectURL(file);
        setRegistration(prev => ({
          ...prev,
          file: {
            data: file,
            type: 'pdf',
            status: 'valid',
            url
          },
          step: 'complete'
        }));
      } catch (error) {
        setRegistration(prev => ({
          ...prev,
          file: {
            data: file,
            type: 'pdf',
            status: 'invalid',
            error: error instanceof Error ? error.message : '不明なエラーが発生しました'
          }
        }));
      }
    }
  };

  // フォーム操作関連の関数
  const formOperations = {
    updateBoardSide: (boardSide: 'single' | 'double') => {
      setRegistration(prev => ({
        ...prev,
        form: {
          ...prev.form,
          boardSide
        }
      }));
    },

    updateMeasurement: (index: number, field: keyof DrawingRegistration['form']['measurements'][0], value: number) => {
      setRegistration(prev => ({
        ...prev,
        form: {
          ...prev.form,
          measurements: prev.form.measurements.map((item, i) => 
            i === index ? { ...item, [field]: value } : item
          )
        }
      }));
    },

    addMeasurement: () => {
      setRegistration(prev => ({
        ...prev,
        form: {
          ...prev.form,
          measurements: [
            ...prev.form.measurements,
            { height: 0, width: 0, bottomMargin: 0, surfaces: 1 }
          ]
        }
      }));
    },

    removeMeasurement: (index: number) => {
      setRegistration(prev => ({
        ...prev,
        form: {
          ...prev.form,
          measurements: prev.form.measurements.filter((_, i) => i !== index)
        }
      }));
    }
  };

  return {
    registration,
    fileOperations,
    formOperations
  };
}; 