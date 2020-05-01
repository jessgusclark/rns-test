const RNSSuite = require('@rsksmart/rns-suite');

RNSSuite (
  'http://0.0.0.0:8545',
  ['alice', 'bob', 'charlie'],
  ['david', 'eve', 'frank']
).then(suite => {
  const addresses = {
    rskOwner: suite.rskOwner.options.address,
    fifsRegistrar: suite.fifsRegistrar.options.address,
    publicResolver: suite.rns.options.publicResolver,
  };

  console.log(addresses);
});

