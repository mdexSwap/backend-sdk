import { HttpException } from '@nestjs/common';
export class AuthorizationErrorException extends HttpException {
  constructor(message = null) {
    super(
      {
        type: 'AuthorizationErrorException',
        message,
        code: 40001,
      },
      401,
    );
  }
}
