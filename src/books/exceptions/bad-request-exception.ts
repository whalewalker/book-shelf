import { Error } from '../dto/response';
import { AppException } from './app-exception';
import { HttpStatus } from '@nestjs/common';

export class BadRequestException extends AppException {
  constructor(message: string, errors?: Error[]) {
    super(HttpStatus.BAD_REQUEST, message, errors);
  }
}
