import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  ruok(): string {
    return 'OK!';
  }
}
