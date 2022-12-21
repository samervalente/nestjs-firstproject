import { Injectable } from '@nestjs/common';
import { Notification } from './notifications';

@Injectable()
export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findByID(notificationId: string): Promise<Notification | null>;
  abstract update(notification: Notification): Promise<void>;
  abstract countManyByRecipientId(recipientId: string): Promise<number>;
  abstract findManyByRecipientId(
    recipientId: string,
  ): Promise<Notification[] | null>;
}
