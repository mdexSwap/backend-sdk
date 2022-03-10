import { HttpException } from '@nestjs/common';
export class EtherVerifyMessageErrorException extends HttpException {
  constructor(message = null) {
    super(
      {
        type: 'EtherVerifyMessageErrorException',
        message,
        code: 40003,
      },
      403,
    );
  }
}
