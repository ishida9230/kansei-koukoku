export interface BoardMeasurement {
  width: number | null;
  height: number | null;
  bottomMargin: number | null;
  surfaces: number | null;
}

export type CircleFoundation = {
  type: '丸';
  diameter: number | null;
};

export type RectangleFoundation = {
  type: '四角';
  width: number | null;
  height: number | null;
};

export type FoundationData = CircleFoundation | RectangleFoundation;

export interface PillarSpacing {
  width: number | null;
}

export interface FurringSize {
  width: number | null;
  height: number | null;
  isSquare: boolean;
}

export interface FurringSpacing {
  width: number | null;
}

export interface FileData {
  file: File | null;
  url: string;
  type: 'pdf' | 'jww' | 'xlsx' | 'ods' | 'bmp';
  category?: '構造図' | '詳細図' | '配置図' | 'その他';
}

export interface FormData {
  id: number;
  planNumber: number | null;//企画番号
  prefecture: string | null;//都道府県
  city: string | null;//市区郡
  windSpeed: number | null;//風速
  boardSide: 'single' | 'double' | null;//板面
  measurements: BoardMeasurement[];//看板サイズ（縦・横・板下・面数）
  pillar: {
    count: number | null;
    size: number | null;
    thickness: number | null;
    holeDepth: number | null;
    embedment: number | null;
    foundation: FoundationData | null;
    embrace: '縦抱き' | '横抱き' | null;
    structuralBase: number | null;
    leftExtension: number | null;
    rightExtension: number | null;
    spacings: PillarSpacing[];
    maxControlWidth: number | null;
    maxFaceWidth: number | null;
    furringSize: string | null;
    furringCount: number | null;
    furringSpacings: FurringSpacing[];
    topOverhang: number | null;
    bottomOverhang: number | null;
    furringThickness: number | null;
    maxFurringPitch: number | null;
    embrace11v: number | null;
    aluminumPitch: number | null;
    topDistance: number | null;
  };
  files: FileData[];
}

export interface ValidationErrors {
  [key: string]: string[];
} 