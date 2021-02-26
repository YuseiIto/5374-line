// 友達登録時

import * as line from '@line/bot-sdk';
import PostgreSQLDriver from './db/postgres/postgreSQLDriver';

export default async function (userID: string): Promise<line.TextMessage> {
  const db: PostgreSQLDriver = new PostgreSQLDriver();
  await db.insertUser(userID);

  return {
    type: 'text',
    text:
      'お友達追加追加ありがとうございます🙌 \n5374 .jp @LINE for Rittoは、https://ritto.5374.jp で提供しているデータをベースに、滋賀県栗東市のゴミの日情報🗓をLINEで通知するサービスです!🔔\n\nはじめにメニューの「通知の設定」から通知を設定しましょう💨 \n ※メニューはPC/Mac版LINEではご利用いただけません🙇‍♂️',
  };
}
