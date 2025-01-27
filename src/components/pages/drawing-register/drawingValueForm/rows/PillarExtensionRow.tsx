'use client';

import { FormData } from '@/components/pages/drawing-register/types';
import { getFormStyles } from './utils/styleUtils';

interface PillarExtensionRowProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  inputClass: string;
  isConfirmMode?: boolean;
  variant?: 'form' | 'header';
}

export function PillarExtensionRow({ 
  formData, 
  setFormData, 
  inputClass,
  isConfirmMode = false,
  variant = 'form'
}: PillarExtensionRowProps) {
  const { containerClass, currentInputClass, wrapperClass } = getFormStyles(variant, inputClass);

  const updatePillarExtension = (field: keyof Pick<FormData['pillar'], 'structuralBase' | 'leftExtension' | 'rightExtension'>) => (value: string) => {
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
          根巻あり
        </label>
        <input
          type="number"
          value={formData.pillar.structuralBase ?? ''}
          onChange={(e) => updatePillarExtension('structuralBase')(e.target.value)}
          className={currentInputClass}
          placeholder="構造根巻サイズ"
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
          左持ち出し幅
        </label>
        <input
          type="number"
          value={formData.pillar.leftExtension ?? ''}
          onChange={(e) => updatePillarExtension('leftExtension')(e.target.value)}
          className={currentInputClass}
          placeholder="左持ち出し幅"
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
          右持ち出し幅
        </label>
        <input
          type="number"
          value={formData.pillar.rightExtension ?? ''}
          onChange={(e) => updatePillarExtension('rightExtension')(e.target.value)}
          className={currentInputClass}
          placeholder="右持ち出し幅"
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