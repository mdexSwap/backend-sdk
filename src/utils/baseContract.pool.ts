import * as _ from 'lodash';
import { Contract } from '@ethersproject/contracts';
import { JsonRpcProvider } from '@ethersproject/providers';
import { EthersPool } from './ethers.pool';
import { Signer } from '@ethersproject/abstract-signer';
import { Provider } from '@ethersproject/abstract-provider';
import { BSC_NETWORK, ETH_NETWORK, HECO_NETWORK } from '../constant';

export interface ContractMap {
  clear(): void;
  delete(key: string): boolean;
  forEach(
    callbackfn: (
      value: Contract,
      key: string,
      map: Map<string, Contract>,
    ) => void,
    thisArg?: any,
  ): void;
  get(key: string): Contract | undefined;
  has(key: string): boolean;
  set(key: string, value: Contract): this;
  readonly size: number;
}

export abstract class BaseContractFactoryPool {
  private readonly contractHecoMap: ContractMap = new Map();

  private readonly contractBscMap: ContractMap = new Map();

  private readonly contractEthMap: ContractMap = new Map();

  constructor(
    public readonly initContractPromise: ({
      contractAddress,
      signerOrProvider,
    }: {
      contractAddress: string;
      signerOrProvider: Signer | Provider;
    }) => Contract,
  ) {}

  public size(chain_id: number) {
    switch (chain_id) {
      case HECO_NETWORK.chainId:
        return this.contractHecoMap.size;
      case BSC_NETWORK.chainId:
        return this.contractBscMap.size;
      case ETH_NETWORK.chainId:
        return this.contractEthMap.size;
    }
  }

  public getContract({
    chain_id,
    contractAddress,
  }: {
    chain_id: number;
    contractAddress: string;
  }): Contract {
    switch (chain_id) {
      case HECO_NETWORK.chainId:
        return this.selectContract({
          contractMap: this.contractHecoMap,
          contractAddress,
          provider: EthersPool.getProvider(HECO_NETWORK.chainId),
        });
      case BSC_NETWORK.chainId:
        return this.selectContract({
          contractMap: this.contractBscMap,
          contractAddress,
          provider: EthersPool.getProvider(BSC_NETWORK.chainId),
        });
      case ETH_NETWORK.chainId:
        return this.selectContract({
          contractMap: this.contractEthMap,
          contractAddress,
          provider: EthersPool.getProvider(ETH_NETWORK.chainId),
        });
    }
  }

  public removeContract({
    chain_id,
    contractAddress,
  }: {
    chain_id: number;
    contractAddress: string;
  }): void {
    switch (chain_id) {
      case HECO_NETWORK.chainId:
        BaseContractFactoryPool.delContract({
          contractMap: this.contractHecoMap,
          contractAddress,
        });
        break;
      case BSC_NETWORK.chainId:
        BaseContractFactoryPool.delContract({
          contractMap: this.contractBscMap,
          contractAddress,
        });
        break;
      case ETH_NETWORK.chainId:
        BaseContractFactoryPool.delContract({
          contractMap: this.contractEthMap,
          contractAddress,
        });
        break;
    }
  }

  public existContract({
    chain_id,
    baseAddress,
  }: {
    chain_id: number;
    baseAddress: string;
  }): boolean {
    switch (chain_id) {
      case HECO_NETWORK.chainId:
        const contractHeco = this.contractHecoMap.get(baseAddress);
        return !_.isEmpty(contractHeco);
      case BSC_NETWORK.chainId:
        const contractBsc = this.contractHecoMap.get(baseAddress);
        return !_.isEmpty(contractBsc);
      case ETH_NETWORK.chainId:
        const contractEth = this.contractHecoMap.get(baseAddress);
        return !_.isEmpty(contractEth);
    }
  }

  public selectContract({
    contractMap,
    contractAddress,
    provider,
  }: {
    contractMap: ContractMap;
    contractAddress: string;
    provider: JsonRpcProvider;
  }): Contract {
    const contract = contractMap.get(contractAddress);
    if (_.isEmpty(contract)) {
      const newContract = this.initContractPromise({
        contractAddress,
        signerOrProvider: provider,
      });
      contractMap.set(contractAddress, newContract);
      return newContract;
    } else {
      return contract;
    }
  }

  private static delContract({
    contractMap,
    contractAddress,
  }: {
    contractMap: ContractMap;
    contractAddress: string;
  }): void {
    contractMap.delete(contractAddress);
  }
}
