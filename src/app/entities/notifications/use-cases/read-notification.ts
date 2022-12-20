import { Injectable } from '@nestjs/common';
import { NotFoundError } from '../errors';
import { NotificationsRepository } from '../notifications.repository';
interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = request;
    const notification = await this.notificationsRepository.findByID(
      notificationId,
    );
    if (!notification) {
      throw new NotFoundError('Notification not found');
    }

    notification.read();
    await this.notificationsRepository.update(notification);
  }
}
