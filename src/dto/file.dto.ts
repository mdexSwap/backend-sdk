import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';
import { IsString, IsUrl } from 'class-validator';

export const fileValidExample = {
  url: 'https://www.hk01.com/test.jpeg',
  path: 'test.jpeg',
};

@Exclude()
export class FileDto {
  @Expose()
  @IsUrl()
  @ApiProperty({
    example: fileValidExample.url,
    type: 'string',
  })
  readonly url: string;

  @Expose()
  @IsString()
  @ApiProperty({
    example: fileValidExample.path,
    type: 'string',
  })
  readonly path: string;
}
