# 図面検索ページ詳細設計

＊質問


## 1. 概要
登録済みの図面を検索・閲覧するためのページ。
複数の検索条件を組み合わせて図面を検索し、結果一覧から詳細を確認することができる。

## 2. 画面構成
### 2.1 コンポーネント構成
- `src/app/drawing-search/page.tsx`
  - ヘッダー (`Header.tsx`)
  - サイドバー (`Sidebar.tsx`)
  - 検索フォーム (`SearchForm.tsx`)
  - 検索結果一覧 (`SearchResults.tsx`)
  - テーブル表示(表示項目)
    - BasicInfoRow〜PillarFinalDetailRow
  - ページネーション (`Pagination.tsx`)

### 2.2 UI要素
- メインコンテンツ
  - 検索条件入力エリア
    - 看板サイズ(縦・横)
    - GL
    - 柱本数
  - 検索結果表示エリア
    - 図面表示
    - 登録値表示
    - ページネーション 