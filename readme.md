# AI Insight Generator

Dify API をバックエンドとして利用した **AIテキスト生成アプリケーション**です。
ユーザーの質問を AI が解析し、以下の 3 つの形式で結果を生成します。

* **説明**（詳細解説）
* **ポイント**（スライド風の要点）
* **SNS投稿**（短い投稿文）

Flask をフロントエンドアプリとして使用し、Dify API を呼び出します。

---

# システム概要

ユーザーが入力した質問を AI に送信し、生成結果を整理された形式で表示します。

通常の AI チャットと違い、回答を **構造化された情報**として出力します。

```
質問
 ↓
AI解析
 ↓
説明
ポイント
SNS投稿
```

---

# システム構成

```
Browser
   ↓
Flask Web App
   ↓ REST API
Dify API
   ↓
LLM
```

---

# 画面仕様

入力フォームには以下の項目があります。

| 項目   | 必須 | 説明      |
| ---- | -- | ------- |
| タイトル | 任意 | 質問のタイトル |
| 組織   | 任意 | 所属組織    |
| 質問   | 必須 | AIへの質問  |

ボタン

```
Generate
```

---

# AIレスポンス仕様

Difyは以下のJSON形式で回答を返すことを想定しています。

```json
{
  "description": "詳細解説",
  "points": [
    "ポイント1",
    "ポイント2",
    "ポイント3"
  ],
  "sns_post": "SNS投稿文"
}
```

---

# 表示仕様

AIの回答は以下の3つのエリアに分けて表示します。

## 説明

詳細解説を表示します。

* Markdown対応
* 長文表示

---

## ポイント

プレゼン資料のような **カードUI** で表示します。

```
ポイント1
ポイント2
ポイント3
```

---

## SNS投稿

SNSに投稿できる短文を表示します。

特徴

* 吹き出し風UI
* ワンクリックコピー

---

# UI仕様

UIは **モダンUIデザイン** を採用しています。

使用技術

* TailwindCSS
* Vanilla JavaScript
* Flask Template

---

# アニメーション

AI生成中のUXを向上させるため、以下の演出を行います。

ローディングメッセージ

```
AIが質問を分析しています...
情報を整理しています...
回答を生成しています...
```

---

# ディレクトリ構成

```
ai-insight-app
│
├─ app.py
│
├─ services
│   └─ dify_client.py
│
├─ templates
│   └─ index.html
│
├─ static
│   └─ js
│       └─ app.js
│
├─ .env
└─ README.md
```

---

# セットアップ

## 1 ライブラリインストール

```
pip install flask markdown requests python-dotenv
```

---

## 2 環境変数設定

`.env` ファイルを作成します。

```
DIFY_API_KEY=your_api_key
```

---

## 3 アプリ起動

```
python app.py
```

ブラウザでアクセス

```
http://localhost:5000
```

---

# Dify API設定

このアプリでは以下のエンドポイントを使用します。

```
POST https://api.dify.ai/v1/completion-messages
```

リクエスト例

```json
{
  "inputs": {
    "title": "タイトル",
    "organization": "組織",
    "text": "質問"
  },
  "response_mode": "blocking",
  "user": "flask-user"
}
```

---

# エラー処理

以下のケースに対応しています。

| エラー     | 対応         |
| ------- | ---------- |
| 質問未入力   | バリデーションエラー |
| JSON崩れ  | アプリ側で補正    |
| Difyエラー | メッセージ表示    |

---

# セキュリティ

* APIキーは `.env` で管理
* `.env` は Git にコミットしない
* HTMLエスケープ対応

`.gitignore`

```
.env
```

---

# 将来拡張

予定している拡張機能

* AI回答履歴保存
* SNSシェアボタン
* ストリーミング表示
* モデル切替
* 多言語対応

---

# ライセンス

MIT License
