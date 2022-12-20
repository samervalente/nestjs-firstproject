import { NotificationsRepository } from '@app/entities/notifications/notifications.repository';
import { Notification } from '@app/entities/notifications/notifications';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
