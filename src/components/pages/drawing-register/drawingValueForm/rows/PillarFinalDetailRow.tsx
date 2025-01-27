'use client';

import { FormData } from '@/components/pages/drawing-register/types';
import { getFormStyles } from './utils/styleUtils';
interface PillarFinalDetailRowProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  inputClass: string;
  isConfirmMode?: boolean;
  variant?: 'form' | 'header';
}

export function PillarFinalDetailRow({ 
  formData, 
  setFormData, 
  inputClass,
  isConfirmMode = false,
  variant = 'form'
}: PillarFinalDetailRowProps) {
  const { containerClass, currentInputClass, wrapperClass } = getFormStyles(variant, inputClass);

  const updatePillarFinalDetail = (field: keyof Pick<FormData['pillar'], 'embrace11v' | 'aluminumPitch' | 'topDistance'>) => (value: string) => {
    const numValue = field === 'embrace11v' ? value : (value ? Number(value) : null);
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
          抱き（11V）
        </label>
        <input
          type="number"
          value={formData.pillar.embrace11v ?? ''}
          onChange={(e) => updatePillarFinalDetail('embrace11v')(e.target.value)}
          className={currentInputClass}
          placeholder="抱き（11V）"
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
          アルミ枠ピッチ
        </label>
        <input
          type="number"
          value={formData.pillar.aluminumPitch ?? ''}
          onChange={(e) => updatePillarFinalDetail('aluminumPitch')(e.target.value)}
          className={currentInputClass}
          placeholder="アルミ枠ピッチ"
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
          板〜柱トップ
        </label>
        <input
          type="number"
          value={formData.pillar.topDistance ?? ''}
          onChange={(e) => updatePillarFinalDetail('topDistance')(e.target.value)}
          className={currentInputClass}
          placeholder="板〜柱トップ"
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