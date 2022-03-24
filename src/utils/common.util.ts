import * as _ from 'lodash';
import Snowflake from '@axihe/snowflake';

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

const generateUuid = () => {
  const config = {
    worker_id: 16, // 0-31
    datacenter_id: 18, // 0-31
  };
  const idWorker = new Snowflake(config.worker_id, config.datacenter_id);
  const id = idWorker.nextId();
  return id.toString();
};

console.log(generateUuid());
