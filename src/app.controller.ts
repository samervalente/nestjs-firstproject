import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MailService } from './mail/mail.service';

@Controller('/emails')
export class AppController {
  constructor(
    private readonly MailService: MailService,
    private readonly appService: AppService,
  ) {}

  @Get('/smtp')
  getHello(): string {
    return this.MailService.sendEmail();
  }

  @Get('/getok')
  getNewHello(): string {
    return this.appService.getOk(3);
  }
}
