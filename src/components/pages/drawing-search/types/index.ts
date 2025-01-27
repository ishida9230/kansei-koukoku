// 検索条件の型定義
export type SearchCriteria = {
    size: {
      width: { min: number | null; max: number | null };
      height: { min: number | null; max: number | null };
    };
    gl: { min: number | null; max: number | null };
    pillars: { min: number | null; max: number | null };
  }
  