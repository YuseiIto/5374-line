# データベースについて

5374.jp for Ritto at LINEは、通知情報の格納のためにデータベースを利用します。

デフォルトの[DBMS](https://ja.wikipedia.org/wiki/%E3%83%87%E3%83%BC%E3%82%BF%E3%83%99%E3%83%BC%E3%82%B9%E7%AE%A1%E7%90%86%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0)は[PostgreSQL](https://www.postgresql.org/)ですが、それ以外のデータベースにも対応可能なように設計されています。

## PostgreSQLを使う
PostgreSQLを利用する場合、一つのPostgreSQLサーバさえあれば簡単に始められます。


後述するようにデータベースとその接続情報をセットすれば、コードは自動的に`src/handlers/db/postgres/postgreSQLDriver.ts` に実装された`PostgreSQLDriver`のインスタンスを作成してデータベースを操作します。


なお、以下はある程度PostgreSQLが操作できる方を対象に、簡略化した手順を記載しています。データベースの作成方法等はご自身でお探しください。

### データベースの設定方法
1. 任意の名前(e.g. `5374DB`)でデータベースを作成します
1. 以下のSQLステートメントを実行してテーブルを作成します

```sql
CREATE TABLE users (
    user_id text PRIMARY KEY,
    time time without time zone,
    area text,
    birth_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    modify_date timestamp with time zone
);

```

3. データベースサーバの **ホスト名** , **ポート番号** , **ユーザ名**, **パスワード**,**データベース名** を、 `.env` に以下のように追記します

```
POSTGRES_USERNAME=5374Bot
POSTGRES_PASSWORD=hogehhogeSuperStrongPassWord
POSTGRES_HOSTNAME=db.example.com
POSTGRES_DBNAME=5374DB
```


## PostgreSQL以外を使う
PostgreSQL以外のデータベースを使う場合、
`src/handlers/db/postgres/postgreSQLDriver.ts` に実装された`PostgreSQLDriver`と同等のデータベースを操作するインターフェースをもつクラスを作成することで実現可能です。 なお、実装されたカスタムデータベースドライバは、`src/handlers/DBDriver.ts` に定義されたinterface `DBDriver` をimplementすることが推奨されます。

