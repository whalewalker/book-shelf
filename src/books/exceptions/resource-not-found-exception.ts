import { AppException } from './app-exception';
import { HttpStatus } from '@nestjs/common';

export class ResourceNotFoundException extends AppException {
  constructor(message: string = 'Resource not found') {
    super(HttpStatus.NOT_FOUND, message);
  }
}
