import { Injectable } from '@nestjs/common';
import { NotFoundError } from '../errors';
import { NotificationsRepository } from '../notifications.repository';
interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;
    const notification = await this.notificationsRepository.findByID(
      notificationId,
    );
    if (!notification) {
      throw new NotFoundError('Notification not found');
    }

    notification.unread();
    await this.notificationsRepository.update(notification);
  }
}
