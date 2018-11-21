window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);

        try {
            await ethereum.enable();
            web3.eth.defaultAccount = web3.eth.accounts[0];

            console.log("window account check")
            console.log(web3.eth.accounts[0]);

            // the rest of the code here

    } catch (e) {
        console.log('large error')
        console.log(e)
    }
} else {
    // Instantiate and set Ganache as your provider
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

    console.log('made it here')
}
})
// The interface definition for your smart contract (the ABI) 
var StarNotary = web3.eth.contract(
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
    var starNotary = StarNotary.at('0x3dbf14c52de3bec278864410f3a085e1e0ae1a8d')

// Enable claim button being clicked
function claimButtonClicked() { 

    var notifyTextField = document.getElementById('notifier_text')
    notifyTextField.innerHTML = "";

    var tokenId = document.getElementById('token_id_input').value;
    var starName = document.getElementById('star_name_input').value;
    var starStory = document.getElementById('star_story_input').value;
    var dec = document.getElementById('star_dec_input').value;
    var mag = document.getElementById('star_mag_input').value;
    var cent = document.getElementById('star_cent_input').value;

    web3.eth.getAccounts(function(error, accounts) { 
        if (error) { 
            notifyTextField.innerHTML = error;
            console.log(error)
            return
        }

        if (tokenId === "" || starName === "" || starStory === "" || dec === "" || mag  === "" || cent  === "") {
            notifyTextField.innerHTML = 'you must provide all fields to claim a star'
            console.log('You must provide all star fields to claim a star')
            return;
        }

        var account = accounts[0]

        starNotary.createStar.sendTransaction(
            tokenId, starName, starStory, dec, mag, cent, { from: account },
            function (error, result) {
                if (!error) {

                    var transactionReceipt = result;

                    console.log('transaction receipt')
                    console.log(transactionReceipt)

                    var starClaimedEvent = starNotary.Transfer()

                    starClaimedEvent.watch(function(error, result) {
                        if (!error) {
                            notifyTextField.innerHTML = 'claimed event success! ' + result.toString();
                            console.log('claimed event success ' + result)
                            //location.reload();
                        } else {
                            notifyTextField.innerHTML = 'watching for star claimed event is failing'
                            console.log('watching for star claimed event is failing');
                        }
                    });
                } else { 
                    notifyTextField.innerHTML = error;
                    console.log(error);
                }

        });
    })
}

//lookup star by token id
function searchButtonClicked() {

    var notifyTextField = document.getElementById('notifier_text')
    notifyTextField.innerHTML = "";

    var tokenId = document.getElementById('star_id_input').value;

    web3.eth.getAccounts(function(error, accounts) { 
        if (error) { 
            notifyTextField.innerHTML = error;
            console.log(error)
            return
        }

        if(tokenId === "") {
            notifyTextField.innerHTML = 'you must provide a token id to search for a star'
            console.log('you must provide a token id to claim a star ')
            return;
        }

        var account = accounts[0]

        starNotary.tokenIdToStarInfo(tokenId, { from: account },
            function(error, result) {

                if (!error) {

                    var stringArray = result.toString().split(',');
                    console.log(stringArray)

                    if (stringArray[0] === '') {
                        notifyTextField.innerHTML = 'star not found ->_<-'
                    } else {
                        notifyTextField.innerHTML = 'Star Found!'
                        notifyTextField.innerHTML += " Token ID: " + tokenId;
                        notifyTextField.innerHTML += ', Star Name: ' + stringArray[0]
                        notifyTextField.innerHTML += ', Star Stroy: ' + stringArray[1]
                        notifyTextField.innerHTML += ', Dec: ' + stringArray[2]
                        notifyTextField.innerHTML += ', Mag: ' + stringArray[3]
                        notifyTextField.innerHTML += ', Cent: ' + stringArray[4]    
                    }
                    console.log('found star success ' + result)

                } else {
                    notifyTextField.innerHTML = 'tokenId to star info failed'
                    console.log('tokenId to star info failed')
                    return;
                }
            })
    })    
}