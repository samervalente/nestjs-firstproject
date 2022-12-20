import { InMemoryNotificationsRepository } from '../../../../../test/repositories/in-memory-notifications.repository';
import { CountRecipientNotifications } from '../use-cases/count-recipient-notifications';
import { makeNotification } from '../../../../../test/factories/notification-factory';

describe('Tests for count notifications', () => {
  it('should be able to count notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'id1' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'id1' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'id2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'id1',
    });

    expect(count).toEqual(2);
  });
});
