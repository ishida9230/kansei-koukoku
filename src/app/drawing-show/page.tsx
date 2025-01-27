'use client';

import React from 'react';
import { DrawingForm } from '@/components/pages/drawing-register/drawingValueForm/forms/DrawingForm';
import { DrawingValueForm } from '@/components/pages/drawing-register/drawingValueForm/forms/DrawingValueForm';
import MainLayout from '@/components/global/layout/MainLayout';
import { useState } from 'react';
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
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

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
          />

          {/* 風速・板面 */}
          <WindAndBoardRow
            formData={formData}
            setFormData={setFormData}
            inputClass=""
            variant="header"
          />

          {/* 看板サイズ（縦・横・板下・面数） */}
          <BoardMeasurementsRow
            formData={formData}
            setFormData={setFormData}
            inputClass=""
            variant="header"
          />

          {/* 柱本数・柱サイズ・柱厚み */}
          <PillarBasicRow
            formData={formData}
            setFormData={setFormData}
            inputClass=""
            variant="header"
          />

          {/* 根入寸法・柱の根入れ */}
          <PillarEmbedmentRow
            formData={formData}
            setFormData={setFormData}
            inputClass=""
            variant="header"
          />

          {/* 抱きあり・基礎形状・基礎φ */}
          <PillarFoundationRow
            formData={formData}
            setFormData={setFormData}
            inputClass=""
            variant="header"
          />

          {/* 根巻あり・左右持ち出し幅 */}
          <PillarExtensionRow
            formData={formData}
            setFormData={setFormData}
            inputClass=""
            variant="header"
          />

          {/* 柱の間幅 */}
          {/* //TODO: CPを分けているので、修正必要 */}
          <PillarSpacingRowHeader
            formData={formData}
            setFormData={setFormData}
            inputClass=""
            variant="header"
          />

          {/* 最大支配幅・最大面振り幅・胴縁サイズ・胴縁本数 */}
          <PillarFurringBasicRow
            formData={formData}
            setFormData={setFormData}
            inputClass=""
            variant="header"
          />

          {/* 胴縁間幅 */}
           {/* //TODO: CPを分けているので、修正必要 */}
          <FurringSpacingRowHeader
            formData={formData}
            setFormData={setFormData}
            inputClass=""
            variant="header"
          />

          {/* はね出し寸法(上下)・胴縁の厚み・最大胴縁ピッチ */}
          <PillarFurringDetailRow
            formData={formData}
            setFormData={setFormData}
            inputClass=""
            variant="header"
          />

          {/* 抱き(11V)・アルミ枠ピッチ・板〜柱トップ */}
          <PillarFinalDetailRow
            formData={formData}
            setFormData={setFormData}
            inputClass=""
            variant="header"
          />
        </div>

        <div className="h-[calc(100%-5rem)] bg-white border-r flex">
          <div className="flex-[7] border-slate-300 overflow-y-auto">
            <DrawingForm
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          <div className="flex-[3] bg-white mt-4 pr-2 overflow-y-auto">
            <DrawingValueForm
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
