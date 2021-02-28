import deliverNotification from '../deliverNotification';

export const handler = async (): Promise<any> => {
  await deliverNotification();
};
