import { EtherFactoryService } from '../nestService/etherFactory.service';
import { BaseContractFactoryPool } from './baseContract.pool';

class NftPoolContractFactoryPool extends BaseContractFactoryPool {
  private static nftPoolContractFactoryPool: NftPoolContractFactoryPool;

  static init(): NftPoolContractFactoryPool {
    NftPoolContractFactoryPool.nftPoolContractFactoryPool = new NftPoolContractFactoryPool(
      new EtherFactoryService().nftMiningContract,
    );
    return NftPoolContractFactoryPool.nftPoolContractFactoryPool;
  }
}
export const NftPoolContractPool = NftPoolContractFactoryPool.init();
