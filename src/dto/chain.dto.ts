import { Exclude, Expose, Type } from 'class-transformer';
import { IsIn } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { parseDescription } from '../utils';

@Exclude()
export class ChainDto {
  @Expose()
  @Type(() => Number)
  @IsIn([128, 56])
  @ApiProperty({
    example: 128,
    enum: [128, 56],
    required: true,
    description: parseDescription({
      keyPts: ['HECO:128', 'BSC：56'],
    }),
  })
  readonly chain_id: number;
}
