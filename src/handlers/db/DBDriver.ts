export default interface DBDriver {
  insertUser(userID: string): Promise<void>;
  configureUser(userID: string, time: string, area: string): Promise<void>;
  getUsersToNotify(time: string): Promise<Array<{ users: Array<string> }>>;
  clearNotification(userId: string): Promise<void>;
}
