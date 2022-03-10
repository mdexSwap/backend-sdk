import { getEnumNonNumericValues, getEnumNumericValues } from '../enum.util';
import { SORT_DIRECTION } from '../../constant';

enum ENUM_NUM {
  draft,
  published,
}

describe('getEnumNumericValues', () => {
  it('should return an array of values that is numeric from the enum provided', () => {
    const result = getEnumNumericValues(ENUM_NUM);
    expect(result).toEqual([ENUM_NUM.draft, ENUM_NUM.published]);
  });
});

describe('getEnumNonNumericValues', () => {
  it('should return an array of values that is non-numeric from the enum provided', () => {
    const result = getEnumNonNumericValues(SORT_DIRECTION);
    expect(result).toEqual([
      SORT_DIRECTION[SORT_DIRECTION.DESC],
      SORT_DIRECTION[SORT_DIRECTION.ASC],
    ]);
  });
});
