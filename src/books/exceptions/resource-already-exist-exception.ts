import { AppException } from './app-exception';
import { HttpStatus } from '@nestjs/common';

export class ResourceAlreadyExistException extends AppException {
  constructor(message: string = 'Resource already exists') {
    super(HttpStatus.CONFLICT, message);
  }
}
