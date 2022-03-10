import { Transform } from 'class-transformer';
import * as _ from 'lodash';

export const OmitEmpty = (): any => {
  return Transform(value => (_.isEmpty(value) ? undefined : value), {
    toClassOnly: true,
  });
};
