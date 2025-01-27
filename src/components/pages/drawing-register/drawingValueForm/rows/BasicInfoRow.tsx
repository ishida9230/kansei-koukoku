'use client';

import { FormData } from '@/components/pages/drawing-register/types';
import { PREFECTURES } from '@/components/global/constants';
import { getFormStyles } from './utils/styleUtils';

interface BasicInfoRowProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  inputClass: string;
  isConfirmMode?: boolean;
  variant?: 'form' | 'header';
}

export function BasicInfoRow({ 
  formData, 
  setFormData, 
  inputClass, 
  isConfirmMode = false,
  variant = 'form'
}: BasicInfoRowProps) {
  const { containerClass, currentInputClass, wrapperClass } = getFormStyles(variant, inputClass);

  // 共通の更新関数
  const updateBasic = (field: keyof Pick<FormData, 'planNumber' | 'prefecture' | 'city'>) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value || null
    }));
  };

  console.log("wrapperClass", wrapperClass)
  console.log("currentInputClass", currentInputClass)
  return (
    <div className={containerClass}>
      <div className={wrapperClass}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          企画番号
        </label>
        <input
          type="number"
          value={formData.planNumber ?? ''}
          onChange={(e) => updateBasic('planNumber')(e.target.value)}
          className={currentInputClass}
          placeholder="企画番号"
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
          都道府県
        </label>
        <select
          value={formData.prefecture ?? ''}
          onChange={(e) => updateBasic('prefecture')(e.target.value)}
          className={currentInputClass}
          disabled={isConfirmMode}
          //TODO: 仮実装headerの場合はdisabledの背景色を変える
          style={{ backgroundColor: isConfirmMode ? '#F3F4F6' : 'transparent' }}
        >
          <option value="">未設定</option>
          {PREFECTURES.map((pref) => (
            <option key={pref} value={pref}>
              {pref}
            </option>
          ))}
        </select>
      </div>

      <div className={wrapperClass}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          市区郡
        </label>
        <input
          type="text"
          value={formData.city ?? ''}
          onChange={(e) => updateBasic('city')(e.target.value)}
          className={currentInputClass}
          placeholder="市区郡"
          disabled={isConfirmMode}
        />
      </div>

    </div>
  );
} 