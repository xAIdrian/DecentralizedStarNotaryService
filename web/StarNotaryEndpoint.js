const express = require('express')
const app = express()
const port = 3000

const ConfigurationHelper = require('./ConfigurationHelper.js')
const Configuration = require('./Configuration.js')

let starNotary;

app.listen(port, () =>  {
    let self = this;
    console.log(`Example app listening on port ${port}!`)

    ConfigurationHelper.getConfiguration(window).then(function(result) {

        self.starNotary = result.contract;

    }, function(error) {

    })
})

app.get('/', (req, res) => res.send('Hello World!'))

//communicate with your Ethereum smart contract
//to get the star on the blockchain with the Token ID
app.get('star/:starTokenId', (request, response) => {
    let params = request.params;

    //get access to our smart contract and call method
})

