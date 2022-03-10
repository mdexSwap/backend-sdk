import * as _ from 'lodash';

// admin鉴权
export const generateAdminAuthRedisKey = (token: string): string =>
  `mdex:user:sesstion:${token}`;

// 同步交易对合约地址
export const pairTokenListRedisKey = (chain: string): string =>
  `minter:pairTokenList:${chain}`;

// 已同步同步交易对信息
export const pairChainRedisKey = (chain: string, blockTag: any): string =>
  `minter:pairChain:${chain}:${blockTag}`;

export const pairChainSwapRedisKey = (chain: string, blockTag: any): string =>
  `minter:pairChain:${chain}:${blockTag}:swap`;

export const pairChainSwapLastRedisKey = (chain: string): string =>
  `minter:pairChain:${chain}:swapLast`;

export const pairChainSwapEarliestRedisKey = (
  chain: string,
  day: string,
): string => `minter:pairChain:${chain}:swapEarliest:${day}`;

export const pairMomentRedisKey = (
  chain: string,
  pairAddress: string,
): string => `minter:pairMoment:${chain}:${pairAddress}`;

export const tokenPriceHourRedisKey = (
  chain: string,
  erc20Address: string,
): string => `minter:tokenPriceHour:${chain}:${erc20Address}`;

// 已同步同步交易对key值按每天分组
export const pairChainCacheDateRedisKey = (
  chain: string,
  date: string,
): string => `minter:pairChain:${chain}:${date}`;

export const pairChainCacheSyncRedisKey = (chain: string): string =>
  `minter:pairChain:${chain}:sync`;

//未处理交易对
export const unPairChainRedisKey = (chain: string, blockTag: number): string =>
  `minter:unPairChain:${chain}:${blockTag}`;

// 未处理交易对key值存储
export const unPairChainCacheRedisKey = (chain: string): string =>
  `minter:unPairChain:${chain}:cacheKeys`;

// pair信息缓存
export const generatePairInfoRedisKey = (
  pairAddress: string,
  chain: string,
): string => `minter:pair:${chain}:${_.toLower(pairAddress)}`;

// erc20信息缓存
export const generateErc20InfoRedisKey = (
  erc20Address: string,
  chain: string,
): string => `minter:erc20:${chain}:${_.toLower(erc20Address)}`;

export const pairSwapSyncRedisKey = (chain: string): string =>
  `minter:pairSwap:${chain}:sync`;

// tvl
export const pairTvlLastRedisKey = (chain: string): string =>
  `minter:pairTvl:${chain}:last`;

export const pairTvlEarliestRedisKey = (chain: string, day: string): string =>
  `minter:pairTvl:${chain}:earliest:${day}`;

export const pairTvlMaxDayRedisKey = (chain: string): string =>
  `minter:pairTvl:${chain}:maxDay`;

export const pairTvlMaxWholeRedisKey = (chain: string): string =>
  `minter:pairTvl:${chain}:maxWhole`;

export const pairTvlMaxPairRedisKey = (
  chain: string,
  pairAddress: string,
): string => `minter:pairTvl:${chain}:maxPair:${pairAddress}`;

export const pairTvlMaxErc20RedisKey = (
  chain: string,
  erc20Address: string,
): string => `minter:pairTvl:${chain}:maxErc20:${erc20Address}`;

// token
export const pairTokenRedisKey = (chain: string): string =>
  `minter:pair:${chain}:token`;

//白名单 community，boardroom
export const whitelistRedisKey = (type: string): string =>
  `minter:whitelist:${type}`;
