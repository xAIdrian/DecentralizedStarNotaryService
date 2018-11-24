//Configuration.js

class Configuration {
    constructor(web3Instance, ethereumContract) {
        this.web3 = web3Instance;
        this.contract = ethereumContract;
    }
}

module.exports = Configuration;