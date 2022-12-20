import { Content } from '../content';
import { Notification } from '../notifications';

describe('Tests for Notifications', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      recipientId: 'fake recipient id',
      content: new Content('Uma nova vaga para dev full stack está disponível'),
      category: 'vacancy',
    });

    expect(notification).toBeTruthy();
  });
});
