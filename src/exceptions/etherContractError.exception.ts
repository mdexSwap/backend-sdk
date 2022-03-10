import { HttpException } from '@nestjs/common';
export class EtherContractErrorException extends HttpException {
  constructor(message = null) {
    super(
      {
        type: 'EtherContractErrorException',
        message,
        code: 50000,
      },
      500,
    );
  }
}
