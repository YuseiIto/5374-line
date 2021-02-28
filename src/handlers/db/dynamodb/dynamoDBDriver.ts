import DBDriver from '../DBDriver';
import aws from 'aws-sdk';
const docClient = new aws.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || '';
const PRIMARY_KEY = process.env.PRIMARY_KEY || '';

export default class dynamoDBDriver implements DBDriver {
  public async insertUser(userID: string): Promise<void> {
    if (!/U[0-9a-f]{32}/.test(userID)) {
      // Invalid UserID
      throw new Error('Invalid userID');
    }

    const params = {
      TableName: TABLE_NAME,
      Item: {
        [PRIMARY_KEY]: userID,
        type: 'user',
      },
      ConditionExperession: 'attribute_not_exists(id)',
    };

    await docClient.put(params).promise();
  }

  async configureUser(
    userID: string,
    time: string,
    area: string
  ): Promise<void> {
    await this.clearNotification(userID);
    const h = (Number(time.substring(0, 2)) - 9 + 24) % 24;
    const m = Number(time.substring(3, 5));
    const tkey = `${('00' + h).slice(-2)}:${('00' + m).slice(-2)}:00`;
    {
      const params = {
        TableName: TABLE_NAME,
        Key: {
          id: userID,
        },
        ExpressionAttributeNames: {
          '#t': 'time',
          '#a': 'area',
        },
        ExpressionAttributeValues: {
          ':newtime': tkey,
          ':newarea': area,
        },
        UpdateExpression: 'SET #t = :newtime, #a = :newarea',
      };

      await docClient.update(params).promise();
    }
    {
      const params = {
        TableName: TABLE_NAME,
        Key: {
          id: tkey,
        },
        ExpressionAttributeNames: {
          '#u': area,
        },
        ExpressionAttributeValues: {
          ':newUser': docClient.createSet([userID]),
        },
        UpdateExpression: 'ADD #u :newUser',
      };
      await docClient.update(params).promise();
    }
  }
  async getUsersToNotify(time: string): Promise<{ users: string[] }[]> {
    {
      const params = {
        TableName: TABLE_NAME,
        Key: {
          id: 'lastExecuted',
        },
      };
      const data = await docClient.get(params).promise();
      if (data.Item != undefined) {
        if (data.Item.time == time) {
          return []; // Already Executed at same event.
        }
      }
    }
    {
      const params = {
        TableName: TABLE_NAME,
        Key: {
          id: 'lastExecuted',
        },
        ExpressionAttributeNames: {
          '#t': 'time',
        },
        ExpressionAttributeValues: {
          ':time': time,
        },
        UpdateExpression: 'SET #t = :time',
      };
      await docClient.update(params).promise();
    }
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id: time,
      },
    };
    const data = await docClient.get(params).promise();
    if (data.Item != undefined) {
      delete data.Item.id;
      console.log(data.Item);
      const res: any = {};
      for (const areaName in data.Item) {
        res[areaName] = { users: data.Item[areaName].values };
      }

      return res;
    } else {
      return [];
    }
  }

  async clearNotification(userID: string): Promise<void> {
    let time = '';
    let area = '';

    {
      const params = {
        TableName: TABLE_NAME,
        Key: {
          id: userID,
        },
      };

      const data = await docClient.get(params).promise();
      if (data.Item == undefined) {
        throw new Error('Such user is not registered.');
      }

      time = data.Item.time;
      area = data.Item.area;
    }
    if (time != '' && area != '' && time != undefined && area != undefined) {
      const params = {
        TransactItems: [
          {
            Update: {
              TableName: TABLE_NAME,
              Key: { id: userID },
              UpdateExpression: 'set #a = :disabledArea',
              ExpressionAttributeNames: { '#a': 'area' },
              ExpressionAttributeValues: {
                ':disabledArea': 'disabledArea',
              },
            },
          },
          {
            Update: {
              TableName: TABLE_NAME,
              Key: { id: time },
              UpdateExpression: 'DELETE #a :user',
              ExpressionAttributeNames: { '#a': area },
              ExpressionAttributeValues: {
                ':user': docClient.createSet([userID]),
              },
            },
          },
        ],
      };

      await docClient.transactWrite(params).promise();
    }
  }
}
