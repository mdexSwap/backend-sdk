import { Exclude, Expose, Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { parseDescription } from '../utils/swagger.util';
import { getEnumNonNumericValues } from '../utils/enum.util';
import { OmitEmpty } from '../decorators/dto/omitEmpty.dto.decorator';

export enum AGENT_MODE {
  PC = 'pc',
  phone = 'phone',
}

export enum LANGUAGE_TYPE {
  ch = 'ch',
  en = 'en',
}

@Exclude()
export class CommonDto {
  @Expose()
  @Type(() => Number)
  @IsIn([128, 56, 1])
  @ApiProperty({
    example: 128,
    enum: [128, 56, 1],
    required: true,
    description: parseDescription({
      keyPts: ['HECO:128', 'BSC：56', 'ETH：1'],
    }),
  })
  readonly chain_id: number;

  @Expose()
  @IsIn(getEnumNonNumericValues(AGENT_MODE))
  @ApiProperty({
    example: AGENT_MODE.PC,
    enum: getEnumNonNumericValues(AGENT_MODE),
    required: true,
  })
  readonly agentMode: AGENT_MODE;

  @Expose()
  @IsIn(getEnumNonNumericValues(LANGUAGE_TYPE))
  @ApiProperty({
    example: LANGUAGE_TYPE.ch,
    enum: getEnumNonNumericValues(LANGUAGE_TYPE),
    required: true,
  })
  readonly languageType: LANGUAGE_TYPE;

  @Expose()
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @ApiProperty({
    example: 1636007139,
    required: false,
    description: '日期查询-开始时间，秒时间戳',
  })
  readonly startTime?: number;

  @Expose()
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @ApiProperty({
    example: 1636007139,
    required: false,
    description: '日期查询-结束时间，秒时间戳',
  })
  readonly endTime?: number;

  @Expose()
  @IsOptional()
  @OmitEmpty()
  @IsString()
  @ApiProperty({
    example: 'keyword',
    description: '关键字搜索',
    required: false,
  })
  readonly keyword?: string;
}
