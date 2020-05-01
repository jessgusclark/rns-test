import Web3 from 'web3';

describe('testing connection to blockchain', () => {
  const web3 = new Web3('http://0.0.0.0:8545');
  const ONE_HUNDREAD = 100000000000000000000;
  const ONE = ONE_HUNDREAD / 100;

  it('can get the latest block number', async () => {
    const currentBlock = await web3.eth.getBlock('latest');
    expect(currentBlock.number).toBe(0);
  });

  it('can get the balance of account 4', async () => {
    console.log('getting balance');
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[3]);
    expect(parseInt(balance, 10)).toBe(ONE_HUNDREAD);
  });

  it('can transfer value from one account to another', async () => {
    const accounts = await web3.eth.getAccounts();
    const response = await web3.eth.sendTransaction({
      from: accounts[3],
      to: accounts[4],
      value: ONE,
    });
    console.log(response);

    const balanceAccount3 = await web3.eth.getBalance(accounts[3]);
    const balanceAccount4 = await web3.eth.getBalance(accounts[4]);
    console.log('balanceAccount3', balanceAccount3);
    console.log('balanceAccount4', balanceAccount4);

    expect(balanceAccount3 < ONE_HUNDREAD).toBeTruthy();
    expect(balanceAccount4).toEqual(ONE_HUNDREAD + ONE);

  });
});