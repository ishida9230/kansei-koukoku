import { FormData } from '@/components/pages/drawing-register/types';

// 基本のカラム定義（spacingsとfurringSpacings以外）
const baseColumns = [
  { id: 'planNumber', label: '企画番号', width: 100 },
  { id: 'prefecture', label: '都道府県', width: 100 },
  { id: 'city', label: '市区郡', width: 100 },
  { id: 'windSpeed', label: '風速', width: 100 },
  { id: 'boardSide', label: '板面', width: 100 },
  { id: 'boardWidth', label: '看板（縦）', width: 120 },
  { id: 'boardHeight', label: '看板（横）', width: 120 },
  { id: 'bottomMargin', label: '板下', width: 100 },
  { id: 'surfaces', label: '面数', width: 100 },
  { id: 'pillarCount', label: '柱本数', width: 100 },
  { id: 'pillarSize', label: '柱サイズ', width: 100 },
  { id: 'pillarThickness', label: '柱厚み', width: 100 },
  { id: 'holeDepth', label: '根入寸法', width: 100 },
  { id: 'embedment', label: '柱の根入れ', width: 120 },
  { id: 'foundation', label: '基礎(〇・□)', width: 120 },
  { id: 'foundationWidth', label: '基礎', width: 120 },
  { id: 'embrace', label: '抱きあり', width: 100 },
  { id: 'structuralBase', label: '根巻あり', width: 100 },
  { id: 'leftExtension', label: '左持ち出し幅', width: 130 },
  { id: 'rightExtension', label: '右持ち出し幅', width: 130 },
] as const;

// 柱の間幅カラム（デフォルト4つ）
const createPillarSpacingColumns = (maxCount: number = 4) => {
  return Array.from({ length: maxCount }, (_, i) => ({
    id: `pillarSpacing${i + 1}`,
    label: `柱の間幅${i + 1}`,
    width: 120,
  }));
};

// 胴縁間幅カラム（デフォルト4つ）
const createFurringSpacingColumns = (maxCount: number = 4) => {
  return Array.from({ length: maxCount }, (_, i) => ({
    id: `furringSpacing${i + 1}`,
    label: `胴縁間幅${i + 1}`,
    width: 120,
  }));
};

// 残りのカラム
const endColumns = [
  { id: 'maxControlWidth', label: '最大支配幅(自動)', width: 120 },
  { id: 'maxFaceWidth', label: '最大面振り幅', width: 130 },
  { id: 'furringSize', label: '胴縁サイズ', width: 120 },
  { id: 'furringCount', label: '胴縁本数', width: 120 },
  { id: 'furringSpacing1', label: '胴縁間幅1', width: 120 },
  { id: 'furringSpacing2', label: '胴縁間幅2', width: 120 },
  { id: 'furringSpacing3', label: '胴縁間幅3', width: 120 },
  { id: 'furringSpacing4', label: '胴縁間幅4', width: 120 },
  { id: 'topOverhang', label: 'はね出し寸法(上)', width: 150 },
  { id: 'bottomOverhang', label: 'はね出し寸法(下)', width: 150 },
  { id: 'furringThickness', label: '胴縁の厚み', width: 120 },
  { id: 'maxFurringPitch', label: '最大胴縁ピッチ', width: 150 },
  { id: 'embrace11v', label: '抱き(11V)', width: 120 },
  { id: 'aluminumPitch', label: 'アルミ枠ピッチ', width: 150 },
  { id: 'topDistance', label: '板〜柱トップ', width: 150 },
] as const;

// 動的にカラムを生成する関数
export const getColumns = (results: FormData[]) => {
  // 全データから最大のspacings数を取得（nullチェックを追加）
  const maxSpacingsCount = Math.max(
    4, // デフォルト値
    ...results.map(result => result.pillar?.spacings?.length ?? 4)
  );

  // 全データから最大のfurringSpacings数を取得（nullチェックを追加）
  const maxFurringSpacingsCount = Math.max(
    4, // デフォルト値
    ...results.map(result => result.pillar?.furringSpacings?.length ?? 4)
  );

  return [
    ...baseColumns,
    ...createPillarSpacingColumns(maxSpacingsCount),
    ...endColumns.slice(0, endColumns.findIndex(col => col.id === 'furringSpacing1')),
    ...createFurringSpacingColumns(maxFurringSpacingsCount),
    ...endColumns.slice(endColumns.findIndex(col => col.id === 'topOverhang')),
  ];
}; 