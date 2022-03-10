import { Exclude, Expose } from 'class-transformer';
import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export const paginationValidExample = {
  total: 100,
  page: 1,
  pageSize: 1,
};

interface PaginationInterface<T> {
  total: number;
  pageSize: number;
  page: number;
  result: T[];
}

@Exclude()
export class PaginationDto<T> implements PaginationInterface<T> {
  @Expose()
  @IsInt()
  @ApiProperty({
    example: paginationValidExample.total,
  })
  readonly total: number;

  @Expose()
  @IsInt()
  @ApiProperty({
    example: paginationValidExample.page,
  })
  readonly page: number;

  @Expose()
  @IsInt()
  @ApiProperty({
    example: paginationValidExample.pageSize,
  })
  readonly pageSize: number;

  readonly result: T[];
}
