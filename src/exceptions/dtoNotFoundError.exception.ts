import { HttpException } from '@nestjs/common';
export class DtoNotFoundErrorException extends HttpException {
  constructor(message = null) {
    super(
      {
        type: 'DtoNotFoundErrorException',
        message,
        code: 40000,
      },
      400,
    );
  }
}
