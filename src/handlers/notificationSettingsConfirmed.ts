// 設定確認後
import * as line from '@line/bot-sdk';
import DBDriver from './db/db';

export default async function (
  userID: string,
  area: string,
  notificationTime: string
): Promise<line.TextMessage> {
  const db: DBDriver = new DBDriver();
  await db.configureUser(userID, notificationTime, area).catch((e) => {
    throw e;
  });
  return {
    type: 'text',
    text: `通知が設定されました! これから毎日${notificationTime}に通知をお届けします!`,
  };
}
