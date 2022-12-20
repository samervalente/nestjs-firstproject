import { InMemoryNotificationsRepository } from '../../../../../test/repositories/in-memory-notifications.repository';
import { makeNotification } from '../../../../../test/factories/notification-factory';
import { GetRecipientNotifications } from '../use-cases/get-recipient-notifications';

describe('Tests for count notifications', () => {
  it('should be able to count notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'id1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'id1' }),
        expect.objectContaining({ recipientId: 'id1' }),
      ]),
    );
  });
});
