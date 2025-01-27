'use client';

import { FormData } from '@/components/pages/drawing-register/types';
import { getFormStyles } from './utils/styleUtils';

interface PillarBasicRowProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  inputClass: string;
  isConfirmMode?: boolean;
  variant?: 'form' | 'header';
}

export function PillarBasicRow({
  formData,
  setFormData,
  inputClass,
  isConfirmMode = false,
  variant = 'form'
}: PillarBasicRowProps) {
  const { containerClass, currentInputClass, wrapperClass } = getFormStyles(variant, inputClass);

  const updatePillarBasic = (field: keyof Pick<FormData['pillar'], 'count' | 'size' | 'thickness'>) => (value: string) => {
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
          柱本数
        </label>
        <input
          type="number"
          value={formData.pillar.count ?? ''}
          onChange={(e) => updatePillarBasic('count')(e.target.value)}
          className={currentInputClass}
          placeholder="柱本数"
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
          柱サイズ
        </label>
        <input
          type="number"
          value={formData.pillar.size ?? ''}
          onChange={(e) => updatePillarBasic('size')(e.target.value)}
          className={currentInputClass}
          placeholder="柱サイズ"
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
          柱厚み
        </label>
        <input
          type="number"
          value={formData.pillar.thickness ?? ''}
          onChange={(e) => updatePillarBasic('thickness')(e.target.value)}
          className={currentInputClass}
          placeholder="柱厚み"
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