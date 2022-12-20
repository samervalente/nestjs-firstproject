import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './infra/app.controller';
import { PrismaService } from './infra/prisma.service';
import { MailService } from './mail/mail.service';
import { SMTPMailService } from './mail/smtp-mail.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    PrismaService,
    AppService,
    {
      provide: MailService,
      useClass: SMTPMailService,
    },
  ],
})
export class AppModule {}
