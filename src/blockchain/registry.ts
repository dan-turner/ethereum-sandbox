import { Contract as ContractInterface, TransactionReceipt } from 'ethers';
import { id } from 'ethers/utils';
import { waitForReceipt, getWallet, provider } from './ethers';

export const ContractRegistry = require('../truffle/build/contracts/ContractRegistry.json');

const ADDRESS = '0x0000000000000000000000000000000000000084';

async function factory(sender: string): Promise<ContractInterface> {
  const providerOrWallet = sender ? getWallet(sender) : provider;
  return new ContractInterface(ADDRESS, ContractRegistry.abi, providerOrWallet);
}

export class Registry {
  private sender: string;

  constructor(sender: string) {
    this.sender = sender;
  }
  async getAddress(contract: string): Promise<string> {
    const instance = await factory(null);
    return instance.get(id(contract));
  }
  async setAddress(
    contract: string,
    address: string
  ): Promise<TransactionReceipt> {
    const instance = await factory(this.sender);
    const tx = await instance.set(id(contract), address);
    return waitForReceipt(tx.hash);
  }
}

export const DefaultRegistry = new Registry(null);
