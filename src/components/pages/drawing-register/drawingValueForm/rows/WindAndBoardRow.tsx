'use client';

import { FormData } from '@/components/pages/drawing-register/types';
import { getFormStyles } from './utils/styleUtils';

interface WindAndBoardRowProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  inputClass: string;
  isConfirmMode?: boolean;
  variant?: 'form' | 'header';
}

export function WindAndBoardRow({ 
  formData, 
  setFormData, 
  inputClass, 
  isConfirmMode = false,
  variant = 'form'
}: WindAndBoardRowProps) {
  const { containerClass, currentInputClass, wrapperClass } = getFormStyles(variant, inputClass);

  // 共通の更新関数
  const updateBasic = (field: keyof Pick<FormData, 'windSpeed'>) => (value: string) => {
    const numValue = value ? Number(value) : null;
    setFormData(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const updateBoardSide = (value: 'single' | 'double') => {
    setFormData(prev => ({
      ...prev,
      boardSide: value
    }));
  };

  return (
    <div className={containerClass}>

      <div className={wrapperClass}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          風速
        </label>
        <input
          type="number"
          value={formData.windSpeed ?? ''}
          onChange={(e) => updateBasic('windSpeed')(e.target.value)}
          className={currentInputClass}
          placeholder="風速"
          disabled={isConfirmMode}
          onKeyDown={(e) => {
            if (e.key === 'e' || e.key === 'E' || e.key === '-') {
              e.preventDefault();
            }
          }}
        />
      </div>

      <div className={wrapperClass}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          板面
        </label>
        <select
          value={formData.boardSide ?? ''}
          onChange={(e) => updateBoardSide(e.target.value as 'single' | 'double')}
          className={currentInputClass}
          disabled={isConfirmMode}
          //TODO: 仮実装headerの場合はdisabledの背景色を変える
          style={{ backgroundColor: isConfirmMode ? '#F3F4F6' : 'transparent' }}
        >
          <option value="">未設定</option>
          <option value="single">片面</option>
          <option value="double">両面</option>
        </select>
      </div>
    </div>
  );
} 