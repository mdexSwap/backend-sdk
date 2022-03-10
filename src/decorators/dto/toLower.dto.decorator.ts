import { Transform } from 'class-transformer';
import { toLower, isArray, map, isEmpty } from 'lodash';

export const ToLower = () => {
  return Transform(
    value =>
      isEmpty(value)
        ? value
        : isArray(value)
        ? map(value, val => toLower(val))
        : toLower(value),
    {
      toClassOnly: true,
    },
  );
};
