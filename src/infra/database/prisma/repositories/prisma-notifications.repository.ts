import { Notification } from '../../../../app/entities/notifications/notifications';
import { NotificationsRepository } from '../../../../app/entities/notifications/notifications.repository';
import { Injectable } from '@nestjs/common';
import { PrismaNotificationMapper } from '../mappers/prisma-notifications.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prisma.notification.create({
      data: raw,
    });
  }

  async findByID(notificationId: string): Promise<Notification> {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notification);
  }
  async update(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prisma.notification.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: { id: recipientId },
    });

    return count;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        recipientId,
      },
    });

    return notifications.map(PrismaNotificationMapper.toDomain);
  }
}
