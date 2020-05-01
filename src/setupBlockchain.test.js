import Web3 from 'web3';
import ganache from 'ganache-cli';
import { keccak_256 as sha3 } from 'js-sha3';
import RNSSuite from '@rsksmart/rns-suite';

import { rskOwnerAbi } from './abis/search.json';

console.log('before describe');
const ONE_HUNDREAD = 100000000000000000000;
// const ONE = ONE_HUNDREAD / 100;

describe('set up RSK environment, contracts, etc', () => {
  let web3;
  let accounts;
  let addresses;
  let provider;

  beforeAll(async () => {
    console.log('beforeAll start');
    // set up provider, assign it to process environment variable
    provider = ganache.provider();
    process.env.REACT_APP_NODE = provider;

    // setup web3 and get account list
    web3 = new Web3(provider);
    accounts = await web3.eth.getAccounts();

    console.log('before suite');
    // setup RSK suite, the 60000 at the end of beforeAll lets this function
    // have up to 60 seconds to complete
    const suite = await RNSSuite(provider, ['alice', 'bob', 'charlie'], ['david', 'eve', 'frank']);

    console.log('afters suite');

    // set addresses to be used later
    addresses = {
      rskOwner: suite.rskOwner.options.address,
      fifsRegistrar: suite.fifsRegistrar.options.address,
      publicResolver: suite.rns.options.publicResolver,
    };
  }, 60000);

  beforeEach(() => {
    // deploy suite
    console.log('before each');
  });

  afterEach(() => {
    console.log('afterEach');
  });

  afterAll(() => {
    // clean up provider
    console.log('afterAll');
    provider.stop();
  });

  it('gets the block number after RNS suite is deployed', async () => {
    console.log('gets the block number');
    const currentBlock = await web3.eth.getBlock('latest');
    expect(currentBlock.number).toBe(39);
  });

  it('accounts exists and has a balance', async () => {
    console.log('accounts exist and has balance');
    // first account exists
    expect(accounts[0]).toBeTruthy();

    // second account has full balance
    const balance = await web3.eth.getBalance(accounts[1]);
    expect(parseInt(balance, 10)).toBe(ONE_HUNDREAD);
  });

  it('it should show the domain david as unavailable', async () => {
    console.log('checking david');
    const rskOwner = new web3.eth.Contract(rskOwnerAbi, addresses.rskOwner);
    const hash = `0x${sha3('david')}`;

    const available = await rskOwner.methods.available(hash).call();
    console.log('expecting false');
    expect(available).toBeFalsy();
  });
  /*
  it('it should show the domain foobar as available', async () => {
    console.log('checking foobar');
    const rskOwner = new web3.eth.Contract(rskOwnerAbi, addresses.rskOwner);
    const hash = `0x${sha3('foobar')}`;

    return rskOwner.methods.available(hash).call()
      .then((available) => {
        expect(available).toBeTruthy();
      });
  });
  */
});
