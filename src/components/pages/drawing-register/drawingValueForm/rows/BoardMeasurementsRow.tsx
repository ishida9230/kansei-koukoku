'use client';

import { PlusCircle, Trash2 } from 'lucide-react';
import { BoardMeasurement, FormData } from '@/components/pages/drawing-register/types';
import { getFormStyles } from './utils/styleUtils';

interface BoardMeasurementsRowProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  inputClass: string;
  isConfirmMode?: boolean;
  variant?: 'form' | 'header';
  errors?: { [key: string]: string[] };
}

export function BoardMeasurementsRow({ 
  formData, 
  setFormData, 
  inputClass,
  isConfirmMode = false,
  errors,
  variant = 'form'
}: BoardMeasurementsRowProps) {
  const { containerClass, currentInputClass, wrapperClass } = getFormStyles(variant, inputClass);

  const addMeasurement = () => {
    setFormData(prev => ({
      ...prev,
      measurements: [
        ...prev.measurements,
        { width: null, height: null, bottomMargin: null, surfaces: null }
      ]
    }));
  };

  const removeMeasurement = (index: number) => {
    if (formData.measurements.length > 1) {
      setFormData(prev => ({
        ...prev,
        measurements: prev.measurements.filter((_, i) => i !== index)
      }));
    }
  };

  const updateMeasurement = (
    index: number,
    field: keyof BoardMeasurement,
    value: string
  ) => {
    const numValue = value ? Number(value) : null;
    setFormData(prev => ({
      ...prev,
      measurements: prev.measurements.map((item, i) =>
        i === index ? { ...item, [field]: numValue } : item
      )
    }));
  };

  return (
    <div className={variant === 'form' ? 'flex flex-col gap-4' : 'flex gap-4'}>
      {formData.measurements.map((measurement, index) => (
        <div key={index} className={containerClass}>
          <div className={wrapperClass}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              看板（縦）
            </label>
            <input
              type="number"
              value={measurement.width ?? ''}
              onChange={(e) => updateMeasurement(index, 'width', e.target.value)}
              className={currentInputClass}
              placeholder="看板（縦）"
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
              看板（横）
            </label>
            <input
              type="number"
              value={measurement.height ?? ''}
              onChange={(e) => updateMeasurement(index, 'height', e.target.value)}
              className={currentInputClass}
              placeholder="看板（横）"
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
              板下
            </label>
            <input
              type="number"
              value={measurement.bottomMargin ?? ''}
              onChange={(e) => updateMeasurement(index, 'bottomMargin', e.target.value)}
              className={currentInputClass}
              placeholder="板下"
              disabled={isConfirmMode}
              onKeyDown={(e) => {
                if (e.key === 'e' || e.key === 'E' || e.key === '-') {
                  e.preventDefault();
                }
              }}
            />
          </div>

          <div className={wrapperClass}>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                面数
              </label>
              <div className="flex items-center justify-end">
                {index === 0 && variant === 'header' && !isConfirmMode && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={addMeasurement}
                    >
                      <PlusCircle className="w-5 h-5 text-primary" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeMeasurement(formData.measurements.length - 1)}
                      disabled={formData.measurements.length === 1}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <input
              type="number"
              value={measurement.surfaces ?? ''}
              onChange={(e) => updateMeasurement(index, 'surfaces', e.target.value)}
              className={currentInputClass}
              placeholder="面数"
              disabled={isConfirmMode}
              onKeyDown={(e) => {
                if (e.key === 'e' || e.key === 'E' || e.key === '-') {
                  e.preventDefault();
                }
              }}
            />
          </div>

          {/* {errors[`measurements.${index}`]?.map((error, errorIndex) => (
            <p key={errorIndex} className="text-red-500 text-sm mt-1">
              {error}
            </p>
          ))} */}
          
        </div>
      ))}
    </div>
  );
} 