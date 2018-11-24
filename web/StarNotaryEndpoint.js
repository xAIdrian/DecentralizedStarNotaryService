const express = require('express')
const app = express()
const port = 3000

const ConfigurationHelper = require('./ConfigurationHelper.js')

let web3;
let starNotary;

app.listen(port, () =>  {
    let self = this;
    console.log(`Example app listening on port ${port}!`)

    ConfigurationHelper.getConfiguration().then(function(result) {

        self.web3 = result.web3;
        self.starNotary = result.contract;

    }, function(error) {
        console.log(error)
    })
})

app.get('/', (req, res) => res.send('Hello World!'))

//communicate with your Ethereum smart contract
//to get the star on the blockchain with the Token ID
app.get('/star/:starTokenId', (req, res) => {
    let self = this;
    let starToken = req.params.starTokenId;

    if (this.web3 !== undefined && this.starNotary !== undefined 
        && this.starToken !== undefined) {

        if (this.starToken === "") {
            console.log('Star Token Id must be a valid value');
            return;
        }    

        this.web3.eth.getAccounts(function(error, accounts) { 
            if (error) { 
                console.log(error)
                return
            }
    
            var account = accounts[0]

            self.starNotary.tokenIdToStarInfo(tokenId, { from: account },
                function(error, result) {
                
                if (!error) {
                    console.log(result)
                } else {
                    console.log(error)
                }    
            })
        })
        
    } else {
        console.log('something went wrong or some data is missing!')
    }
})

