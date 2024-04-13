const assert = require('assert');
const ganache = require('ganache');
const {Web3} = require('web3');
const web3 = new Web3(ganache.provider());

const {abi, evm} = require('../compile');
const INITIAL_STRING = "Hi There !";

let accounts;
let inbox;

//for deploying to ganache , where we alredy have unlocked accounts 

beforeEach(async () => {
    // Get list of all accounts
    accounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(abi)
    .deploy({
        data: evm.bytecode.object, 
        arguments: [INITIAL_STRING] 
    })
    .send({from: accounts[0], gas: '1000000'})
});

/*
for deploying to local network or infura or test network , we will have to unlock accounts 


*/

describe('Inbox', () => {
    it('test it out', () => {
        assert.ok(inbox.options.address);
    });
    it('it has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING);
    });
    it('can change the message', async () => {
        await inbox.methods.setMessage('Bye there !').send({from: accounts[0], gas:'1000000'});
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Bye there !');
    });
})