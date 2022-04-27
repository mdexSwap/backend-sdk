import { Exclude, Expose, Type } from 'class-transformer';
import { IsIn } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { parseDescription } from '../utils';

@Exclude()
export class ChainDto {
  @Expose()
  @Type(() => Number)
  @IsIn([128, 56, 1])
  @ApiProperty({
    example: 128,
    enum: [128, 56, 1],
    required: true,
    description: parseDescription({
      keyPts: ['HECO:128', 'BSC：56', 'ETH:1'],
    }),
  })
  readonly chain_id: number;
}
