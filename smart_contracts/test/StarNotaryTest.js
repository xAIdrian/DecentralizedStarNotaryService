const StarNotary = artifacts.require('StarNotary')

contract('StarNotary', accounts => { 

    const REQUIRE_REVERT_ERROR_MESSAGE = "VM Exception while processing transaction: revert";

    beforeEach(async function() { 
        this.contract = await StarNotary.new({from: accounts[0]})
    })
    
    describe('can create a star', () => { 

        let user1 = accounts[0];
        
        let starId = 1;
        let starId2 = 2;

        let name = 'awesome star!';
        let story = 'star story!';
        let ra = '64';
        let dec = '14';
        let cent = '4.6';

        it('can create a star and get its star info', async function () { 
            
            await this.contract.createStar(starId, name, story, 
                ra, dec, cent, {from: user1} );

            assert.deepEqual(await this.contract.tokenIdToStarInfo(starId), 
                [name, story, ra, dec, cent]);
        })

        it('creating an existing star does not create a new star', async function () {

            await this.contract.createStar(starId, name, story, 
                ra, dec, cent, {from: user1} );
            await this.contract.createStar(starId2, name, story, 
                    ra, dec, cent, {from: user1} );    

            assert.deepEqual(await this.contract.tokenIdToStarInfo(2),
                [
                    '', '', '', '', ''
                ])    
        })
    })

    describe('check if a star exists', () => {

        let user1 = accounts[0];
        
        let starId = 1;
        let starId2 = 2;

        let name = 'awesome star!';
        let story = 'star story!';
        let ra = '64';
        let dec = '14';
        let cent = '4.6';

        beforeEach(async function() { 
            this.contract = await StarNotary.new({from: accounts[0]})
        })

        it('check if star exists if a star exists returns true', async function () {
            await this.contract.createStar(starId, name, story, 
                ra, dec, cent, {from: user1} );
            await this.contract.createStar(starId2, name, story, 
                    ra, dec, cent, {from: user1} );   

            assert(await this.contract.checkIfStarExists(starId, ra, dec, cent), true)        
        })

        it('check if star exists when a star does not exist returns false and updates mapping', async function () {
            await this.contract.createStar(starId, name, story, 
                ra, dec, cent, {from: user1} );

            assert(await this.contract.checkIfStarExists(starId2, ra, dec, cent), false)
        })
    })

    describe('buying and selling stars', () => { 

        let user1 = accounts[1]
        let user2 = accounts[2]
        
        let starId = 1
        let starPrice = web3.toWei(.01, "ether")

        beforeEach(async function () { 
            await this.contract.createStar(starId, 'awesome star!', 'star story!', 
            '68', '39', '10.0', {from: user1})    
        })

        it('user can put up their star for sale', async function () { 
    
            await this.contract.putStarUpForSale(starId, starPrice, {from: user1})
    
            assert.equal(await this.contract.ownerOf(starId), user1)
            assert.equal(await this.contract.starsForSale(starId), starPrice)
        })

        it('user that is not the star owner cannot put another star up for sale', async function () {
            
            let requireError;
            //user2 does not own starId
            try {
                await this.contract.putStarUpForSale(starId, starPrice, {from: user2})
            } catch(error) {
                requireError = error;;
            }
            assert.equal(requireError.message, REQUIRE_REVERT_ERROR_MESSAGE);
        })

        describe('user2 can buy a star that was put up for sale', () => { 

            beforeEach(async function () { 
                await this.contract.putStarUpForSale(starId, starPrice, {from: user1})
            })

            it('user2 is the owner of the star after they buy it', async function() { 
                await this.contract.buyStar(starId, {from: user2, value: starPrice, gasPrice: 0})
                assert.equal(await this.contract.ownerOf(starId), user2)
            })

            it('user2 ether balance changed correctly', async function () { 
                let overpaidAmount = web3.toWei(.05, 'ether')
                const balanceBeforeTransaction = web3.eth.getBalance(user2)

                await this.contract.buyStar(starId, {from: user2, value: overpaidAmount, gasPrice: 0})

                const balanceAfterTransaction = web3.eth.getBalance(user2)

                assert.equal(balanceBeforeTransaction.sub(balanceAfterTransaction), starPrice)
            })
        })
    })

    describe('mint star', () => { 
        //the zero-account is just a special case used to indicate that a new contract is being deployed
        let addressZero = 0x0
        let user1 = accounts[1]
        let starId = 1

        let transaction;

        it('mint successful', async function () {
            transaction = await this.contract.mint(user1, starId);

            assert.equal(await this.contract.ownerOf(starId), user1)
            assert.equal(await this.contract.balanceOf(user1), 1)
            //assert event
            assert.equal(transaction.logs[0].event, 'Transfer');
        });

        it('mint unsuccessful', async function () {
            let requireError;

            try {
                transaction = await this.contract.mint(addressZero, starId);
            } catch(error) {
                requireError = error;;
            }
            assert.equal(requireError.message, REQUIRE_REVERT_ERROR_MESSAGE);
        })
    })

    describe('approve another address to transfer the given token', () => {

        let user1 = accounts[1]
        let user2 = accounts[2]
        let starId = 1

        let transaction;

        beforeEach(async function () {
            await this.contract.mint(user1, starId);
        })

        it('send to address approved', async function () {
            transaction = await this.contract.approve(user2, starId, {from: user1})

            assert.equal(await this.contract.getApproved(starId), user2);
            assert.equal(transaction.logs[0].event, 'Approval');
        })

        it('send to address is the same as the owner', async function () {
            let requireError;

            try {
                transaction = await this.contract.approve(user1, starId, {from: user1})
            } catch(error) {
                requireError = error;;
            }
            assert.equal(requireError.message, REQUIRE_REVERT_ERROR_MESSAGE);
        })

        it('sender is not owner', async function () {
            let requireError;

            try {
                transaction = await this.contract.approve(user1, starId, {from: user2})
            } catch(error) {
                requireError = error;;
            }
            assert.equal(requireError.message, REQUIRE_REVERT_ERROR_MESSAGE);
        })
    })

    describe('get the approved address for the token id', () => {
        let user1 = accounts[1]
        let user2 = accounts[2]
        let starId = 1
        let starId2 = 2

        let transaction;

        beforeEach(async function () {
            await this.contract.mint(user1, starId);
            await this.contract.approve(user2, starId, {from:user1})
        })

        it('token has an approved owner', async function () {
            assert.equal(await this.contract.getApproved(starId), user2);
        })

        it('token does not exist', async function () {
            let requireError;

            try {
                transaction = await this.contract.getApproved(starId2)
            } catch(error) {
                requireError = error;;
            }
            assert.equal(requireError.message, REQUIRE_REVERT_ERROR_MESSAGE);
        })
    })

    describe('set or unset the approval of a given operator', () => {
        let user1 = accounts[1]
        let operatorUser = accounts[2]

        let transaction;

        it('set the approval of a given operator', async function () {
            transaction = await this.contract.setApprovalForAll(operatorUser, true, {from: user1})
            
            assert.equal(await this.contract.isApprovedForAll(user1, operatorUser), true)
            assert.equal(transaction.logs[0].event, 'ApprovalForAll');
        })

        it('operator approval cannot be given to the caller', async function () {
            let requireError;

            try {
                transaction = await this.contract.setApprovalForAll(user1, true, {from: user1})
            } catch(error) {
                requireError = error
            }
            assert.equal(requireError.message, REQUIRE_REVERT_ERROR_MESSAGE);
        })
    })

    describe('can safely transfer token', () => {
        let user1 = accounts[0]
        let user2 = accounts[1]
        let starId = 1;
    
        let transaction;
    
        beforeEach(async function () {
          await this.contract.mint(user1, starId);
          transaction = await this.contract.saferTransferFrom(user1, user2, starId, {from: user1})
        });
    
        it('token has new owner', async function () {
          assert.equal(await this.contract.ownerOf(starId), user2);
        });
    
        it('emits the correct event', async function () {
          assert.equal(transaction.logs[0].event, 'Transfer');
          //assert.equal(transaction.logs[0].args.starId, starId);
          assert.equal(transaction.logs[0].args.to, user2);
          assert.equal(transaction.logs[0].args.from, user1);
        });
      });
})