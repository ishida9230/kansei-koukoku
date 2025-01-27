'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { DrawingForm } from '@/components/pages/drawing-register/drawingValueForm/forms/DrawingForm';
import { DrawingValueForm } from '@/components/pages/drawing-register/drawingValueForm/forms/DrawingValueForm';
import MainLayout from '@/components/global/layout/MainLayout';
import { FormData } from '@/components/pages/drawing-register/types';
import { INITIAL_FORM_DATA } from '@/components/pages/drawing-register/drawingValueForm/constants/initialFormData';
import {
  BasicInfoRow,
  PillarBasicRow,
  PillarExtensionRow,
  PillarEmbedmentRow,
  PillarFurringBasicRow,
  PillarFurringDetailRow,
  PillarFinalDetailRow,
  BoardMeasurementsRow,
  PillarFoundationRow,
  PillarSpacingRowHeader,
  WindAndBoardRow,
  FurringSpacingRowHeader
} from '@/components/pages/drawing-register/drawingValueForm/rows/index';

export default function DrawingShowPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmMode, setIsConfirmMode] = useState(true);

  useEffect(() => {
    const loadDrawingData = async () => {
      if (!params.id) return;

      try {
        const dataParam = localStorage.getItem('selectedDrawing');
        if (dataParam) {
          const decodedData = JSON.parse(decodeURIComponent(dataParam));
          setFormData(decodedData);
        }
      } catch (error) {
        console.error('データの解析に失敗しました:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDrawingData();
  }, [params.id, searchParams]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-lg">読み込み中...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="h-[calc(100vh-4rem)]">
        <div className="w-full border-b border-slate-300 p-4 bg-white flex gap-4 overflow-x-auto">
        {/* 企画番号〜市区郡 */}
          <BasicInfoRow
            formData={formData}
            setFormData={setFormData}
            inputClass=""
            variant="header"
            isConfirmMode={isConfirmMode}
          />
          {/* 風速・板面 */}
          <WindAndBoardRow
            formData={formData}
            setFormData={setFormData}
            inputClass=""
            variant="header"
            isConfirmMode={isConfirmMode}
          />

          {/* 看板サイズ（縦・横・板下・面数） */}
          <BoardMeasurementsRow
            formData={formData}
            setFormData={setFormData}
            inputClass=""
            variant="header"
            isConfirmMode={isConfirmMode}
          />

          {/* 柱本数・柱サイズ・柱厚み */}
          <PillarBasicRow
            formData={formData}
            setFormData={setFormData}
            inputClass=""
            variant="header"
            isConfirmMode={isConfirmMode}
          />

          {/* 根入寸法・柱の根入れ */}
          <PillarEmbedmentRow
            formData={formData}
            setFormData={setFormData}
            inputClass=""
            variant="header"
            isConfirmMode={isConfirmMode}
          />

          {/* 抱きあり・基礎形状・基礎φ */}
          <PillarFoundationRow
            formData={formData}
            setFormData={setFormData}
            inputClass=""
            variant="header"
            isConfirmMode={isConfirmMode}
          />

          {/* 根巻あり・左右持ち出し幅 */}
          <PillarExtensionRow
            formData={formData}
            setFormData={setFormData}
            inputClass=""
            variant="header"
            isConfirmMode={isConfirmMode}
          />

          {/* 柱の間幅 */}
          {/* //TODO: CPを分けているので、修正必要 */}
          <PillarSpacingRowHeader
            formData={formData}
            setFormData={setFormData}
            inputClass=""
            variant="header"
            isConfirmMode={isConfirmMode}
          />

          {/* 最大支配幅・最大面振り幅・胴縁サイズ・胴縁本数 */}
          <PillarFurringBasicRow
            formData={formData}
            setFormData={setFormData}
            inputClass=""
            variant="header"
            isConfirmMode={isConfirmMode}
          />

          {/* 胴縁間幅 */}
           {/* //TODO: CPを分けているので、修正必要 */}
          <FurringSpacingRowHeader
            formData={formData}
            setFormData={setFormData}
            inputClass=""
            variant="header"
            isConfirmMode={isConfirmMode}
          />

          {/* はね出し寸法(上下)・胴縁の厚み・最大胴縁ピッチ */}
          <PillarFurringDetailRow
            formData={formData}
            setFormData={setFormData}
            inputClass=""
            variant="header"
            isConfirmMode={isConfirmMode}
          />

          {/* 抱き(11V)・アルミ枠ピッチ・板〜柱トップ */}
          <PillarFinalDetailRow
            formData={formData}
            setFormData={setFormData}
            inputClass=""
            variant="header"
            isConfirmMode={isConfirmMode}
          />
        </div>

        <div className="h-[calc(100%-5rem)] bg-white border-r flex">
          <div className="flex-[7] border-slate-300 overflow-y-auto">
            <DrawingForm
              formData={formData}
              setFormData={setFormData}
              isConfirmMode={isConfirmMode}
            />
          </div>
          <div className="flex-[3] bg-white mt-4 pr-2 overflow-y-auto">
            <DrawingValueForm
              formData={formData}
              setFormData={setFormData}
              showConfirmButton={false}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 