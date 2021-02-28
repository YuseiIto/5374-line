import crypto from 'crypto';
import messageRoute from '../messageRoute';
import { APIGatewayProxyEvent } from 'aws-lambda';
import * as line from '@line/bot-sdk';
export function handler(event: APIGatewayProxyEvent): void {
  if (process.env.LINE_CHANNEL_SECRET == undefined) {
    throw new Error('Environment variable LINE_CHANNEL_SECRET is not set.');
  }

  if (event.body == null) {
    throw new Error('event.body is null');
  }
  const signature = crypto
    .createHmac('sha256', process.env.LINE_CHANNEL_SECRET)
    .update(event.body)
    .digest('base64');

  const checkHeader =
    (event.headers || {})['X-Line-Signature'] ||
    (event.headers || {})['x-line-signature'];

  const body = JSON.parse(event.body);
  const events = body.events;

  if (signature === checkHeader) {
    events.forEach(async (event: line.WebhookEvent) => {
      switch (event.type) {
        case 'message':
        case 'postback':
        case 'follow':
          await messageRoute(event);
      }
    });
  }
}
