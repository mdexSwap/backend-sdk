import * as _ from 'lodash';

export enum ADDRESS_TYPE {
  ensBsc = 'ensBsc',
  archivedBsc = 'archivedBsc',
  ensHeco = 'ensHeco',
  archivedHeco = 'archivedHeco',
}

export type Network = {
  name: string;
  cacheName: string;
  chainId: number;
  ens: ADDRESS_TYPE;
  archived: ADDRESS_TYPE;
  archivedAddress: string[];
  ensAddress: string[];
};

export const HECO_NETWORK: Network = {
  chainId: 128,
  name: 'HECO',
  cacheName: 'HECO_CACHE',
  ens: ADDRESS_TYPE.ensHeco,
  archived: ADDRESS_TYPE.archivedHeco,
  ensAddress: _.split(process.env.HECO_ENS_ADDRESS, ','),
  archivedAddress: _.split(process.env.HECO_ARCHIVED_ADDRESS, ','),
};

export const BSC_NETWORK: Network = {
  chainId: 56,
  name: 'BSC',
  cacheName: 'BSC_CACHE',
  ens: ADDRESS_TYPE.ensBsc,
  archived: ADDRESS_TYPE.archivedBsc,
  ensAddress: _.split(process.env.BSC_ENS_ADDRESS, ','),
  archivedAddress: _.split(process.env.BSC_ARCHIVED_ADDRESS, ','),
};
