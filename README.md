# nodecg-twitchapi
twitchのApi及びEventSubをnodeCG上で利用可能にするためのバンドルを目指しています  
アクセストークン取得まで実装しており、今後色々な機能をどんどん実装していきます  

## 実装済み
- CM再生ボタン(アフィリエイトかパートナー以上で利用可能な模様？検証環境がないため動作保証致しかねます)
- チャンネル情報取得

## 実装中(テスト中)
- EventSubのフォロワー通知の受信機能(コンソールに出力する機能のみ)

## 実装予定機能一覧
- フォロワー通知及び連動したアクションの実行
- 投票通知及び連動したアクションの実行
- 視聴者数のリアルタイム取得、及び連動したアクションの実行

## 使い方(暫定)

### TwitchAPI機能の準備
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
            "channel:manage:polls",
            "channel:manage:predictions"
        ],
        "state": <Define random strings>
    }
}
```
スコープは現在利用している機能に応じて設定しております  
開発する機能に応じて追加、削除等を実施してください


### EventSub機能の準備
httpsサーバが必要になります  
開発環境であれば[ngrok](https://ngrok.com/)等のSSLを中継してくれるサービスの利用をご検討くだい  
src/twitch-event.ts内の　const callbackUrl に起動したhttpsサーバの接続urlを設定してください

```json
{
    "twitch":{
        "client_id": "clientid",
        "client_secret": "clientsecret",
        "scopes": [
            "channel:edit:commercial",
            "channel:manage:broadcast",
            "channel:read:editors",
            "channel:manage:extensions"
        ],
        "state": "samplestring000"
        "secret": <Define random strings>
    }
}
```
バンドルコンフィグファイル、twitch-api.jsonにsecretパラメータを追加で設定してください  
ダッシュボードの通知取得ボタンを押すとマウントを開始します
※サブスクリプションは重複してのマウントが可能な上かなりの期間生存します  
※サブスクリプション削除ボタンですべてのサブスクリプションをアンマウントできるのでご活用ください


現在開発中につきビルドコマンドを用意しておりません  
watch:extension、watch:dashboardを実行後にnodecg本体をスタートさせてください  

## ToDo
- トークン取得とトークンを使用したリクエストを別モジュール化
- メッセージ送信でAxiosがリクエストに必要なヘッダー、メソッド、データ及び、レスポンスの型を渡す
- タイトルをインクリメンタルで選択できるように

## issue
