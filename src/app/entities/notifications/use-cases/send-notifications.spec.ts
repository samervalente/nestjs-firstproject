import { Notification } from '../notifications';
import { SendNotification } from './send-notifications';

const notifications: Notification[] = [];

const notificationsRepository = {
  async create(notification: Notification) {
    notifications.push(notification);
  },
};

describe('Tests for send notifications', () => {
  it('should send notifications', async () => {
    const sendNotification = new SendNotification(notificationsRepository);
    await sendNotification.execute({
      content: 'notification content aaa',
      category: 'notification test category',
      recipientId: 'fake recipient id',
    });

    console.log(notifications);

    expect(notifications).toHaveLength(1);
  });
});
