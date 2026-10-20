# 画像台帳｜v1.1

更新日：2026-10-20

元の12ファイルはPhase 1の既存素材から移動・改名したもので、内容の再生成・再圧縮は行っていません。第2段階の画像最適化では、下記の配信用縮小WebPのみ追加しています。静的サイトの公開ルートを本リポジトリ直下とし、全画像を`/images/`で配信します。

許可状況：既存README／DESIGN_HANDOFFに、依頼者によるサンプル制作・店舗Instagram写真の利用許可取得済みとの記録があります。各写真の元投稿URL・投稿日・撮影者・第三者権利の個別資料は未提供です。推測せず、全写真について「未確認」として引き継ぎます。パッケージ2点は既存引渡しメモで実売品確認済み。faviconは既存デザイン素材で、正式ロゴではありません。

| rootPath | 旧ファイル | 使用箇所 | クロップ（object-fit: cover） | alt JA | alt EN | 元投稿・撮影者 |
| --- | --- | --- | --- | --- | --- | --- |
| `/images/cheesecake.webp` | `assets/cheesecake.webp` | Coffee & Food | center 57% | いちごが添えられたカットケーキ | A slice of cake garnished with berries | 未確認（個別資料なし） |
| `/images/coffee-books.webp` | `assets/coffee_books.webp` | Concept | center 62%／モバイル center 64% | 映画やアートの雑誌とラテが並ぶ木製テーブル | A latte surrounded by cinema and art magazines on a wooden table | 未確認（個別資料なし） |
| `/images/coffee-cake.webp` | `assets/coffee_cake.webp` | Coffee & Food | center 59%／モバイル center 60% | ラテとケーキを木製カウンターに並べた写真 | Latte and a slice of cake on a wooden coffee counter | 未確認（個別資料なし） |
| `/images/favicon.svg` | `assets/favicon.svg` | favicon | なし（SVG） | 対象外（未使用／favicon） | N/A | 対象外 |
| `/images/fruit-toasts.webp` | `assets/fruit_toasts.webp` | Coffee & Food | center center | フルーツが盛り付けられた3種類のトースト | Three open-faced toasts topped with fruit | 未確認（個別資料なし） |
| `/images/hero-latte.webp` | `assets/hero_latte.webp` | Hero | center 59%／モバイル center 64%／1600px以上 center bottom | 木製カウンターに置かれた青いカップのラテと、奥に広がるOAK ESPRESSOの店内 | A latte in a blue cup on a wooden counter, with the cafe seating in the background | 未確認（個別資料なし） |
| `/images/interior-details.webp` | `assets/interior_details.webp` | Our Space | 3:4・center center／スマホは幅80%・右寄せ | 木製の丸テーブルと花瓶、クッションが並ぶOAK ESPRESSOの座席 | Wooden tables, a flower vase and cosy bench seating at OAK ESPRESSO | 未確認（個別資料なし） |
| `/images/interior-wide.webp` | `assets/interior_wide.webp` | Our Space | PC 3:2・center 58%／スマホ 4:3・center center | 木の家具とグリーンの天井、アートが飾られたOAK ESPRESSOの店内全景 | A wide view of the OAK ESPRESSO cafe with wooden furnishings, green ceiling and artwork | 未確認（個別資料なし） |
| `/images/opening.webp` | `assets/opening.webp` | 未使用・保管 | なし | 対象外（未使用／favicon） | N/A | 未確認（個別資料なし） |
| `/images/packaging-cafe.webp` | `assets/packaging_cafe.webp` | Roastery | center center／モバイル center 52% | 実際に店舗で販売しているOAK ESPRESSOのコーヒー豆パッケージとラテ | An OAK ESPRESSO coffee bean package sold in the cafe, beside a cup of coffee | 未確認（個別資料なし） |
| `/images/packaging-studio.webp` | `assets/packaging_studio.webp` | Roastery（小写真） | center center／正方形 | OAK ESPRESSOの販売用コーヒー豆パッケージ | OAK ESPRESSO retail coffee packaging | 未確認（個別資料なし） |
| `/images/savory-dish.webp` | `assets/savory_dish.webp` | 未使用・予備 | なし | 対象外（未使用／favicon） | N/A | 未確認（個別資料なし） |

ロゴは引き続きテキストによる提案用タイポグラフィです。写真上のブランド／パッケージ意匠は変更していません。

CSS背景画像、picture、OG画像の参照はありません。全9枚の掲載写真にsrcset/sizesを設定し、Heroのpreloadにも同じimagesrcset/imagesizesを使用しています。すべて`/images/...`で参照します。


## 第2段階｜配信用の縮小画像

元写真・フォールバックは保持しています。以下は同じ写真をクロップせず縦横比を維持して縮小したWebPで、色補正・内容変更・アップスケールはありません。端数の高さは1px以内の丸めです。元写真に記録された出典・権利の未確認状態を引き継ぎ、新たな許諾が得られたことを意味しません。

| 元画像（/images/配下） | 追加ファイル（同じディレクトリ） | 用途 |
| --- | --- | --- |
| hero-latte.webp | hero-latte-320.webp / hero-latte-640.webp / hero-latte-960.webp / hero-latte-1200.webp | Hero・preload共通候補 |
| coffee-books.webp | coffee-books-320.webp / coffee-books-640.webp / coffee-books-960.webp | Concept |
| coffee-cake.webp | coffee-cake-320.webp / coffee-cake-640.webp / coffee-cake-960.webp | Coffee |
| cheesecake.webp | cheesecake-320.webp / cheesecake-640.webp / cheesecake-960.webp | Sweets |
| fruit-toasts.webp | fruit-toasts-320.webp / fruit-toasts-640.webp / fruit-toasts-960.webp | Food |
| packaging-cafe.webp | packaging-cafe-320.webp / packaging-cafe-640.webp / packaging-cafe-960.webp | Roastery |
| interior-wide.webp | interior-wide-320.webp / interior-wide-640.webp / interior-wide-960.webp | Our Space全景 |
| interior-details.webp | interior-details-320.webp / interior-details-640.webp / interior-details-960.webp | Our Spaceディテール |
| packaging-studio.webp | packaging-studio-160.webp / packaging-studio-320.webp | 小さなパッケージ写真 |

数字は実ファイルの幅（px）です。320/640/960px等の候補と元の1440pxを組み合わせ、ブラウザが表示幅とDPRから選択します。小写真は76/87pxの表示幅に合わせて160/320pxを追加。原本を超える解像度は作成していません。

生成条件：Chrome標準Canvasの高品質縮小、sRGB描画、WebP quality=0.90。原画像を直接入力とし、派生画像からの再変換は行っていません。ローカル版へのコピーとパス変換は既存の`python3 scripts/create-local-preview.py`で行います。
