import * as cdk from '@aws-cdk/core';
import { Table, AttributeType } from '@aws-cdk/aws-dynamodb';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { RestApi, LambdaIntegration } from '@aws-cdk/aws-apigateway';
import { Rule, Schedule, RuleTargetInput } from '@aws-cdk/aws-events';
import * as targets from '@aws-cdk/aws-events-targets';
import path from 'path';
import dotnev from 'dotenv';

export class CdkLineBotStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Import configuration
    const ENV_PATH = path.join(__dirname, '../../.env');
    dotnev.config({ path: ENV_PATH });
    const {
      LINE_CHANNEL_ACCESS_TOKEN,
      LINE_CHANNEL_SECRET,
      RICHMENU_ID,
      AREA_DAYS_CSV_URL,
    } = process.env;

    if (LINE_CHANNEL_ACCESS_TOKEN == undefined) {
      throw new Error(
        'Assertion error. LINE_CHANNEL_ACCESS_TOKEN is not given.'
      );
    }

    if (LINE_CHANNEL_SECRET == undefined) {
      throw new Error('Assertion error. LINE_CHANNEL_SECRET is not given.');
    }

    if (RICHMENU_ID == undefined) {
      throw new Error('Assertion error. RICHMENU_ID is not given.');
    }

    if (AREA_DAYS_CSV_URL == undefined) {
      throw new Error('Assertion error. AREA_DAYS_CSV_URL is not given.');
    }

    // Configure dynamo db
    const dynamoTable = new Table(this, 'line5374BotDB', {
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING,
      },
      tableName: 'line5374BotDB',
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    // Configure reply lambda function
    const replyMsgLambdaFunction = new NodejsFunction(
      this,
      'line5374BotReplyMsgFunction',
      {
        entry: 'src/lambda/replyMsgFunction.ts',
        environment: {
          TABLE_NAME: dynamoTable.tableName,
          PRIMARY_KEY: 'id',
          LINE_CHANNEL_ACCESS_TOKEN,
          LINE_CHANNEL_SECRET,
          RICHMENU_ID,
          AREA_DAYS_CSV_URL,
        },
      }
    );

    dynamoTable.grantWriteData(replyMsgLambdaFunction);
    dynamoTable.grantReadData(replyMsgLambdaFunction);

    // Configure API Gateway (REST API)
    const api = new RestApi(this, 'line5374Bot', {
      restApiName: 'line5374BotAPI',
    });

    const getItemIntegration = new LambdaIntegration(replyMsgLambdaFunction, {
      proxy: true,
    });
    const webhook = api.root.addResource('webhook');
    webhook.addMethod('POST', getItemIntegration);

    //Configure cron function
    const deliverNotificationLambdaFunction = new NodejsFunction(
      this,
      'line5374BotDeliverNotificationFunction',
      {
        entry: 'src/lambda/deliverNotificationFunction.ts',
        environment: {
          TABLE_NAME: dynamoTable.tableName,
          PRIMARY_KEY: 'id',
          LINE_CHANNEL_ACCESS_TOKEN,
          LINE_CHANNEL_SECRET,
          RICHMENU_ID,
          AREA_DAYS_CSV_URL,
        },
      }
    );
    dynamoTable.grantWriteData(deliverNotificationLambdaFunction);
    dynamoTable.grantReadData(deliverNotificationLambdaFunction);

    const deliverRule = new Rule(this, 'line5374BotDeliverCronRule', {
      // Refer to https://docs.aws.amazon.com/ja_jp/AmazonCloudWatch/latest/events/ScheduledEvents.html about the schedule expression
      schedule: Schedule.expression('cron(* * * * ? *)'),
    });

    deliverRule.addTarget(
      new targets.LambdaFunction(deliverNotificationLambdaFunction, {
        event: RuleTargetInput.fromObject({
          Region: 'ap-northeast-1',
          Action: 'start',
        }),
      })
    );
  }
}
