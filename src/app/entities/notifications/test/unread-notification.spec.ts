import { InMemoryNotificationsRepository } from '../../../../../test/repositories/in-memory-notifications.repository';
import { NotFoundError } from '../errors';
import { makeNotification } from '../../../../../test/factories/notification-factory';
import { UnreadNotification } from '../use-cases/unread-notification';

describe('Tests for cancel notifications', () => {
  it('should unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadreadNotification = new UnreadNotification(
      notificationsRepository,
    );

    const notification = makeNotification({ readAt: new Date() });

    notificationsRepository.create(notification);

    await unreadreadNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to read a non existing notification', () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadreadNotification = new UnreadNotification(
      notificationsRepository,
    );

    expect(
      async () =>
        await unreadreadNotification.execute({
          notificationId: 'non existing notification id',
        }),
    ).rejects.toThrow(NotFoundError);
  });
});
