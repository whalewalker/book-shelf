import { HttpStatus } from '@nestjs/common';

export enum ResponseCode {
  Successful = HttpStatus.OK,
  Created = HttpStatus.CREATED,
  BadRequest = HttpStatus.BAD_REQUEST,
  DuplicateRequest = HttpStatus.CONFLICT,
  NotFound = HttpStatus.NOT_FOUND,
  SystemError = HttpStatus.INTERNAL_SERVER_ERROR,
}

export const ResponseMessage: Record<ResponseCode, string> = {
  [ResponseCode.Successful]: 'Successful',
  [ResponseCode.BadRequest]: 'Bad request',
  [ResponseCode.DuplicateRequest]: 'Entity already exists',
  [ResponseCode.NotFound]: 'Entity does not exist',
  [ResponseCode.SystemError]: 'Internal System Error, Please try again later.',
  [ResponseCode.Created]: 'Successfully created',
};
