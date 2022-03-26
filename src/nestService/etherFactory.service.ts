import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { Wallet } from '@ethersproject/wallet';
import batchSend_abi from '../abi/batchSend.json';
import erc20_abi from '../abi/erc20.json';
import boardroomLock from '../abi/boardroom_lock.json';
import pair_abi from '../abi/pair.json';
import nftMining from '../abi/nftMining.json';
import nft from '../abi/nft.json';
import blindBox from '../abi/blindBox.json';
import erc721 from '../abi/erc721_abi.json';
import erc1155 from '../abi/erc1155_abi.json';
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

  nftContract721({
    contractAddress,
    signerOrProvider,
  }: {
    contractAddress: string;
    signerOrProvider: Signer | Provider;
  }): Contract {
    return new ethers.Contract(contractAddress, erc721, signerOrProvider);
  }

  nftContract1155({
    contractAddress,
    signerOrProvider,
  }: {
    contractAddress: string;
    signerOrProvider: Signer | Provider;
  }): Contract {
    return new ethers.Contract(contractAddress, erc1155, signerOrProvider);
  }
}
