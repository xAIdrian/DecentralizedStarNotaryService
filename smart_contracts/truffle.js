var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "mobile convince online dish crouch maid name car evoke ugly help oven";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      //launching ganache cli "Listening on 127.0.0.1:8545"
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    //I encourage you to create a conditional method to check which port ganache is running on 
    //to allow users that use the desktop application to run your application without any issues.
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/eaa3aa3cdd864f549371a1791a52865b')
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000
      // optional config values:
      // gas
      // gasPrice
      // from - default address to use for any transaction Truffle makes during migrations
      // provider - web3 provider instance Truffle should use to talk to the Ethereum network.
      //          - function that returns a web3 provider instance (see below.)
      //          - if specified, host and port are ignored.
    }
  }
};
