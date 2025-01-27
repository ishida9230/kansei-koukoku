'use client';

import { PlusCircle, Trash2 } from 'lucide-react';
import { FormData } from '@/components/pages/drawing-register/types';

interface FurringSpacingRowProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  inputClass: string;
  isConfirmMode?: boolean;
  variant: 'form' | 'header';
}

export function FurringSpacingRowHeader({ 
  formData, 
  setFormData, 
  inputClass,
  isConfirmMode = false,
  variant = 'form'
}: FurringSpacingRowProps) {
  const addFurringSpacing = () => {
    setFormData(prev => ({
      ...prev,
      pillar: {
        ...prev.pillar,
        furringSpacings: [...prev.pillar.furringSpacings, { width: null }]
      }
    }));
  };

  const removeFurringSpacing = (index: number) => {
    setFormData(prev => ({
      ...prev,
      pillar: {
        ...prev.pillar,
        furringSpacings: prev.pillar.furringSpacings.length > 4 
          ? prev.pillar.furringSpacings.filter((_, i) => i !== index)
          : prev.pillar.furringSpacings
      }
    }));
  };

  const updateFurringSpacing = (index: number, value: string) => {
    const numValue = value ? Number(value) : null;
    setFormData(prev => ({
      ...prev,
      pillar: {
        ...prev.pillar,
        furringSpacings: prev.pillar.furringSpacings.map((item, i) =>
          i === index ? { width: numValue } : item
        )
      }
    }));
  };

  return (
    <div className='flex gap-4'>
      {formData.pillar.furringSpacings.map((spacing, index) => (
        <div key={index} className="flex gap-4">
          <div className="w-[120px]">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                胴縁間幅{index + 1}
              </label>
              <div className="flex items-center justify-end">
                {index === 3 && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={addFurringSpacing}
                    >
                      <PlusCircle className="w-5 h-5 text-primary" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFurringSpacing(formData.pillar.furringSpacings.length - 1)}
                      disabled={formData.pillar.furringSpacings.length <= 4}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <input
              type="number"
              value={spacing.width ?? ''}
              onChange={(e) => updateFurringSpacing(index, e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder={`胴縁間幅${index + 1}`}
              disabled={isConfirmMode}
              onKeyDown={(e) => {
                if (e.key === 'e' || e.key === 'E' || e.key === '-') {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
} 