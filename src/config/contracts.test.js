import contracts from './contracts.circleci.json';
describe('it loads the contract correctly', () => {
  it('has value for RNS', () => {
    expect(contracts.rns !== "").toBeTruthy();
  });
});
