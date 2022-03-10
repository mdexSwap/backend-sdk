import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export const textValidExample = {
  ch: 'chinese',
  en: 'english',
};

export const textSchema = {
  ch: { type: String },
  en: { type: String },
};

@Exclude()
export class TextDto {
  @Expose()
  @IsString()
  @ApiProperty({ example: textValidExample.ch })
  ch: string;

  @Expose()
  @IsString()
  @ApiProperty({ example: textValidExample.en })
  en: string;
}
