import * as _ from 'lodash';

export const IsNumberString = (value): boolean => {
  if (_.isString(value) && value !== '') {
    return !_.isNaN(_.toNumber(value));
  }
  return !!_.isNumber(value);
};

// 检查是否重复
export function hasDuplicates(a) {
  return _.uniq(a).length !== a.length;
}
