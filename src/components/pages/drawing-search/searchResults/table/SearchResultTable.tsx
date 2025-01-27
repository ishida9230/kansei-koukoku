'use client';

import React, { useState } from 'react';
import { CircleFoundation, FormData, RectangleFoundation } from '@/components/pages/drawing-register/types';
import { TableHeader } from './components/TableHeader';
import { useRouter } from 'next/navigation';

interface SearchResultTableProps {
  results?: FormData[];
}

export const SearchResultTable: React.FC<SearchResultTableProps> = ({ results = [] }) => {
  const router = useRouter();

  // 全データから最大のspacings数を取得
  const maxSpacingsCount = Math.max(
    4, // デフォルト値
    ...results.map(result => result.pillar?.spacings?.length || 0)
  );

  // 全データから最大のfurringSpacings数を取得
  const maxFurringSpacingsCount = Math.max(
    4, // デフォルト値
    ...results.map(result => result.pillar?.furringSpacings?.length || 0)
  );

  const handleRowClick = (result: FormData) => {
    //TODO: 仮実装
    //ローカルストレージの値を削除
    localStorage.removeItem('selectedDrawing');
    //ローカルストレージに保存
    localStorage.setItem('selectedDrawing', JSON.stringify(result));
    // URLクエリパラメータとしてデータを渡す
    router.push(`/drawing-show/${result.id}`);
  };

  if (results.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        検索結果がありません
      </div>
    );
  }

  return (
    <div className="bg-white h-[calc(100vh-200px)] p-4">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <table className="border-collapse table-fixed" style={{ width: '1700px' }}>
            <TableHeader results={results} />
            <tbody>
              {results.map((result) => {
                
                return (
                  <tr
                    key={result.id}
                    onClick={() => handleRowClick(result)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="border px-4 py-2 w-[100px] truncate">{result.planNumber || '-'}</td>
                    <td className="border px-4 py-2 w-[100px] truncate">{result.prefecture || '-'}</td>
                    <td className="border px-4 py-2 w-[100px] truncate">{result.city || '-'}</td>
                    <td className="border px-4 py-2 w-[100px] truncate">{result.windSpeed || '-'}</td>
                    <td className="border px-4 py-2 w-[100px] truncate">{result.boardSide ? (result.boardSide === 'single' ? '片面' : '両面') : '-'}</td>
                    <td className="border px-4 py-2 w-[100px] truncate">
                      <div className="flex flex-col">
                        {result.measurements.map((measurement, index) => (
                          <span key={index} className="whitespace-nowrap">
                            {measurement.width || '-'}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="border px-4 py-2 w-[100px] truncate">
                      <div className="flex flex-col">
                        {result.measurements.map((measurement, index) => (
                          <span key={index} className="whitespace-nowrap">
                            {measurement.height || '-'}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="border px-4 py-2 w-[100px] truncate">
                      <div className="flex flex-col">
                        {result.measurements.map((measurement, index) => (
                          <span key={index} className="whitespace-nowrap">
                            {measurement.bottomMargin || '-'}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="border px-4 py-2 w-[100px] truncate">
                      <div className="flex flex-col">
                        {result.measurements.map((measurement, index) => (
                          <span key={index} className="whitespace-nowrap">
                            {measurement.surfaces || '-'}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="border px-4 py-2 w-[100px] truncate">{result.pillar?.count || '-'}</td>
                    <td className="border px-4 py-2 w-[100px] truncate">{result.pillar?.size || '-'}</td>
                    <td className="border px-4 py-2 w-[100px] truncate">{result.pillar?.thickness || '-'}</td>
                    <td className="border px-4 py-2 w-[100px] truncate">{result.pillar?.holeDepth || '-'}</td>
                    <td className="border px-4 py-2 w-[100px] truncate">{result.pillar?.embedment || '-'}</td>

                    <td className="border px-4 py-2 w-[120px] truncate">
                      {result.pillar?.foundation?.type === "丸" ? '〇' : result.pillar?.foundation?.type === "四角" ? '□' : '-'}
                    </td>

                    <td className="border px-4 py-2 w-[100px] truncate">
                      {result.pillar?.foundation?.type === '丸' ? (
                        (result.pillar.foundation as CircleFoundation)?.diameter || '-'
                      ) : result.pillar?.foundation?.type === '四角' ? (
                        `${(result.pillar.foundation as RectangleFoundation)?.width || '-'}×${
                          (result.pillar.foundation as RectangleFoundation)?.height || '-'
                        }`
                      ) : (
                        '-'
                      )}
                    </td>

                    <td className="border px-4 py-2 w-[100px] truncate">
                      {result.pillar?.embrace || '-'}
                    </td>

                    <td className="border px-4 py-2 w-[100px] truncate">
                      {result.pillar?.structuralBase || '-'}
                    </td>
                    <td className="border px-4 py-2 w-[130px] truncate">{result.pillar?.leftExtension || '-'}</td>
                    <td className="border px-4 py-2 w-[130px] truncate">{result.pillar?.rightExtension || '-'}</td>
                    {result.pillar?.spacings.map((spacing, index) => (
                      <td key={index} className="border px-4 py-2 w-[120px] truncate">
                        {spacing.width || '-'}
                      </td>
                    ))}
                    {Array.from({ length: Math.max(4, maxSpacingsCount) - (result.pillar?.spacings?.length || 0) }).map((_, i) => (
                      <td key={`empty-spacing-${i}`} className="border px-4 py-2 w-[120px] truncate">-</td>
                    ))}
                    <td className="border px-4 py-2 w-[120px] truncate">{result.pillar?.maxControlWidth || '-'}</td>
                    <td className="border px-4 py-2 w-[130px] truncate">{result.pillar?.maxFaceWidth || '-'}</td>
                    <td className="border px-4 py-2 w-[120px] truncate">{result.pillar?.furringSize || '-'}</td>
                    <td className="border px-4 py-2 w-[120px] truncate">{result.pillar?.furringCount || '-'}</td>
                    {result.pillar?.furringSpacings.map((spacing, index) => (
                        <td key={index} className="border px-4 py-2 w-[120px] truncate">
                        {spacing.width || '-'}
                      </td>
                    ))}
                    {Array.from({ length: Math.max(4, maxFurringSpacingsCount) - (result.pillar?.furringSpacings?.length || 0) }).map((_, i) => (
                      <td key={`empty-furring-${i}`} className="border px-4 py-2 w-[120px] truncate">-</td>
                    ))}
                    <td className="border px-4 py-2 w-[150px] truncate">{result.pillar?.topOverhang || '-'}</td>
                    <td className="border px-4 py-2 w-[150px] truncate">{result.pillar?.bottomOverhang || '-'}</td>
                    <td className="border px-4 py-2 w-[120px] truncate">{result.pillar?.furringThickness || '-'}</td>
                    <td className="border px-4 py-2 w-[150px] truncate">{result.pillar?.maxFurringPitch || '-'}</td>
                    <td className="border px-4 py-2 w-[120px] truncate">{result.pillar?.embrace11v || '-'}</td>
                    <td className="border px-4 py-2 w-[150px] truncate">{result.pillar?.aluminumPitch || '-'}</td>
                    <td className="border px-4 py-2 w-[150px] truncate">{result.pillar?.topDistance || '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
