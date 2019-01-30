import {
  Contract as ContractInterface,
  CompiledContract,
  TransactionReceipt
} from 'ethers';
import { waitForReceipt, getWallet, provider } from './ethers';

export const SimpleStorage: CompiledContract = require('../truffle/build/contracts/SimpleStorage.json');

async function factory(address: string, sender: string): Promise<ContractInterface> {
  const providerOrWallet = sender ? getWallet(sender) : provider;
  return new ContractInterface(address, SimpleStorage.abi, providerOrWallet);
}

export class Storage {
  private address: string;
  private sender: string;

  constructor(address: string, sender: string) {
    this.address = address;
    this.sender = sender;
  }
  async get(): Promise<number> {
    const instance = await factory(this.address, null);
    return instance.get();
  }
  async set(value: number): Promise<TransactionReceipt> {
    const instance = await factory(this.address, this.sender);
    const tx = await instance.set({
      number: value
    });
    return waitForReceipt(tx.hash);
  }
}
