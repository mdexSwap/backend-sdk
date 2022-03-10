import { HttpException } from '@nestjs/common';
export class StateTransitionErrorException extends HttpException {
  constructor(message = null) {
    super(
      {
        type: 'StateTransitionErrorException',
        message,
        code: 40009,
      },
      409,
    );
  }
}
