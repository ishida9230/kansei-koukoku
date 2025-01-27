import React, { useState } from 'react';
import { FormData, ValidationErrors } from '@/components/pages/drawing-register/types';
import {
  BasicInfoRow,
  BoardMeasurementsRow,
  PillarBasicRow,
  PillarEmbedmentRow,
  PillarFoundationRow,
  PillarExtensionRow,
  PillarFurringBasicRow,
  PillarFurringDetailRow,
  PillarFinalDetailRow,
  WindAndBoardRow,
  PillarSpacingRow,
  FurringSpacingRow
} from '../rows';
import { FormActionButtons } from '../buttons/FormActionButtons';

interface DrawingValueFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors?: ValidationErrors;
  handleSubmit?: (e: React.FormEvent) => void;
  showConfirmButton?: boolean;
}

export function DrawingValueForm({ 
  formData,
  setFormData,
  errors,
  handleSubmit,
  showConfirmButton,
}: DrawingValueFormProps) {
  const [isConfirmMode, setIsConfirmMode] = useState(true);

  // 確認ボタンのハンドラー
  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmMode(true);
  };

  // 修正ボタンのハンドラー
  const handleEdit = () => {
    setIsConfirmMode(false);
  };

  // 入力フィールドの共通クラス
  const inputClass = `w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
    isConfirmMode ? 'bg-gray-100' : ''
  }`;

  return (
    <form className="w-full h-full">
      <div className="flex flex-col gap-6 border border-gray-200 px-2 pr-2 pt-2">
        {/* 企画番号〜板面 */}
        <BasicInfoRow 
          formData={formData}
          setFormData={setFormData}
          inputClass={inputClass}
          isConfirmMode={isConfirmMode}
        />

        {/* 風速・板面 */}
        <WindAndBoardRow
          formData={formData}
          setFormData={setFormData}
          inputClass={inputClass}
          isConfirmMode={isConfirmMode}
        />

        {/* 看板サイズ（縦・横・板下・面数） */}
        <BoardMeasurementsRow
          formData={formData}
          setFormData={setFormData}
          inputClass={inputClass}
          isConfirmMode={isConfirmMode}
          errors={errors}
        />

        {/* 柱本数・柱サイズ・柱厚み */}
        <PillarBasicRow
          formData={formData}
          setFormData={setFormData}
          inputClass={inputClass}
          isConfirmMode={isConfirmMode}
        />

        {/* 根入寸法・柱の根入れ */}
        <PillarEmbedmentRow
          formData={formData}
          setFormData={setFormData}
          inputClass={inputClass}
          isConfirmMode={isConfirmMode}
        />

        {/* 抱きあり・基礎形状・基礎φ */}
        <PillarFoundationRow
          formData={formData}
          setFormData={setFormData}
          inputClass={inputClass}
          isConfirmMode={isConfirmMode}
        />

        {/* 根巻あり・左右持ち出し幅 */}
        <PillarExtensionRow
          formData={formData}
          setFormData={setFormData}
          inputClass={inputClass}
          isConfirmMode={isConfirmMode}
        />

        {/* 柱の間幅 */}
        {/* //TODO: CPを分けているので、修正必要 */}
        <PillarSpacingRow
          formData={formData}
          setFormData={setFormData}
          inputClass={inputClass}
          isConfirmMode={isConfirmMode}
        />

        {/* 最大支配幅・最大面振り幅・胴縁サイズ・胴縁本数 */}
        <PillarFurringBasicRow
          formData={formData}
          setFormData={setFormData}
          inputClass={inputClass}
          isConfirmMode={isConfirmMode}
        />

        {/* 胴縁間幅 */}
        {/* //TODO: CPを分けているので、修正必要 */}
        <FurringSpacingRow
          formData={formData}
          setFormData={setFormData}
          inputClass={inputClass}
          isConfirmMode={isConfirmMode}
        />

        {/* はね出し寸法(上下)・胴縁の厚み・最大胴縁ピッチ */}
        <PillarFurringDetailRow
          formData={formData}
          setFormData={setFormData}
          inputClass={inputClass}
          isConfirmMode={isConfirmMode}
        />

        {/* 抱き(11V)・アルミ枠ピッチ・板〜柱トップ */}
        <PillarFinalDetailRow
          formData={formData}
          setFormData={setFormData}
          inputClass={inputClass}
          isConfirmMode={isConfirmMode}
        />

        {/* 確認・修正・登録ボタン */}
        <FormActionButtons
          isConfirmMode={isConfirmMode}
          onConfirm={handleConfirm}
          onEdit={handleEdit}
          onSubmit={handleSubmit}
          showConfirmButton={showConfirmButton}
        />
      </div>
    </form>
  );
}