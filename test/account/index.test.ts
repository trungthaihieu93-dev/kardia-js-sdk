import KardiaClient from '../../src';
import { ENDPOINT, ENDPOINT_PUBLIC } from '../config';
import { ACCOUNT } from '../config/account';
import {
  BLOCK_HEIGHT,
  BLOCK_HASH,
  PRIVATE_KEY,
  VALID_ADDRESS,
  MNEMONIC,
  ADDRESS_LOWERCASE,
} from './config';
import KardiaAccount from '../../src/account';

const endpoint = process.env.TEST_ENV === 'prod' ? ENDPOINT_PUBLIC : ENDPOINT;

describe('Account module test', () => {
  const kardiaClient = new KardiaClient({ endpoint });

  it('should be initialized with Kardia client', () => {
    expect(kardiaClient.account).toBeTruthy();
  });

  it('should get balance successfully', async () => {
    const balance = await kardiaClient.account.getBalance(ACCOUNT.address);
    expect(balance).toBeTruthy();
  });

  it('should get balance with block hash successfully', async () => {
    const balance = await kardiaClient.account.getBalance(ACCOUNT.address, {
      blockHash: BLOCK_HASH,
    });
    expect(balance).toBeTruthy();
  });

  it('should get balance with block height successfully', async () => {
    const balance = await kardiaClient.account.getBalance(ACCOUNT.address, {
      blockHeight: BLOCK_HEIGHT,
    });
    expect(balance).toBeTruthy();
  });

  it('should get nonce successfully', async () => {
    const nonce = await kardiaClient.account.getNonce(ACCOUNT.address);
    expect(nonce).not.toBeUndefined();
  });

  it('should get wallet from private key', async () => {
    const wallet = KardiaAccount.getWalletFromPK(PRIVATE_KEY);
    expect(wallet).toBeTruthy();
    expect(wallet.privateKey).toEqual(PRIVATE_KEY);
  });

  it('should check if an address is valid', async () => {
    const isInvalid = KardiaAccount.isAddress('123');
    expect(isInvalid).toEqual(false);

    const isValid = KardiaAccount.isAddress(VALID_ADDRESS);
    expect(isValid).toEqual(true);
  });

  it('should get wallet from mnemonic phrase', async () => {
    const wallet = KardiaAccount.getWalletFromMnemonic(MNEMONIC);
    expect(wallet).toBeTruthy();
  });

  it('should generate a new wallet', async () => {
    const wallet = KardiaAccount.generateWallet();
    expect(wallet).toBeTruthy();
    expect(wallet.address).toBeTruthy();
    expect(wallet.privateKey).toBeTruthy();
    expect(wallet.balance).toEqual(0);
  });

  it('should get correct checksum address', () => {
    const checksum = KardiaAccount.toChecksumAddress(ADDRESS_LOWERCASE);
    expect(checksum).toEqual(VALID_ADDRESS);
  });
});
