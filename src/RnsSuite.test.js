import Web3 from 'web3';
import { keccak_256 as sha3 } from 'js-sha3';
import RNSSuite from '@rsksmart/rns-suite';

import { rskOwnerAbi } from './abis.json';

describe('set up RSK environment, contracts, etc', () => {
  let web3;
  let addresses;

  beforeAll(async () => {
    // setup web3 and get account list
    web3 = new Web3(process.env.REACT_APP_NODE);

    console.log('before suite');
    const suite = await RNSSuite(process.env.REACT_APP_NODE, ['alice', 'bob', 'charlie'], ['david', 'eve', 'frank']);
    console.log('afters suite');

    // set addresses to be used later
    addresses = {
      rskOwner: suite.rskOwner.options.address,
      fifsRegistrar: suite.fifsRegistrar.options.address,
      publicResolver: suite.rns.options.publicResolver,
    };
  }, 60000);

  afterAll(() => {
    // clean up provider
    console.log('afterAll');
    web3.setProvider(null);
  });

  it('it should show the domain david as unavailable', async () => {
    const rskOwner = new web3.eth.Contract(rskOwnerAbi, addresses.rskOwner);
    const hash = `0x${sha3('david')}`;

    return rskOwner.methods.available(hash).call()
      .then((available) => {
        expect(available).toBeFalsy();
      });
  });

  it('it should show the domain foobar as available', async () => {
    console.log('checking foobar');
    const rskOwner = new web3.eth.Contract(rskOwnerAbi, addresses.rskOwner);
    const hash = `0x${sha3('foobar')}`;

    return rskOwner.methods.available(hash).call()
      .then((available) => {
        expect(available).toBeTruthy();
      });
  });
});
