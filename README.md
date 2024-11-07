# 🦘 Bouncing Editor

文字が跳ねまくって収集がつかないテキストエディタ

## 📝 概要

バウンドエディターは、入力した文字が物理演算で跳ね回るという、実用性を考えない純粋な「クソアプリ」として作られたテキストエディターです。

### 特徴

- 入力した文字が物理演算で跳ね回る
- 日本語入力（IME）完全対応
- 文字種によって跳ね方が変化
- 完全に使いづらい（仕様です）

## 🚀 デモ

https://bouncing-editor.vercel.app/

## 🔧 技術スタック

- React
- TypeScript
- Tailwind CSS

## ⚙️ セットアップ

```bash
# リポジトリのクローン
git clone https://github.com/tmasuyama1114/bouncing-editor

# 依存関係のインストール
cd bouncing-editor
npm install

# 開発サーバーの起動
npm run dev
```

## 💡 使い方

1. テキストボックスに文字を入力
2. 英数字は直接入力で跳ねる
3. 日本語はIME確定時に跳ねる

## 🎮 操作方法

- 英数字: 直接入力可能
- 日本語: IMEで入力→確定で跳ねる
- 文字サイズ: 文字種により自動で調整

## 🐛 既知の問題

- 大量の文字を入力すると重くなる
- 文字が画面外に飛んでいくことがある
- たまに文字が宇宙まで飛んでいく（仕様です）

## 📚 実装の詳細

### コンポーネント構成

```
src/
├── components/
│   ├── BouncingEditor.tsx   # メインコンポーネント
│   └── BouncingCharacter.tsx # 文字アニメーション用コンポーネント
├── types/
│   └── index.ts             # 型定義
└── utils/
    └── physics.ts           # 物理演算ユーティリティ
```

### 主要機能

1. 物理演算システム

   - 重力
   - 跳ね返り
   - 摩擦

2. 入力制御
   - IME対応
   - 文字種判定
   - アニメーション制御

## 📜 ライセンス

[MIT License](LICENSE)
