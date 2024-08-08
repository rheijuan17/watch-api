import { LoggerService, Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import { winstonLogger } from '../winston.logger';

@Injectable()
export class ApiLogger implements LoggerService {
  private readonly logger: Logger;

  constructor() {
    this.logger = winstonLogger;
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
