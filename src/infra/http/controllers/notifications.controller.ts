import { Controller, Body, Post } from '@nestjs/common';
import { SendNotification } from 'src/app/entities/notifications/use-cases/send-notifications';
import { CreateNotifcationBody } from '../dtos/create-notifcation-body';
import { NotificationViewModel } from '../view-models/notification.view-models';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

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
}
