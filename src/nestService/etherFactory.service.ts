import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { Wallet } from '@ethersproject/wallet';
import batchSend_abi from '../contracts/batchSend.json';
import erc20_abi from '../contracts/erc20.json';
import boardroomLock from '../contracts/boardroom_lock.json';
import pair_abi from '../contracts/pair.json';
import nftMining from '../contracts/nftMining.json';
import nft from '../contracts/nft.json';
import blindBox from '../contracts/blindBox.json';
import { Signer } from '@ethersproject/abstract-signer';
import { Provider } from '@ethersproject/abstract-provider';

@Injectable()
export class EtherFactoryService {
  jsonRpcProvider(etherUrl: string): JsonRpcProvider {
    return new ethers.providers.JsonRpcProvider(etherUrl);
  }

  wallet({
    walletPrivateKey,
    provider,
  }: {
    walletPrivateKey: string;
    provider: JsonRpcProvider;
  }): Wallet {
    return new ethers.Wallet(walletPrivateKey, provider);
  }

  erc20Contract({
    contractAddress,
    signerOrProvider,
  }: {
    contractAddress: string;
    signerOrProvider: Signer | Provider;
  }): Contract {
    return new ethers.Contract(contractAddress, erc20_abi, signerOrProvider);
  }

  boardroomLockContract({
    contractAddress,
    signerOrProvider,
  }: {
    contractAddress: string;
    signerOrProvider: Signer | Provider;
  }): Contract {
    return new ethers.Contract(
      contractAddress,
      boardroomLock,
      signerOrProvider,
    );
  }

  batchSendContract({
    contractAddress,
    signerOrProvider,
  }: {
    contractAddress: string;
    signerOrProvider: Signer | Provider;
  }): Contract {
    return new ethers.Contract(
      contractAddress,
      batchSend_abi,
      signerOrProvider,
    );
  }

  pairContract({
    contractAddress,
    signerOrProvider,
  }: {
    contractAddress: string;
    signerOrProvider: Signer | Provider;
  }): Contract {
    return new ethers.Contract(contractAddress, pair_abi, signerOrProvider);
  }

  nftMiningContract({
    contractAddress,
    signerOrProvider,
  }: {
    contractAddress: string;
    signerOrProvider: Signer | Provider;
  }): Contract {
    return new ethers.Contract(contractAddress, nftMining, signerOrProvider);
  }

  nftContract({
    contractAddress,
    signerOrProvider,
  }: {
    contractAddress: string;
    signerOrProvider: Signer | Provider;
  }): Contract {
    return new ethers.Contract(contractAddress, nft, signerOrProvider);
  }

  blindBoxContract({
    contractAddress,
    signerOrProvider,
  }: {
    contractAddress: string;
    signerOrProvider: Signer | Provider;
  }): Contract {
    return new ethers.Contract(contractAddress, blindBox, signerOrProvider);
  }
}
