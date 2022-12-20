import {
  Notification,
  NotificationProps,
} from '../../src/app/entities/notifications/notifications';
import { Content } from '../../src/app/entities/notifications/content';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    content: new Content('notification content aaa'),
    category: 'notification test category',
    recipientId: 'id1',
    ...override,
  });
}
