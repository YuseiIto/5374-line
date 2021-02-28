// 設定確認後
import * as line from '@line/bot-sdk';
import DBDriver from './db/db';

export default async function (userID: string): Promise<line.TextMessage> {
  const db: DBDriver = new DBDriver();
  await db.clearNotification(userID);
  return {
    type: 'text',
    text: `通知が解除されました。ご利用ありがとうございました。`,
  };
}
