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
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/eaa3aa3cdd864f549371a1791a52865b')
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000
    }
  }
};
