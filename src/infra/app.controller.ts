import { Controller, Body, Get, Post } from '@nestjs/common';
import { AppService } from '../app.service';
import { MailService } from '../mail/mail.service';
import { PrismaService } from './prisma.service';
import { randomUUID } from 'node:crypto';
import { CreateNotifcationBody } from './create-notifcation-body';

@Controller('lab')
export class AppController {
  constructor(
    private readonly MailService: MailService,
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('/smtp')
  getHello(): string {
    return this.MailService.sendEmail();
  }

  @Get('/getok')
  getNewHello(): string {
    return this.appService.getOk(3);
  }

  @Get('/notifications')
  list() {
    return this.prisma.notification.findMany();
  }

  @Post('/notifications')
  async create(@Body() requestBody: CreateNotifcationBody) {
    await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        ...requestBody,
      },
    });
  }
}
