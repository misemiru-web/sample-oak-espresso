# ローカル確認用LP｜動作確認

> スクロール演出追加後も、既存スクリプトで最新CSS・JSを反映済みです。HTTP/file://・日英・指定6幅で静止表示を照合し、動き低減・高速スクロール・言語切替・JS無効時の通常表示も確認しました。詳細はリポジトリ直下の`MOTION_QA.md`を参照してください。

> この報告はローカル確認版の初回作成時の記録です。その後、本番用のOUR SPACE・装飾帯・改行改善に合わせて既存スクリプトで再生成しています。最新の確認では320/375/390/768/1024/1440px×JA/ENをHTTP・file://双方で検証し、写真・見出し・装飾帯の寸法と表示内容が一致しました。初回の「既存27ファイルが未変更」は初回作成時の結果です。詳細はリポジトリ直下の`UI_LAYOUT_QA.md`を参照してください。

実施日：2026-10-20（日本時間）

## 保存場所・閲覧手順

リポジトリ内の`local-preview/index.html`をFinderでダブルクリックして開きます。Webサーバーは不要です。フォルダーを移動・共有する場合は、`local-preview/`全体をコピーしてください。

## 今回作成したファイル

- `local-preview/index.html`：本番HTMLの画像・favicon・preload参照を`./images/...`へ変換したコピー。
- `local-preview/styles.css`、`script.js`：本番と同一内容。
- `local-preview/images/`：既存画像とfaviconの計12ファイル。本番とバイト単位で一致。
- `local-preview/THIRD_PARTY_NOTICES.md`：Lucideの出典・ライセンス文書のコピー。
- `local-preview/README.md`、本書：閲覧・再生成手順、確認結果。
- `scripts/create-local-preview.py`：本番コードを読み取り、ローカル版だけを生成・更新するスクリプト。

再生成：リポジトリのルートで`python3 scripts/create-local-preview.py`を実行します。追加パッケージ不要のPython 3.8以上に対応します。生成物を直接編集すると再生成時に上書きされます。

## 動作確認結果

Google Chrome 155.0.8059.85（macOS / headless）で、実際の`file://` URLを開いて確認しました。HTTPサーバーやファイルアクセス許可用の追加フラグは使用していません。表示・言語切替の検証中はブラウザのネットワークをオフラインにしました。

| 確認項目 | 結果 |
| --- | --- |
| 320 / 375 / 390 / 768 / 1024 / 1440 / 1920px × JA/EN | 14ケース合格。横はみ出しなし |
| 全画像・favicon | 掲載写真9枚の表示成功。予備写真・faviconを含め全12資産のブラウザ内デコード成功 |
| CSS・フォント | CSS読み込み成功。既存の配色・フォント指定を適用。フォント読み込み待ち完了 |
| Lucideアイコン | インラインSVG9点の存在・形状・線幅2・装飾SVGの読み上げ除外を確認 |
| favicon・preload | 両方ともローカル版内の`images/`へ解決することを確認 |
| JA→EN→JA | 文章・alt・aria-label・HTML lang・選択状態が追従。初期JA |
| キーボード | SpaceでEN、EnterでJAへ切替成功 |
| ページ内リンク・ナビ | 各画面幅で表示されているナビ・ロゴ・先頭へ戻るリンクをクリックし、hash更新と対象への移動を確認 |
| Googleマップ・Instagram | 元の完全URL・リンク属性を維持。スマホ・PCの表示中リンクすべてで、クリック後に開くタブのURLを照合 |
| JavaScript・ローカルファイルのエラー | pageerror・console error・requestfailedはいずれも0。表示中のリクエストはfile://のみ |
| フォルダー移動 | 空白・日本語を含む別フォルダーへコピーし、オフラインで写真表示とEN切替を確認 |
| 再生成 | 別の作業ディレクトリからの実行に成功。繰り返し生成した内容が一致 |
| 静的確認 | ローカル版のHTML参照先がすべて実在。Python構文・`node --check local-preview/script.js`・`git diff --check`に問題なし |

外部サイトのクリック検証ではリクエストをテスト内で捕捉し、遷移先URLを確認しました。Googleマップ上の実店舗ピン、Instagramの実サービス上の表示状態は今回の検証対象に含めていません。

フォントは本番版と同じOS内のフォント・フォールバックを使用します。外部配信フォント、srcset、CSS背景画像は現在の本番コードに存在しないため、追加素材やパス変更は不要でした。アイコンはインラインSVGのため外部ファイル読み込みに依存しません。

確認範囲では、`file://`制限によって動作しない既存機能はありません。Googleマップ・Instagramの実際の閲覧にはインターネット接続が必要です。他ブラウザ・モバイル実機でのfile://閲覧は未検証です。

検証スクリプトは`/private/tmp/oak-espresso-validation/file-preview-qa.cjs`、結果JSONとスクリーンショットは`/private/tmp/oak-local-preview-results/`に一時保存しています。

## 本番用コードへの影響

今回の作業開始時に存在した全27ファイルのSHA-256を記録し、作業後に一致を確認しました。本番用`index.html`・`styles.css`・`script.js`・`images/`、既存文書・画像の内容は変更していません。本番の`/images/...`参照、デザイン・文章・機能、noindex・サンプル表記は維持しています。

今回の追加は`local-preview/`と`scripts/create-local-preview.py`だけです。デプロイ設定の変更、公開、commit・pushは行っていません。前回のv1.1対応による未コミット変更はそのまま保持しています。
