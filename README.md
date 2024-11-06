# React + Vite Project Template

このプロジェクトは、モダンなReactアプリケーション開発のためのテンプレートです。Vite、Tailwind CSS、Vitest、ESLint、Prettier、GitHub Actions、Huskyなどの最新のツールを組み合わせて、効率的な開発環境を提供します。

## 機能

- ⚡️ **Vite** - 超高速なフロントエンド開発環境
- ⚛️ **React** - UIコンポーネントライブラリ
- 🎨 **Tailwind CSS** - ユーティリティファーストのCSSフレームワーク
- ✅ **Vitest** - 高速なユニットテストフレームワーク
- 📝 **ESLint** - コード品質チェック
- ✨ **Prettier** - コードフォーマッター
- 🔄 **GitHub Actions** - 継続的インテグレーション
- 🐶 **Husky** - Gitフックを使用した自動チェック

## 必要条件

- Node.js 18.x以上
- npm 7.x以上

## セットアップ

```bash
# リポジトリのクローン
git clone <repository-url>
cd <project-name>

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## 利用可能なスクリプト

```bash
# 開発サーバーの起動
npm run dev

# プロダクションビルド
npm run build

# ビルドのプレビュー
npm run preview

# テストの実行
npm test

# テストカバレッジの確認
npm run test:coverage

# リントチェック
npm run lint

# コードフォーマット
npm run format
```

## プロジェクト構造

```
.
├── .github/
│   └── workflows/    # GitHub Actions設定
├── src/
│   ├── components/   # Reactコンポーネント
│   ├── test/        # テスト関連ファイル
│   ├── App.tsx      # ルートコンポーネント
│   └── main.tsx     # エントリーポイント
├── .eslintrc.cjs    # ESLint設定
├── .prettierrc      # Prettier設定
├── vite.config.ts   # Vite設定
└── tailwind.config.js # Tailwind CSS設定
```

## 開発フロー

1. 新しい機能の開発を始める際は、新しいブランチを作成
2. コードを変更
3. 自動フォーマットとリントチェックが実行される（commit時）
4. テストを実行
5. PRを作成
6. GitHub Actionsによる自動チェック
7. レビュー後にマージ

## テスト

Vitestを使用してテストを記述します。例：

```typescript
// Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

test('renders button with correct text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByText('Click me')).toBeInTheDocument()
})
```

## コード品質

- ESLintとPrettierを使用してコードの品質とフォーマットを管理
- Huskyとlint-stagedを使用して、コミット前に自動チェックを実行
- GitHub Actionsで継続的インテグレーションを実行

## GitHub Actions

以下のチェックが自動で実行されます：

- リントチェック
- コードフォーマットチェック
- テストの実行
- ビルドの確認

## スタイリング

Tailwind CSSを使用してスタイリングを行います：

```tsx
function Button({ children }) {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      {children}
    </button>
  )
}
```
