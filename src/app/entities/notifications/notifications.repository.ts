import { Notification } from './notifications';

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
}
