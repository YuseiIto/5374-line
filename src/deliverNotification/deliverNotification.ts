import computeTrashToday from './computeTrashToday';
import DBDriver from '../handlers/db/db';
import * as line from '@line/bot-sdk';

export async function generateMessageTextOfArea(
  areaName: string,
  date?: Date
): Promise<string> {
  let targetDate = date || new Date();
  targetDate = new Date(targetDate.getTime() + 1000 * 60 * 60 * 9);
  let text = '';
  if (targetDate.getHours() < 8) {
    text = '今日は';
  } else {
    text = '明日は';
    targetDate.setDate(targetDate.getDate() + 1);
    targetDate.setHours(0);
  }

  const trashesArray = await computeTrashToday(targetDate, areaName);

  if (trashesArray.length > 0) {
    for (const trash of trashesArray) {
      text += `、${trash}`;
    }

    text += 'の日です! \n ごみの出し忘れにご注意ください!';
  } else {
    text += 'ごみの収集はありません!';
  }

  return text;
}

import dotenv from 'dotenv';
dotenv.config();

if (!process.env.LINE_CHANNEL_SECRET) {
  throw new Error(
    'Environment variable LINE_CHANNEL_SECRET is not set. See https://github.com/YuseiIto/5374-line/blob/develop/README.md'
  );
}

if (!process.env.LINE_CHANNEL_ACCESS_TOKEN) {
  throw new Error(
    'Environment variable LINE_CHANNEL_ACCESS_TOKEN is not set. See https://github.com/YuseiIto/5374-line/blob/develop/README.md'
  );
}

const config: line.ClientConfig = {
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
};

const client: line.Client = new line.Client(config);

export default async (date?: Date): Promise<void> => {
  const now = date || new Date();
  const db = new DBDriver();
  const areaUsers = await db.getUsersToNotify(
    `${('00' + now.getUTCHours()).slice(-2)}:${(
      '00' + now.getUTCMinutes()
    ).slice(-2)}:00`
  );

  for (const area in areaUsers) {
    const { users } = areaUsers[area];

    const text = await generateMessageTextOfArea(area, now);

    for (const user of users) {
      await client.pushMessage(user, { type: 'text', text });
    }
  }
};
