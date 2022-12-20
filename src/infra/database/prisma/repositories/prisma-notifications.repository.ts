import { Notification } from '@app/entities/notifications/notifications';
import { NotificationsRepository } from '@app/entities/notifications/notifications.repository';
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
    throw new Error('Method not implemented.');
  }
  async update(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
