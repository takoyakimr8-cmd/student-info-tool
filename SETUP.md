# セットアップ手順

## 所要時間: 約20〜30分

---

## STEP 1: Firebaseプロジェクトを作る

1. https://console.firebase.google.com を開く
2. 「プロジェクトを作成」をクリック
3. プロジェクト名を入力（例: `sensei-kanri`）→ 続行 → 作成

---

## STEP 2: Authentication（ログイン機能）を有効にする

1. 左メニュー「構築」→「Authentication」
2. 「始める」をクリック
3. 「Sign-in method」タブ → 「メール/パスワード」を有効化 → 保存

---

## STEP 3: Firestore Database（データ保存先）を作る

1. 左メニュー「構築」→「Firestore Database」
2. 「データベースを作成」をクリック
3. 「**本番環境モード**で開始」を選択 → 次へ
4. リージョンは `asia-northeast1`（東京）を選択 → 有効にする

---

## STEP 4: セキュリティルールを設定する

1. Firestoreの「ルール」タブをクリック
2. 既存の内容を全部消して、`firestore.rules` ファイルの内容をそのまま貼り付ける
3. 「公開」ボタンをクリック

---

## STEP 5: アプリの設定を取得して貼り付ける

1. 左上の歯車アイコン → 「プロジェクトの設定」
2. 「マイアプリ」セクションまでスクロール → `</>` ボタンをクリック
3. アプリのニックネームを入力（例: `sensei-app`）→ 「アプリを登録」
4. 表示される `firebaseConfig = { ... }` の部分をコピー
5. `index.html` を開き、以下の部分を丸ごと置き換える：

```javascript
// ★ ここにFirebaseの設定を貼り付けてください ★
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  ...
};
```

↓ これを、コピーした内容に置き換える（`const firebaseConfig =` から `};` まで）

---

## STEP 6: 管理者アカウントを作る（Risako用）

1. アプリをブラウザで開く（python3 -m http.server 8000 → localhost:8000）
2. Risakoのメールアドレスとパスワードで「新規登録」
3. Firebase Console → Firestore → 「users」コレクションを開く
4. Risakoのドキュメントを選択 → `role` フィールドを `client` から `admin` に変更

これだけで管理者になります。

---

## STEP 7: クライアントにアプリを配布する

- zipファイルをそのままクライアントに渡す
- クライアントはzipを展開して `python3 -m http.server 8000` で起動
- 「新規登録」でアカウントを作る
- Risakoの管理者画面に自動でクライアントが表示される

または GitHub Pages にアップロードすれば、URLをシェアするだけでクライアントが使えます（httpサーバー不要）。

---

## よくある質問

**Q: 料金はかかりますか？**
A: Firebase の無料枠（Spark プラン）で十分です。数十人規模なら無料で使えます。

**Q: パスワードを忘れたクライアントはどうする？**
A: Firebase Console → Authentication → 対象のユーザーを選択 → 「パスワードのリセットメールを送信」

**Q: クライアントを削除したい**
A: Firebase Console → Authentication でユーザー削除 + Firestore の `users/{uid}` と `userData/{uid}` を削除

---

## GitHub Pages で公開する場合（推奨）

1. GitHubアカウントを作る（無料）
2. 新しいリポジトリを作成（例: `sensei-kanri`）
3. この4ファイルをアップロード: `index.html`, `manifest.json`, `sw.js`, `icons/`
4. Settings → Pages → Source: main branch → Save
5. `https://あなたのユーザー名.github.io/sensei-kanri/` でアクセスできる
6. このURLをクライアントに共有するだけでOK
