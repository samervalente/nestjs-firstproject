import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from '../errors/notification-not-found.error';
import { NotificationsRepository } from '../notifications.repository';
interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = request;
    const notification = await this.notificationsRepository.findByID(
      notificationId,
    );
    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();
    await this.notificationsRepository.update(notification);
  }
}
