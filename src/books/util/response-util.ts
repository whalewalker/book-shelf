import { Response } from '../dto/response';
import { HttpStatus } from '@nestjs/common';

export class ResponseUtil {
  static successfulResponse<T>(list: T[], message?: string): Response<T> {
    const response = new Response<T>();
    response.responseCode = HttpStatus.OK;
    response.responseMessage = message || 'Successful';
    response.modelList = list;
    response.count = list.length;
    return response;
  }
}
