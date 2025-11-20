📘 README（ローカルセットアップ手順だけ版）

以下を README.md にそのまま貼れます👇

🚀 ローカル環境でのセットアップ手順

このプロジェクトは Next.js / TypeScript / Supabase / Tailwind CSS を使用したタスク管理アプリです。
以下の手順に従えば、ローカル環境で簡単に動作確認ができます。

🧱 1. 必要ツールのインストール

以下がインストールされていることを確認してください：

Node.js（18以上推奨）
https://nodejs.org/

npm（Node.js に同梱）

Git（任意）

📦 2. リポジトリをクローン
git clone https://github.com/Umintyu-Okinawa/your-repository.git

cd your-repository

📁 3. パッケージをインストール
npm install

🔑 4. 環境変数(.env.local)を作成

プロジェクト直下に .env.local を作成し、以下を記述してください。

NEXT_PUBLIC_SUPABASE_URL=あなたのSupabaseのURL
NEXT_PUBLIC_SUPABASE_ANON_KEY=あなたのAnonKey


※ Supabase Dashboard → 「Project Settings → API」から取得できます。

🛠 5. 開発サーバーを起動
npm run dev


以下のURLにアクセスするとアプリが起動します：

http://localhost:3000

🔍 6. 動作確認

アプリで以下を確認できます：

ユーザー登録（サインアップ）

ログイン／ログアウト

タスク追加

タスク一覧表示

タスク削除

プロフィールページ

📁 7. Tailwind CSS の設定（確認用）

本プロジェクトは Tailwind が設定済みです。
念のため確認したい場合は以下ファイルを参照してください。

tailwind.config.js

postcss.config.js

app/globals.css

🧯 トラブルシューティング

500エラー / Supabaseに接続できない
→ .env.local が正しいか確認
→ サーバー再起動（npm run dev）

スタイルが反映されない
→ tailwind.config.js の content が正しいことを確認：

content: ["./app/**/*.{js,ts,jsx,tsx}"],
