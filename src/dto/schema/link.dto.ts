import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsIn, IsOptional, IsString, IsUrl } from 'class-validator';
import { getEnumNumericValues } from '../../utils/enum.util';
import { parseDescription } from '../../utils/swagger.util';

export enum LINK_TYPE {
  inside,
  external,
}

export const linkValidExample = {
  linkType: 1,
  linkUrl: 'https://www.hk01.com',
};

export const linkSchema = {
  linkType: {
    type: Number,
    enum: getEnumNumericValues(LINK_TYPE),
    default: LINK_TYPE.inside,
  },
  linkUrl: { type: String },
};

@Exclude()
export class LinkDto {
  @Expose()
  @IsOptional()
  @IsIn(getEnumNumericValues(LINK_TYPE))
  @ApiProperty({
    required: false,
    enum: getEnumNumericValues(LINK_TYPE),
    description: parseDescription({ keyPts: ['内部链接:0', '外部链接:1'] }),
    default: LINK_TYPE.inside,
  })
  linkType?: LINK_TYPE;

  @Expose()
  @IsString()
  @ApiProperty({ example: linkValidExample.linkUrl })
  linkUrl: string;
}
