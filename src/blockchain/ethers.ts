import { Wallet, Transaction, TransactionReceipt } from 'ethers';
import { JsonRpcProvider } from 'ethers/providers';
import config from '../config';
import { getPrivateKey } from './keystore';

export const provider: JsonRpcProvider = new JsonRpcProvider(config.gethUrl, {
  chainId: 8995
});
provider.pollingInterval = config.pollingInterval;

export const transactionDefaults = { gasLimit: config.gas };

export async function processTransaction(
  transaction: any,
  sender: string
): Promise<TransactionReceipt> {
  const wallet = getWallet(sender);
  const txWithDefaults = Object.assign({}, transaction, transactionDefaults);
  const result = await wallet.sendTransaction(txWithDefaults);
  return waitForReceipt(result.hash);
}

export function getWallet(sender: string): Wallet {
  const privateKey = getPrivateKey(sender);
  return getWalletFromPrivateKey(privateKey);
}

export function getWalletFromPrivateKey(privateKey: string): Wallet {
  return new Wallet(privateKey, provider);
}

const TRANSACTION_TIMEOUT: number = 30000;

export async function waitForReceipt(
  hash: string
): Promise<TransactionReceipt> {
  const transaction: Transaction = await provider.waitForTransaction(
    hash,
    TRANSACTION_TIMEOUT
  );
  if (transaction) {
    const receipt: TransactionReceipt = await provider.getTransactionReceipt(
      hash
    );

    if (receipt) {
      if (receipt.status === 0) {
        throw new Error(
          `Exception occurred in contract. Transaction failed. ${hash}`
        );
      } else {
        return receipt;
      }
    } else {
      throw new Error(`Cannot get receipt of Tx ${hash}`);
    }
  } else {
    throw new Error(
      `Giving up after ${TRANSACTION_TIMEOUT /
        1000} seconds waiting for mining of Tx ${hash}`
    );
  }
}
