const express = require('express');
const app = express();
const cors = require('cors');
const port = 3052;
const ethers = require('ethers');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const provider = new ethers.providers.StaticJsonRpcProvider(process.env.ALCHEMY_MAINNET_URL);

// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

//Enter eth address and get balance
app.get('/balance/:address', async (req, res) => {
    const { address } = req.params;
    const balance = await provider.getBalance(address);
    console.log("Balance is: " + ethers.utils.formatEther(balance));
    res.send({ balance });
});

//could be /block/:number
app.get('/block/', async (req, res) => {
    const latestBlock = await provider.getBlock('latest');
    lastBlock = latestBlock.number;
    // console.log(lastBlock);
    res.send({ latestBlock });
});


app.get('/blockchain/', async (req, res) => {
    const lastBlock = await provider.getBlock('latest');
    endBlock = lastBlock.number;
    console.log("this is the end block: " + endBlock)
    let blockArray = [];
    blockArray.push(endBlock);

    if (endBlock != 0) {
        for (i = 0; i < 10; i++) {
            endBlock = endBlock - 1;
            blockArray.push(endBlock);
        };

        console.log(blockArray);
    }
    let blockResponse = [];

    if (blockArray != 0) {
    for (i=0; i < blockArray.length; i++) {
        const blockRes = await provider.getBlock(blockArray[i]);
        console.log(blockRes);
        blockResponse.push(blockRes);
    }}
    // console.log(blockResponse);

    res.send({ blockResponse });
});


// app.post('/send', (req, res) => {
//   const {sender, recipient, amount} = req.body;
//   balances[sender] -= amount;
//   balances[recipient] = (balances[recipient] || 0) + +amount;
//   res.send({ balance: balances[sender] });
// });

// const mainURL = process.env.INFURA_MAINNET;
// const provider = new ethers.providers.JsonRpcProvider(mainURL);

// const main = async () => {
//     const block = await provider.getBlockNumber()
//     console.log("block Number:" + block); 
//     const blockInfo = await provider.getBlock(block)
//     console.log(blockInfo)
// }
// main()

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});