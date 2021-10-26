# nodecg-twitchapi
twitchのApi及びEventSubをnodeCG上で利用可能にするためのバンドルを目指しています  
アクセストークン取得まで実装しており、今後色々な機能をどんどん実装していきます  

## 実装予定機能一覧
- チャンネル情報の更新(部分的に実装)
- いつでもベジバーガーボタン(広告手動再生)
- フォロワー通知及び連動したアクションの実行
- 投票通知及び連動したアクションの実行
- 視聴者数のリアルタイム取得、及び連動したアクションの実行

## 使い方(暫定)
TwitchAPIアプリケーションが必要になるので、TwitchDevページから登録してください  
redirecturlの設定のみ 'http://localhost:9090/twitch-api/redirect' を指定してください

NodeCGプロジェクトルートにあるbundlesディレクトリ配下にtwitch_apiディレクトリを作成し、cloneしてください  
同じくプロジェクトルート下のcfgディレクトリにバンドルコンフィグファイル、twitch_api.jsonを作成し  
下記の通りオブジェクトを作成し、必要項目を埋めてください

```json
{
    "twitch":{
        "client_id": <Your Twitch app's client_id>,
        "client_secret": <Your Twitch app's client_secret>,
        "scopes": [
            "channel:edit:commercial",
            "channel:manage:broadcast",
            "channel:read:editors",
            "channel:manage:extensions"
        ],
        "state": <Define random strings>
    }
}
```

現在開発中につきビルドコマンドを用意しておりません  
watch:extension、watch:dashboardを実行後にnodecg本体をスタートさせてください  

## ToDo
- トークン取得とトークンを使用したリクエストを別モジュール化
- メッセージ送信でAxiosがリクエストに必要なヘッダー、メソッド、データ及び、レスポンスの型を渡す
- タイトルをインクリメンタルで選択できるように
- EventSubリッスン機能

## issue
