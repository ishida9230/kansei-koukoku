'use client';

import { X } from 'lucide-react';
import { FormData, CircleFoundation, RectangleFoundation } from '@/components/pages/drawing-register/types';
import { getFormStyles } from './utils/styleUtils';
interface PillarFoundationRowProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  inputClass: string;
  isConfirmMode?: boolean;
  variant?: 'form' | 'header';
}

export function PillarFoundationRow({ 
  formData, 
  setFormData, 
  inputClass,
  isConfirmMode = false,
  variant = 'form'
}: PillarFoundationRowProps) {
  const { containerClass, currentInputClass, wrapperClass } = getFormStyles(variant, inputClass);

  const updateEmbrace = (value: '縦抱き' | '横抱き' | null) => {
    setFormData(prev => ({
      ...prev,
      pillar: {
        ...prev.pillar,
        embrace: value
      }
    }));
  };

  const updateFoundation = (
    type: '丸' | '四角' | null,
    value: string | null = null,
    isWidth = true,
  ) => {
    if (!type) {
      setFormData(prev => ({
        ...prev,
        pillar: {
          ...prev.pillar,
          foundation: null
        }
      }));
      return;
    }

    if (type === '丸') {
      setFormData(prev => ({
        ...prev,
        pillar: {
          ...prev.pillar,
          foundation: {
            type: '丸',
            diameter: value ? Number(value) : (prev.pillar.foundation as CircleFoundation)?.diameter ?? null,
          }
        }
      }));
    } else {
      const currentFoundation = formData.pillar.foundation as RectangleFoundation;
      setFormData(prev => ({
        ...prev,
        pillar: {
          ...prev.pillar,
          foundation: {
            type: '四角',
            width: isWidth ? (value ? Number(value) : null) : currentFoundation?.width ?? null,
            height: !isWidth ? (value ? Number(value) : null) : currentFoundation?.height ?? null,
          }
        }
      }));
    }
  };

  return (
    <div className={containerClass}>

      <div className={wrapperClass}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          基礎(〇・□)
        </label>
        <select
          value={formData.pillar.foundation?.type ?? ''}
          onChange={(e) => {
            const value = e.target.value as '丸' | '四角' | '';
            updateFoundation(value || null);
          }}
          className={currentInputClass}
          disabled={isConfirmMode}
          //TODO: 仮実装headerの場合はdisabledの背景色を変える
          style={{ backgroundColor: isConfirmMode ? '#F3F4F6' : 'transparent' }}
        >
          <option value="">未設定</option>
          <option value="丸">〇</option>
          <option value="四角">□</option>
        </select>
      </div>

      {formData.pillar.foundation?.type === '四角' ? (
        <div className="col-span-2 flex items-end gap-2">
          <div className="w-[120px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              基礎
            </label>
            <input
              type="number"
              value={(formData.pillar.foundation as RectangleFoundation).width ?? ''}
              onChange={(e) => updateFoundation('四角', e.target.value, true)}
              className={currentInputClass}
              placeholder="縦のサイズ"
              disabled={isConfirmMode}
              onKeyDown={(e) => {
                if (e.key === 'e' || e.key === 'E' || e.key === '-') {
                  e.preventDefault();
                }
              }}
            />
          </div>

          <div className="flex items-center pb-2">
            <X className="w-4 h-4 text-gray-500" />
          </div>

          <div className="w-[120px]">
            <input
              type="number"
              value={(formData.pillar.foundation as RectangleFoundation).height ?? ''}
              onChange={(e) => updateFoundation('四角', e.target.value, false)}
              className={currentInputClass}
              placeholder="横のサイズ"
              disabled={isConfirmMode}
              onKeyDown={(e) => {
                if (e.key === 'e' || e.key === 'E' || e.key === '-') {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>
      ) : (
        <div className="w-[120px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            基礎
          </label>
          <input
            type="number"
            value={(formData.pillar.foundation as CircleFoundation)?.diameter ?? ''}
            onChange={(e) => updateFoundation('丸', e.target.value)}
            className={currentInputClass}
            placeholder="基礎サイズ"
            disabled={isConfirmMode}
            onKeyDown={(e) => {
              if (e.key === 'e' || e.key === 'E' || e.key === '-') {
                e.preventDefault();
              }
            }}
          />
        </div>
      )}

      <div className={wrapperClass}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          抱きあり
        </label>
        <select
          value={formData.pillar.embrace ?? ''}
          onChange={(e) => {
            const value = e.target.value as '縦抱き' | '横抱き' | '';
            updateEmbrace(value || null);
          }}
          className={currentInputClass}
          disabled={isConfirmMode}
          //TODO: 仮実装headerの場合はdisabledの背景色を変える
          style={{ backgroundColor: isConfirmMode ? '#F3F4F6' : 'transparent' }}
        >
          <option value="">未設定</option>
          <option value="縦抱き">縦抱き</option>
          <option value="横抱き">横抱き</option>
        </select>
      </div>

    </div>
  );
} 