import { ApiProperty } from '@nestjs/swagger';

export class Error {
  @ApiProperty()
  fieldName: string;

  @ApiProperty()
  errorMessage: string;
}

export class Response<T> {
  @ApiProperty({ description: 'The response code', example: 200 })
  responseCode: number;

  @ApiProperty({ description: 'The response message', example: 'Success' })
  responseMessage: string;

  @ApiProperty({ description: 'List of errors', type: [Error] })
  errors: Error[];

  @ApiProperty({ description: 'List of model objects', type: [Object] })
  modelList: T[];

  @ApiProperty({ description: 'The count of model objects', example: 5 })
  count: number;
}
