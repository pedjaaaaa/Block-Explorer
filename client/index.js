import "./index.scss";
import axios from 'axios';
import { BlockHash } from "./dist/index.882e008e";
const ethers = require('ethers');

const server = "http://localhost:3052";

document.getElementById("public-address").addEventListener('input', async ({ target: {value} }) => {
  if(value === "") {
    document.getElementById("balance").innerHTML = 0;
    return;
  }

  const response = await axios.get(`${server}/balance/${value}`)
  let balance = ethers.utils.formatEther(response.data.balance.hex);
  console.log(balance);
  document.getElementById("balance").innerHTML = balance;
});

window.addEventListener('load', async () => {
  const response = await axios.get(`${server}/block/`);
    
  const latestBlock = response.data.latestBlock;
  console.log(latestBlock);

  let html = "";

  html += "<p> Latest Block Number: " + latestBlock.number + "<p>"
  + "<p> Latest Block Hash: " + latestBlock.hash + "<p>"
  + "<p> Previous Block Hash: " + latestBlock.parentHash + "<p>"
  + "<p> Latest Block Miner: " + latestBlock.miner + "<p>"
  + "<p> Timestamp: " + latestBlock.timestamp + "<p>"
  + "<p> Gas Limit: " + latestBlock.gasLimit.hex + "<p>"
  + "<p> Gas Used: " + latestBlock.gasUsed.hex + "<p>"
  +"<p> Latest Block Difficulty: " + latestBlock._difficulty.hex + "<p>";

  document.getElementById("block-information").innerHTML = html;
});


window.addEventListener('load', async () => {
    const response = await axios.get(`${server}/blockchain/`);
    const blockResponse = response.data.blockResponse;
    console.log(blockResponse);
    let myTable = document.querySelector('#last-blocks')

    let headers = ['Number', 'Hash', 'Timestamp', 'Gas Used', 'Gas Limit', 'Num Txns', 'Miner Address'];

    let table = document.createElement('table');
    let headerRow = document.createElement('tr');

    headers.forEach(headerText => {
        let header = document.createElement('th');
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });

    table.appendChild(headerRow);

    blockResponse.forEach(blk => {
        let row = document.createElement('tr');

        Object.values(blk).forEach(text => {
            let cell = document.createElement('td');
            let textNode = document.createTextNode(text);
            cell.appendChild(textNode);
            row.appendChild(cell);
        })

        table.appendChild(row);
    });
    myTable.appendChild(table);

});