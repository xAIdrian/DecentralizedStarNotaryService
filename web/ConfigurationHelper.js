//ConfigurationHelper.js
const Web3 = require('web3')
const Configuration = require('./Configuration.js')

//set the appropriate web3 instance and StarNotary Contract
const getConfiguration = function() {
    return new Promise((onFulfilled, onRejected) => {

        if(typeof web3 != 'undefined') { 
                web3 = new Web3(web3.currentProvider)
            } else {
                // Instantiate and set Ganache as your provider
                web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
            }

        try { 
            // The default (top) wallet account from a list of test accounts
            web3.eth.defaultAccount = web3.eth.accounts[0];
        } catch(error) {
            onRejected(error)
        }
            // The interface definition for your smart contract (the ABI) 
        var starNotary = new web3.eth.Contract(
            [
                {
                    "constant": true,
                    "inputs": [
                        {
                        "name": "interfaceId",
                        "type": "bytes4"
                        }
                    ],
                    "name": "supportsInterface",
                    "outputs": [
                        {
                        "name": "",
                        "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                    },
                    {
                    "constant": true,
                    "inputs": [
                        {
                        "name": "",
                        "type": "uint256"
                        }
                    ],
                    "name": "starsForSale",
                    "outputs": [
                        {
                        "name": "",
                        "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                    },
                    {
                    "constant": true,
                    "inputs": [
                        {
                        "name": "",
                        "type": "uint256"
                        }
                    ],
                    "name": "tokenIdToStarInfo",
                    "outputs": [
                        {
                        "name": "name",
                        "type": "string"
                        },
                        {
                        "name": "story",
                        "type": "string"
                        },
                        {
                        "name": "dec",
                        "type": "string"
                        },
                        {
                        "name": "mag",
                        "type": "string"
                        },
                        {
                        "name": "cent",
                        "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                    },
                    {
                    "constant": true,
                    "inputs": [
                        {
                        "name": "",
                        "type": "bytes32"
                        }
                    ],
                    "name": "coordsToTokenId",
                    "outputs": [
                        {
                        "name": "",
                        "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                    },
                    {
                    "constant": false,
                    "inputs": [
                        {
                        "name": "from",
                        "type": "address"
                        },
                        {
                        "name": "to",
                        "type": "address"
                        },
                        {
                        "name": "tokenId",
                        "type": "uint256"
                        }
                    ],
                    "name": "transferFrom",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                    },
                    {
                    "constant": false,
                    "inputs": [
                        {
                        "name": "from",
                        "type": "address"
                        },
                        {
                        "name": "to",
                        "type": "address"
                        },
                        {
                        "name": "tokenId",
                        "type": "uint256"
                        }
                    ],
                    "name": "safeTransferFrom",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                    },
                    {
                    "constant": false,
                    "inputs": [
                        {
                        "name": "from",
                        "type": "address"
                        },
                        {
                        "name": "to",
                        "type": "address"
                        },
                        {
                        "name": "tokenId",
                        "type": "uint256"
                        },
                        {
                        "name": "_data",
                        "type": "bytes"
                        }
                    ],
                    "name": "safeTransferFrom",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                    },
                    {
                    "anonymous": false,
                    "inputs": [
                        {
                        "indexed": true,
                        "name": "from",
                        "type": "address"
                        },
                        {
                        "indexed": true,
                        "name": "to",
                        "type": "address"
                        },
                        {
                        "indexed": true,
                        "name": "tokenId",
                        "type": "uint256"
                        }
                    ],
                    "name": "Transfer",
                    "type": "event"
                    },
                    {
                    "anonymous": false,
                    "inputs": [
                        {
                        "indexed": true,
                        "name": "owner",
                        "type": "address"
                        },
                        {
                        "indexed": true,
                        "name": "approved",
                        "type": "address"
                        },
                        {
                        "indexed": true,
                        "name": "tokenId",
                        "type": "uint256"
                        }
                    ],
                    "name": "Approval",
                    "type": "event"
                    },
                    {
                    "anonymous": false,
                    "inputs": [
                        {
                        "indexed": true,
                        "name": "owner",
                        "type": "address"
                        },
                        {
                        "indexed": true,
                        "name": "operator",
                        "type": "address"
                        },
                        {
                        "indexed": false,
                        "name": "approved",
                        "type": "bool"
                        }
                    ],
                    "name": "ApprovalForAll",
                    "type": "event"
                    },
                    {
                    "constant": false,
                    "inputs": [
                        {
                        "name": "_tokenId",
                        "type": "uint256"
                        },
                        {
                        "name": "_name",
                        "type": "string"
                        },
                        {
                        "name": "_story",
                        "type": "string"
                        },
                        {
                        "name": "_dec",
                        "type": "string"
                        },
                        {
                        "name": "_mag",
                        "type": "string"
                        },
                        {
                        "name": "_cent",
                        "type": "string"
                        }
                    ],
                    "name": "createStar",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                    },
                    {
                    "constant": false,
                    "inputs": [
                        {
                        "name": "_tokenId",
                        "type": "uint256"
                        },
                        {
                        "name": "_price",
                        "type": "uint256"
                        }
                    ],
                    "name": "putStarUpForSale",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                    },
                    {
                    "constant": false,
                    "inputs": [
                        {
                        "name": "_tokenId",
                        "type": "uint256"
                        }
                    ],
                    "name": "buyStar",
                    "outputs": [],
                    "payable": true,
                    "stateMutability": "payable",
                    "type": "function"
                    },
                    {
                    "constant": false,
                    "inputs": [
                        {
                        "name": "_tokenId",
                        "type": "uint256"
                        },
                        {
                        "name": "_dec",
                        "type": "string"
                        },
                        {
                        "name": "_mag",
                        "type": "string"
                        },
                        {
                        "name": "_cent",
                        "type": "string"
                        }
                    ],
                    "name": "checkIfStarExists",
                    "outputs": [
                        {
                        "name": "",
                        "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                    },
                    {
                    "constant": false,
                    "inputs": [
                        {
                        "name": "sender",
                        "type": "address"
                        },
                        {
                        "name": "tokenId",
                        "type": "uint256"
                        }
                    ],
                    "name": "mint",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                    },
                    {
                    "constant": true,
                    "inputs": [
                        {
                        "name": "tokenId",
                        "type": "uint256"
                        }
                    ],
                    "name": "ownerOf",
                    "outputs": [
                        {
                        "name": "",
                        "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                    },
                    {
                    "constant": true,
                    "inputs": [
                        {
                        "name": "owner",
                        "type": "address"
                        }
                    ],
                    "name": "balanceOf",
                    "outputs": [
                        {
                        "name": "",
                        "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                    },
                    {
                    "constant": false,
                    "inputs": [
                        {
                        "name": "sender",
                        "type": "address"
                        },
                        {
                        "name": "tokenId",
                        "type": "uint256"
                        }
                    ],
                    "name": "approve",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                    },
                    {
                    "constant": true,
                    "inputs": [
                        {
                        "name": "tokenId",
                        "type": "uint256"
                        }
                    ],
                    "name": "getApproved",
                    "outputs": [
                        {
                        "name": "",
                        "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                    },
                    {
                    "constant": false,
                    "inputs": [
                        {
                        "name": "to",
                        "type": "address"
                        },
                        {
                        "name": "approved",
                        "type": "bool"
                        }
                    ],
                    "name": "setApprovalForAll",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                    },
                    {
                    "constant": true,
                    "inputs": [
                        {
                        "name": "owner",
                        "type": "address"
                        },
                        {
                        "name": "operator",
                        "type": "address"
                        }
                    ],
                    "name": "isApprovedForAll",
                    "outputs": [
                        {
                        "name": "",
                        "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                    },
                    {
                    "constant": false,
                    "inputs": [
                        {
                        "name": "from",
                        "type": "address"
                        },
                        {
                        "name": "to",
                        "type": "address"
                        },
                        {
                        "name": "tokenId",
                        "type": "uint256"
                        }
                    ],
                    "name": "saferTransferFrom",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                    }
                ]
        );
            // Grab the contract at specified deployed address with the interface defined by the ABI
            //var starNotary = StarNotary.at('0x3dbf14c52de3bec278864410f3a085e1e0ae1a8d')
            var config = new Configuration(web3, starNotary)

            onFulfilled(config)
    })
}

module.exports = {
    getConfiguration : getConfiguration
  }