import { Injectable } from '@nestjs/common';

//injeção de dependencia
@Injectable()
export class AppService {
  getHello(): string {
    return 'My First Nest Project';
  }

  getOk(times: number): string {
    return 'This is ok! ' + times + ' times';
  }
}
