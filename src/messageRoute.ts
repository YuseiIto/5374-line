import * as line from '@line/bot-sdk';
import followMessage from './handlers/follow';
import selectArea from './messages/selectArea';
import selectTime from './messages/pickNotificationTime';
import confirmNotificationSettings from './messages/confirmNotificationSettings';
import notificationSettingsConfirmed from './handlers/notificationSettingsConfirmed';
import confirmNotificationClear from './messages/confirmNotificationClear';
import notificationClearConfirmed from './handlers/notificationClearConfirmed';
import about from './messages/about';

// 環境変数を .envファイルから読み込み
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

type validMessagesEvent =
  | line.MessageEvent
  | line.FollowEvent
  | line.PostbackEvent;

export default async (
  event: validMessagesEvent
): Promise<line.MessageAPIResponseBase> => {
  let message: line.Message;

  if (event.type == 'follow') {
    // 友達追加イベント
    if (!event.source.userId) {
      throw new Error('event.source.userId evaluated as false.');
    }

    message = await followMessage(event.source.userId);
  } else if (event.type == 'message' && event.message.type == 'text') {
    // テキストメッセージ

    if (event.message.text == '通知の設定') {
      message = selectArea();
    } else if (event.message.text == '通知の解除') {
      message = confirmNotificationClear();
    } else if (event.message.text == '開発者について') {
      message = about();
    } else {
      message = { type: 'text', text: 'メッセージが解釈できませんでした🥺' };
    }
  } else if (event.type == 'postback' && event.postback.data) {
    const postback = JSON.parse(event.postback.data);
    switch (postback.type) {
      case 'selectArea':
        message = selectTime(postback.selectedAreaName);
        break;
      case 'notificationTime':
        if (
          !event ||
          !event.postback ||
          !event.postback.params ||
          !event.postback.params.time
        ) {
          throw new Error('event.postback.params.time was evaluated as false.');
        }

        message = confirmNotificationSettings(
          postback.selectedAreaName,
          event.postback.params.time
        );
        break;
      case 'confirmNotificationSettings':
        if (postback.confirm) {
          // 「はい」
          if (!event || !event.source || !event.source.userId) {
            throw new Error('event.source.userId was evaluated as false.');
          }
          message = await notificationSettingsConfirmed(
            event.source.userId,
            postback.selectedAreaName,
            postback.notificationTime
          );
        } else {
          message = selectArea();
        }
        break;

      case 'confirmNotificationClear':
        if (postback.confirm) {
          // 「はい」
          if (!event || !event.source || !event.source.userId) {
            throw new Error('event.source.userId was evaluated as false.');
          }

          message = await notificationClearConfirmed(event.source.userId);
        } else {
          message = { type: 'text', text: '引き続き通知をお届けします!' };
        }
        break;
      default:
        message = { type: 'text', text: 'Error: Unknown postback action' };
    }
  } else {
    message = { type: 'text', text: 'メッセージが解釈できませんでした🥺' };
  }

  return client.replyMessage(event.replyToken, message);
};
