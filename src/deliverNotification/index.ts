import deliverNotification from './deliverNotification';

export default async (): Promise<void> => {
  /* テストしたい時↓
   * await deliverNotification(new Date('2020-11-29T09:55:00.000'));
   */

  await deliverNotification();
};
