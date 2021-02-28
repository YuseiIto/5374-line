import db from './db';
import DBDriver from '../DBDriver';
export default class PostgreSQLDriver implements DBDriver {
  public async insertUser(userID: string): Promise<void> {
    if (!/U[0-9a-f]{32}/.test(userID)) {
      // Invalid UserID
      throw new Error('Invalid userID');
    }

    await db
      .query({
        text:
          'INSERT INTO users(user_id,modify_date) VALUES($1,current_timestamp)',
        values: [userID],
      })
      .catch((e) => {
        if (
          /Key \(user_id\)=\(U[0-9,a-f]{32}\) already exists\./.test(e.detail)
        ) {
          console.log('This user already exists. ignored');
        } else {
          throw e;
        }
      });
  }

  public async configureUser(
    userID: string,
    time: string,
    area: string
  ): Promise<void> {
    if (!/U[0-9a-f]{32}/.test(userID)) {
      // Invalid UserID
      throw new Error('Invalid userID');
    }

    if (!/[0-9]{2}:[0-9]{2}/.test(time)) {
      // Invalid UserID
      throw new Error('Invalid notification time');
    }

    // TODO: areaのvalidationも将来的に入れたい!

    const h = (Number(time.substring(0, 2)) - 9 + 24) % 24;
    const m = Number(time.substring(3, 5));

    await db
      .query({
        text:
          'UPDATE users SET time=$1,area=$2,modify_date=current_timestamp WHERE user_id=$3',
        values: [
          `${('00' + h).slice(-2)}:${('00' + m).slice(-2)}:00`,
          area,
          userID,
        ],
      })
      .catch((e) => {
        throw e;
      });
  }

  public async getUsersToNotify(
    time: string
  ): Promise<Array<{ users: Array<string> }>> {
    if (!/[0-9]{2}:[0-9]{2}/.test(time)) {
      // Invalid UserID
      throw new Error('Invalid notification time');
    }

    const res = await db
      .query({ text: 'SELECT * from users WHERE time=$1', values: [time] })
      .catch((e) => {
        throw e;
      });

    const result: any = {};

    for (const elm of res.rows) {
      if (elm.area === 'disabled') {
        continue;
      }

      if (result[elm.area] === undefined) {
        result[elm.area] = { users: [] };
      }
      result[elm.area]['users'].push(elm.user_id);
    }

    return result;
  }

  public async clearNotification(userId: string): Promise<void> {
    await db.query({
      text: "UPDATE users SET area='disabled' WHERE user_id=$1",
      values: [userId],
    });
  }
}
