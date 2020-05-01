import Web3 from 'web3';

describe('testing connection to blockchain', () => {
  const web3 = new Web3('http://0.0.0.0:8545');

  it('can get the latest block number', async () => {
    const currentBlock = await web3.eth.getBlock('latest');
    expect(currentBlock.number).toBe(0);
  });

  it('can get the balance of account 4', async () => {
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[3]);
    expect(parseInt(balance, 10)).toBe(100000000000000000001);
  });
});