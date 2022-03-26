require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  process.env.PNEUMONIC,
  process.env.TEST_NETWORK
  

); 
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
    })
    .send({
      gas: 1000000,
      from: accounts[0],
    });

  console.log(interface);
  console.log("Contract is deployed to", result.options.address);  //contract address
};
deploy();

/*import Web3 from './web3';

//window.ethereum.request({method:"eth_requestAccounts"});
//const web3 = new Web3(Window.ehthereum);
const web3 = new Web3(window.web3.currentProvider);

export default web3;*/
