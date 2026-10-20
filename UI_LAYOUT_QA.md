# OAK ESPRESSO｜UI・レイアウト改善

> この報告の装飾帯は前回の1行クリップ方式の記録です。後続の依頼でスマホ専用の中央揃え2行構成へ変更しました。最新の装飾帯と検証結果は`REPEATER_QA.md`を参照してください。OUR SPACE等の内容は維持しています。

実施日：2026-10-20（日本時間）。今回の依頼開始時の実装を基準に確認しました。以前のv1.1対応とローカル確認版作成の未コミット変更は維持しています。

## OUR SPACE

- 画像にHTML由来の固定高さが残り、全景・ディテールとも極端に縦長にトリミングされていました。表示時の`height:auto`を明示し、HTMLの画像寸法情報を残しながらCSSのアスペクト比で表示領域を確保しました。
- PCは大きな全景3:2とディテール3:4を非対称に配置。ディテールを少し下げ、写真の大小と余白で編集的なリズムを維持しています。
- スマホは見出し→説明文→全景4:3→ディテール3:4の順。ディテールを幅80%・右寄せにし、写真全体が読み取れる縦の流れにしました。
- 既存の説明文を見出し近くに移し、PCでは見出しの隣、スマホでは見出しの下へ配置。文字の階層、セクション余白、キャプションの大きさと間隔も調整しました。
- 店内全景の`object-position`はPCでcenter 58%、スマホでcenter center。ディテールは元の3:4比率を維持し、店名サイン・クッション・テーブルが見える構図にしています。画像ファイル自体は変更していません。

## 装飾テキスト

スマホの`.repeater`に`flex-wrap:nowrap`、各文字列・区切りに`flex:0 0 auto`と`white-space:nowrap`を明示。間隔23pxを均等に維持し、コンテナ内でクリップします。ページ全体に横スクロールは発生しません。既存は静止した装飾帯で、アニメーションは追加していません。PCの1024px・1440pxで各要素の幅・高さが変更前と一致しました。

## 改行

- Concept、Our Story、Visit Usの日本語見出しを、320px・768pxなどでも意図した改行の中で再折り返ししない文字サイズに調整。「ら、」「を。」「す。」の孤立を解消しました。
- Coffee & Foodの見出しと説明文の幅・間隔を調整。英語の「something good.」、Roasteryの「behind the beans.」、Storyの「From Australia」がまとまって表示されます。
- 見出しの`text-wrap:balance`、本文の`text-wrap:pretty`と日本語の禁則、必要な本文・短いキャプションの行長バランスを適用。商品説明2点には意味のまとまりのspanを加え、日本語の語尾・語句途中での分断を避けました。
- 文章と翻訳内容は維持。既存の意図した`<br>`を削除せず、固定高さも追加していません。未対応ブラウザでは標準の折り返しへフォールバックします。

## 検証

Chrome 155.0.8059.85（macOS/headless）で、本番用のローカルHTTP表示と確認用`file://`表示を検証。file://側はオフラインにしています。

| 画面幅 | HTTP JA/EN | file:// JA/EN |
| --- | --- | --- |
| 320px | 合格 | 合格 |
| 375px | 合格 | 合格 |
| 390px | 合格 | 合格 |
| 768px | 合格 | 合格 |
| 1024px | 合格 | 合格 |
| 1440px | 合格 | 合格 |

24ケースで以下を確認しました。

- 全見出しの表示行数が意図した`<br>`の行数と一致。英単語内部での分断なし。
- 写真9枚の読み込みと日英alt、OUR SPACEの写真比率・配置、見出しと説明文の重なりなし。
- スマホの装飾テキストが各1行、要素間隔23px、クリップ有効。ページ横はみ出しなし。
- 本番とローカル版で、見出し・写真・装飾帯の座標と寸法、本文、リンクが一致。
- JA/EN切替、Enter/Space操作、表示中のページ内ナビ、先頭へ戻るリンクを確認。
- Googleマップ・Instagramのクリックで開くタブのURLを確認（外部レスポンスはテスト内で代替）。実店舗ピン・外部サービス上の内容は未検証です。
- Lucide SVG9点の維持、線幅・読み上げ除外、本番`/images/...`とローカル`./images/...`、noindexを確認。
- JavaScriptエラー・コンソールエラー・読み込み失敗・HTTP 404はいずれも0。
- 掲載文章・画像属性・リンク属性・JavaScript・写真の内容を依頼開始時と照合。キャプションのspan追加は文字内容を変えません。
- `node --check script.js`、`node --check local-preview/script.js`、`git diff --check`は合格。新たな依存ライブラリは追加していません。

他ブラウザ・モバイル実機は未検証です。指定幅では写真・文章・見出しのスクリーンショットを確認しました。

## 確認画像

- [PC・日本語](screenshots/ui-layout/space-desktop-ja.jpg)
- [スマホ390px・日本語](screenshots/ui-layout/space-mobile-ja.jpg)
- [スマホ320px・英語](screenshots/ui-layout/space-small-mobile-en.jpg)
- [タブレット768px・英語](screenshots/ui-layout/space-tablet-en.jpg)
- [スマホの装飾テキスト](screenshots/ui-layout/repeater-mobile.jpg)

全幅・日英の全ページ画像と測定結果は一時ディレクトリ`/private/tmp/oak-ui-final/`に保存。検証スクリプトは`/private/tmp/oak-espresso-validation/ui-layout-qa.cjs`です。

## 修正ファイル・ローカル版

- `index.html`：OUR SPACEの紹介文配置・見出しの関連付け、商品キャプションの意味単位のマークアップ。
- `styles.css`：OUR SPACE、スマホの装飾帯、見出し・本文の折り返し。
- `local-preview/index.html`・`styles.css`：`python3 scripts/create-local-preview.py`で再生成。JS・画像・ライセンスは同一内容のまま。
- `ASSET_INVENTORY.md`：OUR SPACEの最新クロップ仕様。
- 本書、既存QA報告への追記、`screenshots/ui-layout/`：今回の確認記録。

ブランドカラー・書体の方向性・掲載文章・写真・外部URL・機能を維持し、デプロイ設定は変更していません。ローカルでの作業のみで、commit・push・公開は行っていません。
