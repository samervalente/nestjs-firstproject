import { CancelNotification } from '@app/entities/notifications/use-cases/cancel-notifications';
import { CountRecipientNotifications } from '@app/entities/notifications/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@app/entities/notifications/use-cases/get-recipient-notifications';
import { ReadNotification } from '@app/entities/notifications/use-cases/read-notification';
import { UnreadNotification } from '@app/entities/notifications/use-cases/unread-notification';
import { Module } from '@nestjs/common';
import { SendNotification } from 'src/app/entities/notifications/use-cases/send-notifications';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    GetRecipientNotifications,
    CountRecipientNotifications,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
