'use client';

import { SearchCriteria } from '@/components/pages/drawing-search/types';

interface SearchFormProps {
  searchCriteria: SearchCriteria;
  setSearchCriteria: React.Dispatch<React.SetStateAction<SearchCriteria>>;
}

export function SearchForm({ searchCriteria, setSearchCriteria }: SearchFormProps) {
  const inputClassName = "w-full px-3 py-2 border rounded-md [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 実際の検索処理を実装
  };

  // 数値変換用のヘルパー関数
  const handleNumberChange = (
    value: string,
    updateFn: (newValue: number | null) => void
  ) => {
    const num = value === '' ? null : Number(value);
    updateFn(num);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">図面検索</h1>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          検索
        </button>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex-grow">
        <div className="grid grid-cols-4 gap-4">
          {/* 看板サイズ（横） */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              看板サイズ（横）
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={searchCriteria.size.width.min ?? ''}
                onChange={(e) => handleNumberChange(
                  e.target.value,
                  (value) => setSearchCriteria(prev => ({
                    ...prev,
                    size: {
                      ...prev.size,
                      width: { ...prev.size.width, min: value }
                    }
                  }))
                )}
                className={inputClassName}
                placeholder="最小値"
                onKeyDown={(e) => {
                  if (e.key === 'e' || e.key === 'E' || e.key === '-') {
                    e.preventDefault();
                  }
                }}
              />
              <span className="text-gray-500">～</span>
              <input
                type="number"
                value={searchCriteria.size.width.max ?? ''}
                onChange={(e) => handleNumberChange(
                  e.target.value,
                  (value) => setSearchCriteria(prev => ({
                    ...prev,
                    size: {
                      ...prev.size,
                      width: { ...prev.size.width, max: value }
                    }
                  }))
                )}
                className={inputClassName}
                placeholder="最大値"
                onKeyDown={(e) => {
                  if (e.key === 'e' || e.key === 'E' || e.key === '-') {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </div>

          {/* 看板サイズ（縦） */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              看板サイズ（縦）
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={searchCriteria.size.height.min ?? ''}
                onChange={(e) => handleNumberChange(
                  e.target.value,
                  (value) => setSearchCriteria(prev => ({
                    ...prev,
                    size: {
                      ...prev.size,
                      height: { ...prev.size.height, min: value }
                    }
                  }))
                )}
                className={inputClassName}
                placeholder="最小値"
                onKeyDown={(e) => {
                  if (e.key === 'e' || e.key === 'E' || e.key === '-') {
                    e.preventDefault();
                  }
                }}
              />
              <span className="text-gray-500">～</span>
              <input
                type="number"
                value={searchCriteria.size.height.max ?? ''}
                onChange={(e) => handleNumberChange(
                  e.target.value,
                  (value) => setSearchCriteria(prev => ({
                    ...prev,
                    size: {
                      ...prev.size,
                      height: { ...prev.size.height, max: value }
                    }
                  }))
                )}
                className={inputClassName}
                placeholder="最大値"
                onKeyDown={(e) => {
                  if (e.key === 'e' || e.key === 'E' || e.key === '-') {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </div>

          {/* GL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GL
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={searchCriteria.gl.min ?? ''}
                onChange={(e) => handleNumberChange(
                  e.target.value,
                  (value) => setSearchCriteria(prev => ({
                    ...prev,
                    gl: { ...prev.gl, min: value }
                  }))
                )}
                className={inputClassName}
                placeholder="最小値"
                onKeyDown={(e) => {
                  if (e.key === 'e' || e.key === 'E' || e.key === '-') {
                    e.preventDefault();
                  }
                }}
              />
              <span className="text-gray-500">～</span>
              <input
                type="number"
                value={searchCriteria.gl.max ?? ''}
                onChange={(e) => handleNumberChange(
                  e.target.value,
                  (value) => setSearchCriteria(prev => ({
                    ...prev,
                    gl: { ...prev.gl, max: value }
                  }))
                )}
                className={inputClassName}
                placeholder="最大値"
                onKeyDown={(e) => {
                  if (e.key === 'e' || e.key === 'E' || e.key === '-') {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </div>

          {/* 柱本数 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              柱本数
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={searchCriteria.pillars.min ?? ''}
                onChange={(e) => handleNumberChange(
                  e.target.value,
                  (value) => setSearchCriteria(prev => ({
                    ...prev,
                    pillars: { ...prev.pillars, min: value }
                  }))
                )}
                className={inputClassName}
                placeholder="最小値"
                onKeyDown={(e) => {
                  if (e.key === 'e' || e.key === 'E' || e.key === '-') {
                    e.preventDefault();
                  }
                }}
              />
              <span className="text-gray-500">～</span>
              <input
                type="number"
                value={searchCriteria.pillars.max ?? ''}
                onChange={(e) => handleNumberChange(
                  e.target.value,
                  (value) => setSearchCriteria(prev => ({
                    ...prev,
                    pillars: { ...prev.pillars, max: value }
                  }))
                )}
                className={inputClassName}
                placeholder="最大値"
                onKeyDown={(e) => {
                  if (e.key === 'e' || e.key === 'E' || e.key === '-') {
                    e.preventDefault();
                  }
                }}
                />
            </div>
          </div>
          </div>
        </div>
      </div>
    </form>
  );
}