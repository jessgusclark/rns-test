import Web3 from 'web3';

describe('testing connection to blockchain', () => {
  const web3 = new Web3(process.env.REACT_APP_NODE);
  const ONE_HUNDREAD = 100000000000000000000;
  const ONE = ONE_HUNDREAD / 100;
  const SMALL = 1000000;

  it('can get the balance of account 4', async () => {
    console.log('getting balance');
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[8]);
    expect(parseInt(balance, 10)).toBe(ONE_HUNDREAD);
  });

  it('can transfer value from one account to another', async () => {
    const accounts = await web3.eth.getAccounts();

    // get the balance before transaction to compare
    const beforeBalance3 = await web3.eth.getBalance(accounts[3]);
    const beforeBalance4 = await web3.eth.getBalance(accounts[4]);

    // transaction
    await web3.eth.sendTransaction({
      from: accounts[3],
      to: accounts[4],
      value: SMALL,
    });

    const afterBalance3 = await web3.eth.getBalance(accounts[3]);
    const afterBalance4 = await web3.eth.getBalance(accounts[4]);
    console.log('balanceAccount3', beforeBalance3, afterBalance3);
    console.log('balanceAccount4', beforeBalance4, afterBalance4);

    // less than 99 becuse of gas fees:
    // expect(parseInt(afterBalance3, 10) < (beforeBalance3 - ONE)).toBeTruthy();
    expect(parseInt(afterBalance4, 10)).toEqual(parseInt(beforeBalance4, 10) + SMALL);
  });
});
