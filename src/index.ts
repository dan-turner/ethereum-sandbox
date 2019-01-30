//import { Wallet } from 'ethers';
import { getWalletFromPrivateKey, waitForReceipt } from './blockchain/ethers';
import { Wallet, utils, Transaction } from 'ethers';
import { time } from './utils';

export default async function main() {
  var other = Wallet.createRandom();
  var wallet = getWalletFromPrivateKey('0x31fe72ad35eed22fde60418d2bfa4a240efe6bd25523f43c893b9024e2774319');
  const initialBalance = await wallet.getBalance('latest');
  const txs: Transaction[] = [];
  const iterations = 1000;

  console.log(`-------------------------------------`);
  console.log(`Iterations:      ${iterations}`);

  await time('Sending txs...', async () => {
    for(var i = 0; i < iterations; i++) {
      const tx = await wallet.send(other.getAddress(), new utils.BigNumber(1));
      txs.push(tx);
    }
  });

  await time('Waiting for last receipt...', async () => {
    const lastTx = txs[txs.length - 1];
    await waitForReceipt(lastTx.hash);
  });

  console.log(`-------------------------------------`);
  console.log(`Initial Balance: ${initialBalance}`);
  const finalBalance = await wallet.getBalance('latest');
  console.log(`Final Balance:   ${finalBalance}`);
  console.log(`Delta:           ${(new utils.BigNumber(finalBalance).sub(new utils.BigNumber(initialBalance))).toString()}`);
  console.log(`-------------------------------------`);
}

main()
  .then(() => {
    console.log('Goodbye!');
  })
  .catch(err => {
    console.log('ERROR', err);
    process.exit(1);
  });

