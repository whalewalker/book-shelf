import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ResourceAlreadyExistException } from './resource-already-exist-exception';
import { ResourceNotFoundException } from './resource-not-found-exception';

@Catch(ResourceAlreadyExistException)
export class ResourceAlreadyExistExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(
    ResourceAlreadyExistExceptionFilter.name,
  );

  catch(exception: ResourceAlreadyExistException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    this.logger.error(
      `ResourceAlreadyExistException: ${exception.message}`,
      exception.stack,
    );

    response.status(HttpStatus.CONFLICT).json({
      statusCode: HttpStatus.CONFLICT,
      message: exception.message,
    });
  }
}

@Catch(ResourceNotFoundException)
export class ResourceNotFoundExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ResourceNotFoundExceptionFilter.name);

  catch(exception: ResourceNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    this.logger.error(
      `ResourceNotFoundException: ${exception.message}`,
      exception.stack,
    );

    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: exception.message,
    });
  }
}

@Catch(InternalServerErrorException)
export class ServerExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ServerExceptionFilter.name);

  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    this.logger.error(`ServerException: ${exception.message}`, exception.stack);

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message,
    });
  }
}
