type Key = {
  address: string;
  privateKey: string;
};

export const keys = {};

export const coinbase: Key = {
  address: '0x0c4437Af1B51E1e9c87D5a302b15A215287878b0',
  privateKey:
    '0x70b42d86cc7fdc1a4288cf95611a68c5f2dc1c89fa6f48b82d0cdc9f1cb7c9e2'
};

export const another: Key = {
  address: '0xd757aE7729544124079358A798a534F085135a6F',
  privateKey:
    '0xa9fbe6e1690847235ce26ab1f55827a5d66a12b1554e55227b5995914b45a630'
};

keys[coinbase.address] = coinbase;
keys[another.address] = another;

export function getPrivateKey(address: string): string {
  const key = keys[address];
  if (!key) {
    throw new Error(`No key in the keystore for address: ${address}`);
  }
  return key.privateKey;
}
