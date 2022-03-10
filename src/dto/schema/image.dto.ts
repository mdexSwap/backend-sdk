import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsIn, IsString } from 'class-validator';
import * as validUrl from 'valid-url';
import { basename } from 'path';
import { getEnumNonNumericValues } from '../../utils/enum.util';

export enum IMAGE_TYPE {
  pcCh = 'pcCh',
  pcEn = 'pcEn',
  phoneCh = 'phoneCh',
  phoneEn = 'phoneEn',
  pc = 'pc',
  phone = 'phone',
}

export const imageValidExample = {
  imagePath: 'test.png',
  type: IMAGE_TYPE.pcCh,
};

export const imageSchema = {
  imagePath: {
    type: String,
    set: value => (validUrl.isUri(value) ? basename(value) : value),
  },
  type: {
    type: String,
    enum: getEnumNonNumericValues(IMAGE_TYPE),
    default: IMAGE_TYPE.pc,
  },
};

@Exclude()
export class ImageDto {
  @Expose()
  @IsString()
  @ApiProperty({ example: imageValidExample.imagePath })
  imagePath: string;

  @Expose()
  @IsIn(getEnumNonNumericValues(IMAGE_TYPE))
  @ApiProperty({
    enum: getEnumNonNumericValues(IMAGE_TYPE),
  })
  type?: IMAGE_TYPE;
}
