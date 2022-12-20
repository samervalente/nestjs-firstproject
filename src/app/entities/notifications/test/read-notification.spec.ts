import { InMemoryNotificationsRepository } from '../../../../../test/repositories/in-memory-notifications.repository';
import { NotFoundError } from '../errors';
import { makeNotification } from '../../../../../test/factories/notification-factory';
import { ReadNotification } from '../use-cases/read-notification';

describe('Tests for cancel notifications', () => {
  it('should read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = makeNotification();

    notificationsRepository.create(notification);

    await readNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a non existing notification', () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    expect(
      async () =>
        await readNotification.execute({
          notificationId: 'non existing notification id',
        }),
    ).rejects.toThrow(NotFoundError);
  });
});
