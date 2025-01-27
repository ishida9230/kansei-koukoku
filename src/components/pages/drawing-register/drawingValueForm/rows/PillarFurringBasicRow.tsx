'use client';

import { FormData } from '@/components/pages/drawing-register/types';
import { getFormStyles } from './utils/styleUtils';

interface PillarFurringBasicRowProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  inputClass: string;
  isConfirmMode?: boolean;
  variant?: 'form' | 'header';
}

export function PillarFurringBasicRow({
  formData,
  setFormData,
  inputClass,
  isConfirmMode = false,
  variant = 'form'
}: PillarFurringBasicRowProps) {
  const { containerClass, currentInputClass, wrapperClass } = getFormStyles(variant, inputClass);

  const updatePillarFurring = (field: keyof Pick<FormData['pillar'], 'maxControlWidth' | 'maxFaceWidth' | 'furringSize' | 'furringCount'>) => (value: string) => {
    const numValue = field === 'furringSize' ? value : (value ? Number(value) : null);
    setFormData(prev => ({
      ...prev,
      pillar: {
        ...prev.pillar,
        [field]: numValue || null
      }
    }));
  };

  return (
    <div className={containerClass}>
      <div className={wrapperClass}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          最大支配幅(自動)
        </label>
        <input
          type="number"
          value={formData.pillar.maxControlWidth ?? ''}
          onChange={(e) => updatePillarFurring('maxControlWidth')(e.target.value)}
          className={currentInputClass}
          placeholder="最大支配幅"
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
          最大面振り幅
        </label>
        <input
          type="number"
          value={formData.pillar.maxFaceWidth ?? ''}
          onChange={(e) => updatePillarFurring('maxFaceWidth')(e.target.value)}
          className={currentInputClass}
          placeholder="最大面振り幅"
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
          胴縁サイズ
        </label>
        <input
          type="text"
          value={formData.pillar.furringSize ?? ''}
          onChange={(e) => updatePillarFurring('furringSize')(e.target.value)}
          className={currentInputClass}
          placeholder="40角、40×40"
          disabled={isConfirmMode}
        />
      </div>

      <div className={wrapperClass}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          胴縁本数
        </label>
        <input
          type="number"
          value={formData.pillar.furringCount ?? ''}
          onChange={(e) => updatePillarFurring('furringCount')(e.target.value)}
          className={currentInputClass}
          placeholder="胴縁本数"
          disabled={isConfirmMode}
          onKeyDown={(e) => {
            if (e.key === 'e' || e.key === 'E' || e.key === '-') {
              e.preventDefault();
            }
          }}
        />
      </div>
    </div>
  );
} 