import { HttpException } from '@nestjs/common';
export class ResourceAlreadyExistsErrorException extends HttpException {
  constructor(message = null) {
    super(
      {
        type: 'ResourceAlreadyExistsErrorException',
        message,
        code: 40007,
      },
      400,
    );
  }
}
