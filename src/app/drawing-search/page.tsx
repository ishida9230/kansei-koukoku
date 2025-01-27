'use client';

import { useState } from 'react';
import MainLayout from '@/components/global/layout/MainLayout';
import { SearchForm } from '@/components/pages/drawing-search/searchForm/SearchForm';
import { SearchCriteria } from '@/components/pages/drawing-search/types';
import { initialSearchCriteria } from '@/components/pages/drawing-search/constants';
import { SearchResultTable } from '@/components/pages/drawing-search/searchResults/table/SearchResultTable';
import { FormData } from '@/components/pages/drawing-register/types';

export default function DrawingSearchPage() {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>(initialSearchCriteria);

  //mockデータ複数パターン定義する
  const mockResults: FormData[] = [
    {
      id: 1,
      planNumber: 96150,
      prefecture: '東京都',
      city: '新宿区',
      windSpeed: 34,
      boardSide: 'single',
      measurements: [
        {
          width: 1800,
          height: 900,
          bottomMargin: 2700,
          surfaces: 1,
        }
      ],
      pillar: {
        count: 2,
        size: 200,
        thickness: 5.8,
        holeDepth: 1500,
        embedment: 1300,
        foundation: {
          type: '四角',
          width: 600,
          height: 600,
        },
        embrace: '縦抱き',
        structuralBase: 300,
        leftExtension: 200,
        rightExtension: 200,
        spacings: [
          { width: 1400 }
        ],
        maxControlWidth: 1800,
        maxFaceWidth: 1600,
        furringSize: '40角',
        furringCount: 3,
        furringSpacings: [
          { width: 450 },
          { width: 450 }
        ],
        topOverhang: 100,
        bottomOverhang: 100,
        furringThickness: 2.3,
        maxFurringPitch: 900,
        embrace11v: 50,
        aluminumPitch: 455,
        topDistance: 200,
      },
      files: [
        { file: null, url: '/pdfs/96150 構造図.pdf', type: 'pdf', category: '構造図' },
        { file: null, url: '/pdfs/96150 詳細図.pdf', type: 'pdf', category: '詳細図' },
        { file: null, url: '/pdfs/96150 詳細図　w1200x2700w.jww.', type: 'jww', category: 'その他' }
      ]
    },
    {
      id: 2,
      planNumber: 102191,
      prefecture: '三重県',
      city: null,
      windSpeed: 34,
      boardSide: 'single',
      measurements: [
        {
          width: 5400,
          height: 2700,
          bottomMargin: 2300,
          surfaces: 1,
        },
      ],
      pillar: {
        count: 4,
        size: 100,
        thickness: 3.2,
        holeDepth: 1400,
        embedment: 1300,
        foundation: {
          type: '四角',
          width: 450,
          height: 300,
        },
        embrace: '横抱き',
        structuralBase: 0,
        leftExtension: 1300,
        rightExtension: 675,
        spacings: [
          { width: 1000 },
          { width: 700 },
          { width: 1350 }
        ],
        maxControlWidth: 1350,
        maxFaceWidth: 0,
        furringSize: '40角',
        furringCount: 3,
        furringSpacings: [],
        topOverhang: 450,
        bottomOverhang: 450,
        furringThickness: 1.6,
        maxFurringPitch: 900,
        embrace11v: 1650,
        aluminumPitch: 900,
        topDistance: 100,
      },
      files: [
        { file: null, url: '/pdfs/102191 構造図.pdf', type: 'pdf', category: '構造図' },
        { file: null, url: '/pdfs/102191 詳細図.pdf', type: 'pdf', category: '詳細図' },
        { file: null, url: '/pdfs/102191 102191 構造図w5400xh2700　5000s.jww.', type: 'jww', category: 'その他' },
        { file: null, url: '/pdfs/102191 詳細図　w1200x2700w.jww.', type: 'jww', category: 'その他' }
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="flex flex-col gap-4 p-4">
        {/* 検索フォーム */}
        <div>
          <SearchForm
            searchCriteria={searchCriteria}
            setSearchCriteria={setSearchCriteria}
          />
        </div>

        {/* 検索結果 */}
        <div className="h-[calc(100vh-200px)] rounded-lg shadow overflow-auto">
          <SearchResultTable results={mockResults} />
        </div>
      </div>
    </MainLayout>
  );
}
