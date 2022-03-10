import { EtherFactoryService } from '../nestService/etherFactory.service';
import { BaseContractFactoryPool } from './baseContract.pool';

class BlindBoxContractFactoryPool extends BaseContractFactoryPool {
  private static blindBoxContractFactoryPool: BlindBoxContractFactoryPool;

  static init(): BlindBoxContractFactoryPool {
    BlindBoxContractFactoryPool.blindBoxContractFactoryPool = new BlindBoxContractFactoryPool(
      new EtherFactoryService().blindBoxContract,
    );
    return BlindBoxContractFactoryPool.blindBoxContractFactoryPool;
  }
}
export const BlindBoxContractPool = BlindBoxContractFactoryPool.init();
