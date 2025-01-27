'use client';

import { FormData } from '@/components/pages/drawing-register/types';
import { getFormStyles } from './utils/styleUtils';
interface PillarFurringDetailRowProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  inputClass: string;
  isConfirmMode?: boolean;
  variant?: 'form' | 'header';
}

export function PillarFurringDetailRow({ 
  formData, 
  setFormData, 
  inputClass,
  isConfirmMode = false,
  variant = 'form'
}: PillarFurringDetailRowProps) {
  const { containerClass, currentInputClass, wrapperClass } = getFormStyles(variant, inputClass);

  const updatePillarFurringDetail = (field: keyof Pick<FormData['pillar'], 'topOverhang' | 'bottomOverhang' | 'furringThickness' | 'maxFurringPitch'>) => (value: string) => {
    const numValue = value ? Number(value) : null;
    setFormData(prev => ({
      ...prev,
      pillar: {
        ...prev.pillar,
        [field]: numValue
      }
    }));
  };

  return (
    <div className={containerClass}>
      <div className={wrapperClass}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          はね出し寸法(上)
        </label>
        <input
          type="number"
          value={formData.pillar.topOverhang ?? ''}
          onChange={(e) => updatePillarFurringDetail('topOverhang')(e.target.value)}
          className={currentInputClass}
          placeholder="はね出し寸法(上)"
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
          はね出し寸法(下)
        </label>
        <input
          type="number"
          value={formData.pillar.bottomOverhang ?? ''}
          onChange={(e) => updatePillarFurringDetail('bottomOverhang')(e.target.value)}
          className={currentInputClass}
          placeholder="はね出し寸法(下)"
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
          胴縁の厚み
        </label>
        <input
          type="number"
          value={formData.pillar.furringThickness ?? ''}
          onChange={(e) => updatePillarFurringDetail('furringThickness')(e.target.value)}
          className={currentInputClass}
          placeholder="胴縁の厚み"
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
          最大胴縁ピッチ
        </label>
        <input
          type="number"
          value={formData.pillar.maxFurringPitch ?? ''}
          onChange={(e) => updatePillarFurringDetail('maxFurringPitch')(e.target.value)}
          className={currentInputClass}
          placeholder="最大胴縁ピッチ"
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