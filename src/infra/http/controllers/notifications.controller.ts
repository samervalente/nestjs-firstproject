import { Controller, Body, Post, Patch, Param, Get } from '@nestjs/common';
import { CancelNotification } from '@app/entities/notifications/use-cases/cancel-notifications';
import { SendNotification } from 'src/app/entities/notifications/use-cases/send-notifications';
import { CreateNotifcationBody } from '../dtos/create-notifcation-body';
import { NotificationViewModel } from '../view-models/notification.view-models';
import { ReadNotification } from '@app/entities/notifications/use-cases/read-notification';
import { UnreadNotification } from '@app/entities/notifications/use-cases/unread-notification';
import { CountRecipientNotifications } from '@app/entities/notifications/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@app/entities/notifications/use-cases/get-recipient-notifications';


@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private getRecipientNotifications: GetRecipientNotifications,
    private cancelNotification: CancelNotification,
    private countRecipientNotification: CountRecipientNotifications,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification
  ) {}

 

  @Post()
  async create(@Body() requestBody: CreateNotifcationBody) {
    const { recipientId, content, category } = requestBody;
    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification: NotificationViewModel.toHTTP(notification) };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return notifications.map(NotificationViewModel.toHTTP);
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Get('count/from/:recipientId')
  async countFromRecipients(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });

    return { count };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id });
  }
}
