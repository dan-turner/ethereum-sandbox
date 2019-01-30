import { deploy } from '../blockchain/contracts';
import config from '../config';
import { SimpleStorage, Storage } from '../blockchain/storage';
import { time } from '../utils';

export default async function main() {
  console.log('Deploying contracts');
  console.log(`Using Geth: ${config.gethUrl}`);

  const iterations = 20;
  for(var i = 0; i < iterations; i++) {
    let deployReceipt, initialValue, newValue;

    console.log('\n------------------------------------');
    console.log(`Iteration: ${i+1} of ${iterations}`);

    await time(`deploy('SimpleStorage', SimpleStorage, 123)`, async () => {
      deployReceipt = await deploy('SimpleStorage', SimpleStorage, 123);
    });


    const storage = new Storage(deployReceipt.contractAddress, config.coinbase);

    await time('storage.get()', async () => {
      initialValue = await storage.get();
    });

    await time('storage.set(987)', async () => {
      await storage.set(987);
    });

    await time('storage.get()', async () => {
      newValue = await storage.get();
    });

    console.log('------------------------------------');
    console.log(`Storage Address:   ${deployReceipt.contractAddress}`);
    console.log(`Initial Value:     ${initialValue}`);
    console.log(`New Value:         ${newValue}`);
    console.log('------------------------------------');
  }

  console.log('\nContracts deployed');
}

main()
  .then(() => {
    console.log('Goodbye!');
  })
  .catch(err => {
    console.log('ERROR', err);
    process.exit(1);
  });
