import { Exclude, Expose } from 'class-transformer';
import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export const successValidExample = {
  code: 20000,
};

interface SuccessInterface<T> {
  code: number;
  result: T[];
}

@Exclude()
export class SuccessDto<T> implements SuccessInterface<T> {
  @Expose()
  @IsInt()
  @ApiProperty({
    example: successValidExample.code,
  })
  readonly code: number;

  readonly result: any;
}
