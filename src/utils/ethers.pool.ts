import * as _ from 'lodash';
import moment from 'moment';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import {
  ADDRESS_TYPE,
  BSC_NETWORK,
  ETH_NETWORK,
  HECO_NETWORK,
  Network,
} from '../constant';
import { EtherFactoryService } from '../nestService';

export type ArchivedAddressListType = { address: string; lock: number }[];
export type EnsAddressListType = { address: string; count: number }[];

class EthersFactoryPool {
  private static ethersFactoryPool: EthersFactoryPool;

  private readonly bscEnsAddressList: EnsAddressListType;
  private readonly bscArchivedAddressList: ArchivedAddressListType;
  private readonly ethEnsAddressList: EnsAddressListType;
  private readonly ethArchivedAddressList: ArchivedAddressListType;
  private readonly hecoEnsAddressList: EnsAddressListType;
  private readonly hecoArchivedAddressList: ArchivedAddressListType;
  private readonly providerHeco: JsonRpcProvider;
  private readonly providerBsc: JsonRpcProvider;
  private readonly providerEth: JsonRpcProvider;
  private readonly walletHeco: Wallet;
  private readonly walletBsc: Wallet;
  private readonly walletEth: Wallet;

  private constructor(
    private readonly hecoNetWork: Network,
    private readonly bscNetWork: Network,
    private readonly ethNetWork: Network,
    private readonly etherFactoryService: EtherFactoryService,
  ) {
    this.bscEnsAddressList = _.map(bscNetWork.ensAddress, address => ({
      address,
      count: 0,
    }));
    this.bscArchivedAddressList = _.map(
      bscNetWork.archivedAddress,
      address => ({
        address,
        lock: 0,
      }),
    );
    this.ethEnsAddressList = _.map(ethNetWork.ensAddress, address => ({
      address,
      count: 0,
    }));
    this.ethArchivedAddressList = _.map(
      ethNetWork.archivedAddress,
      address => ({
        address,
        lock: 0,
      }),
    );
    this.hecoEnsAddressList = _.map(hecoNetWork.ensAddress, address => ({
      address,
      count: 0,
    }));
    this.hecoArchivedAddressList = _.map(
      hecoNetWork.archivedAddress,
      address => ({
        address,
        lock: 0,
      }),
    );
    const ensAddressHeco = this.getEnsAddress({
      chainId: HECO_NETWORK.chainId,
    });
    const ensAddressBsc = this.getEnsAddress({
      chainId: BSC_NETWORK.chainId,
    });
    const ensAddressEth = this.getEnsAddress({
      chainId: ETH_NETWORK.chainId,
    });
    this.providerHeco = this.etherFactoryService.jsonRpcProvider(
      ensAddressHeco,
    );
    this.providerBsc = this.etherFactoryService.jsonRpcProvider(ensAddressBsc);
    this.providerEth = this.etherFactoryService.jsonRpcProvider(ensAddressEth);
    if (process.env.ETHER_PRIVATE_KEY) {
      this.walletHeco = this.etherFactoryService.wallet({
        walletPrivateKey: process.env.ETHER_PRIVATE_KEY,
        provider: this.providerHeco,
      });
      this.walletBsc = this.etherFactoryService.wallet({
        walletPrivateKey: process.env.ETHER_PRIVATE_KEY,
        provider: this.providerBsc,
      });
      this.walletEth = this.etherFactoryService.wallet({
        walletPrivateKey: process.env.ETHER_PRIVATE_KEY,
        provider: this.providerEth,
      });
    }
  }

  public getEnsAddress({ chainId }: { chainId: number }): string {
    let ensAddressList: EnsAddressListType;
    switch (chainId) {
      case HECO_NETWORK.chainId:
        ensAddressList = this.hecoEnsAddressList;
        break;
      case BSC_NETWORK.chainId:
        ensAddressList = this.bscEnsAddressList;
        break;
      case ETH_NETWORK.chainId:
        ensAddressList = this.ethEnsAddressList;
        break;
    }
    const ensAddressInfo = _.minBy(ensAddressList, o => o?.count);
    this.incrCount(ensAddressList, ensAddressInfo?.address);
    return ensAddressInfo?.address;
  }

  public getArchivedAddress({
    chainId,
    unlock = false,
  }: {
    chainId: number;
    unlock?: boolean;
  }): string {
    const now = new Date().getTime();
    let archivedAddressList: ArchivedAddressListType;
    switch (chainId) {
      case HECO_NETWORK.chainId:
        archivedAddressList = this.hecoArchivedAddressList;
        break;
      case BSC_NETWORK.chainId:
        archivedAddressList = this.bscArchivedAddressList;
        break;
      case ETH_NETWORK.chainId:
        archivedAddressList = this.ethArchivedAddressList;
        break;
    }
    let archivedAddressInfo;
    if (unlock) {
      archivedAddressInfo = _.find(archivedAddressList, o => {
        return now > o?.lock;
      });
    } else {
      archivedAddressInfo = _.minBy(archivedAddressList, o => o?.lock);
    }
    return archivedAddressInfo?.address;
  }

  public lock({
    addressType,
    address,
  }: {
    addressType: ADDRESS_TYPE;
    address: string;
  }) {
    switch (addressType) {
      case ADDRESS_TYPE.archivedBsc:
        this.setLockTime(this.bscArchivedAddressList, address);
        break;
      case ADDRESS_TYPE.archivedEth:
        this.setLockTime(this.ethArchivedAddressList, address);
        break;
      case ADDRESS_TYPE.archivedHeco:
        this.setLockTime(this.hecoArchivedAddressList, address);
        break;
    }
  }

  private setLockTime(addressList: ArchivedAddressListType, address: string) {
    const index = _.findIndex(addressList, function(o) {
      return o.address == address;
    });
    _.set(
      addressList,
      `[${index}].lock`,
      moment()
        .add('1h')
        .toDate()
        .getTime(),
    );
  }

  private incrCount(addressList: EnsAddressListType, address: string) {
    const index = _.findIndex(addressList, function(o) {
      return o.address == address;
    });
    if (index > -1) {
      _.set(addressList, `[${index}].count`, addressList?.[index]?.count + 1);
    }
  }

  public getProvider(chain_id: number): JsonRpcProvider {
    switch (chain_id) {
      case HECO_NETWORK.chainId:
        return this.providerHeco;
      case BSC_NETWORK.chainId:
        return this.providerBsc;
      case ETH_NETWORK.chainId:
        return this.providerEth;
    }
  }

  public getWallet(chain_id: number): Wallet {
    switch (chain_id) {
      case HECO_NETWORK.chainId:
        return this.walletHeco;
      case BSC_NETWORK.chainId:
        return this.walletBsc;
      case ETH_NETWORK.chainId:
        return this.walletEth;
    }
  }

  static init(): EthersFactoryPool {
    EthersFactoryPool.ethersFactoryPool = new EthersFactoryPool(
      HECO_NETWORK,
      BSC_NETWORK,
      ETH_NETWORK,
      new EtherFactoryService(),
    );
    return EthersFactoryPool.ethersFactoryPool;
  }
}
export const EthersPool = EthersFactoryPool.init();
