const Web3 = require('web3');

const web3 = new Web3('https://polygon-rpc.com');


async function issueNFT(recipients,itemIds){


    const privateKey = '' //private key placeholder

    const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);

    web3.eth.accounts.wallet.add(account);

    web3.eth.defaultAccount = account.address;

    const nftAbi = require('./abi.json');

    const nftAddr = '0x7c9fe6d2493f13b0705758c6990de59f09d10f42';

    const nftInstance = new web3.eth.Contract(nftAbi,  nftAddr);

    const gasPrice = await web3.eth.getGasPrice();

    const gasEstimate = await nftInstance.methods.issueTokens(recipients,itemIds).estimateGas({ from: account.address });
    
    console.log("gas price:",gasPrice);
    

    result = await nftInstance.methods.issueTokens(recipients,itemIds).send({
        from:account.address,
        gasPrice:gasPrice, 
        gas:gasEstimate,
      });

    console.log(`issueTokens result:${JSON.stringify(result)}`)

}


//demo 

const recipients = ['0x7C9FE6d2493f13b0705758c6990De59F09D10F42']

const itemIds = [1]

issueNFT(recipients,itemIds)
