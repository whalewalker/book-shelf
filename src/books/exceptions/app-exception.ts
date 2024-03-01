import { HttpException } from '@nestjs/common';
import { Error } from '../dto/response';

export class AppException extends HttpException {
  constructor(status: number, message: string, errors?: Error[]) {
    super({ statusCode: status, message, errors }, status);
  }
}
