import { Exclude, Expose, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';
import {
  BASIC_SORT_BY_TYPE,
  SORT_DIRECTION,
} from '../constant/common.enum.constant';
import { ApiProperty } from '@nestjs/swagger';
import { Default } from '../decorators/dto/default.dto.decorator';

@Exclude()
export class QueryParamDto {
  @Expose()
  @IsOptional()
  @IsNumber()
  @Default(1)
  @Min(1)
  @Type(() => Number)
  @ApiProperty({
    example: 1,
    type: 'number',
    minimum: 1,
    required: false,
  })
  readonly page?: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(500)
  @Default(500)
  @Type(() => Number)
  @ApiProperty({
    example: 100,
    type: 'number',
    minimum: 1,
    required: false,
  })
  readonly pageSize?: number;

  @Expose()
  @IsOptional()
  @ApiProperty({
    example: 'createdTime',
    type: 'string',
    enum: Object.values(BASIC_SORT_BY_TYPE),
    required: false,
  })
  readonly sortBy?: string;

  @Expose()
  @IsOptional()
  @IsEnum(SORT_DIRECTION)
  @ApiProperty({
    example: 'DESC',
    type: 'string',
    enum: ['DESC', 'ASC'],
    required: false,
  })
  readonly sortDirection?: SORT_DIRECTION;
}
