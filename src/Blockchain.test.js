import Web3 from 'web3';

describe('testing connection to blockchain', () => {
  it('can get the latest block number', async () => {
    const web3 = new Web3('http://0.0.0.0:8545');
    const currentBlock = await web3.eth.getBlock('latest');
    expect(currentBlock.number).toBe(0);
  });
});