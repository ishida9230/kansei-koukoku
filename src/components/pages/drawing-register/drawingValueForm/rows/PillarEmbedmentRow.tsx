'use client';

import { FormData } from '@/components/pages/drawing-register/types';
import { getFormStyles } from './utils/styleUtils';

interface PillarEmbedmentRowProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  inputClass: string;
  isConfirmMode?: boolean;
  variant?: 'form' | 'header';
}

export function PillarEmbedmentRow({
  formData,
  setFormData,
  inputClass,
  isConfirmMode = false,
  variant = 'form'
}: PillarEmbedmentRowProps) {
  const { containerClass, currentInputClass, wrapperClass } = getFormStyles(variant, inputClass);

  const updatePillarEmbedment = (field: keyof Pick<FormData['pillar'], 'holeDepth' | 'embedment'>) => (value: string) => {
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
          根入寸法
        </label>
        <input
          type="number"
          value={formData.pillar.holeDepth ?? ''}
          onChange={(e) => updatePillarEmbedment('holeDepth')(e.target.value)}
          className={currentInputClass}
          placeholder="根入寸法"
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
          柱の根入れ
        </label>
        <input
          type="number"
          value={formData.pillar.embedment ?? ''}
          onChange={(e) => updatePillarEmbedment('embedment')(e.target.value)}
          className={currentInputClass}
          placeholder="柱の根入れ"
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