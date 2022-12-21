import { Module } from '@nestjs/common';
import { NotificationsRepository } from '../../app/entities/notifications/notifications.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications.repository';

@Module({
  providers: [
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [NotificationsRepository],
})
export class DatabaseModule {}
