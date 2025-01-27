# 図面登録ページ詳細設計

＊質問
検索キーワードでGLで検索するが、登録値にもGLの項目を表示する？？
その場合看板(縦)、(横)の項目を自動的に足して表示する？？
看板サイズの項目は5行の方が良い？？

## 1. 概要
図面のPDFをインポートし、関連データを登録するページ

## 2. 画面構成
### 2.1 コンポーネント構成
- `src/app/(dashboard)/drawing-register/page.tsx`
  - ヘッダー (`Header.tsx`)
  - サイドバー (`Sidebar.tsx`)
  - 図面エリア (`DrawingArea.tsx`)
  - 登録フォーム (`RegistrationForm.tsx`)

### 2.2 UI要素
- メインコンテンツ
  - 図面表示エリア
  - 登録フォーム

## 3. 機能仕様
### 3.1 図面インポート機能
1. インポート方法
   - ドラッグ&ドロップ(一括)
   - ディレクトリを選択して一括でインポート
2. ファイル制限
   - 拡張子: .pdf
   - ファイルサイズ: 最大30MB
   - ページ数: 最大10ページ
   - 解像度: 最大300dpi推奨
   - 拡張子: .jww
   - ファイルサイズ: 最大20MB 
   - バージョン: JW_CAD 8.0以降
   - 拡張子: Excel(.xlsx)
   - ファイルサイズ: 最大10MB
   - 拡張子: .ods
   - ファイルサイズ: 最大10MB
   - 拡張子: .bmp
   - ファイルサイズ: 最大10MB
＊Thumbs.db (0.04MB)のファイルは除外するか確認

3. インポート処理
   - ファイルの構造チェック
   - 一時保存領域への保存
   - PDFはPDFPreviewで表示


<!-- #### 3.1.1 JWW図面インポート
1. インポート方法
   - ドラッグ&ドロップ
   - ファイル選択ダイアログ
2. ファイル制限
   - 拡張子: .jww
   - ファイルサイズ: 最大20MB
   - バージョン: JW_CAD 8.0以降
3. インポート処理
   - ファイルの構造チェック
   - 一時保存領域への保存

#### 3.1.2 PDF図面インポート
1. インポート方法、react-dropzone
   - ドラッグ&ドロップ
   - ファイル選択ダイアログ
2. ファイル制限pdf-lib
   - 拡張子: .pdf
   - ファイルサイズ: 最大30MB
   - ページ数: 最大10ページ
   - 解像度: 最大300dpi推奨
3. インポート処理
   - PDFのバリデーション
   - 画面に図面を表示、react-pdf-viewer
   - 一時保存領域への保存

#### 3.1.3 共通機能
1. プレビュー機能
   - 図面の縮小表示
   - ズーム機能（100%～400%）
   - 回転機能（90度単位）
2. エラーハンドリング
   - ファイル形式チェック
   - ファイルサイズチェック
   - 破損ファイルチェック
3. 進捗表示
   - アップロード進捗バー
   - 処理状態の表示 -->

### 3.3 バリデーションルール
- すべての数値入力
  - 必須入力
  - 最小値: 0
  - 最大値: 10000
  - 小数点以下1桁まで

### 3.4 データ保存
- 一時保存機能
- 確定保存機能
- 下書き機能


## 5. エラーハンドリング
### 5.1 表示エラー
- ファイル読み込みエラー
- プレビュー表示エラー
- ネットワークエラー

### 5.2 入力エラー
- 数値範囲エラー
- 必須入力エラー
- 形式エラー 