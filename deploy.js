const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require('fs')
const infuraUrl = 'https://rinkeby.infura.io/v3/15c1d32581894b88a92d8d9e519e476c';
const mnemonic = 'alien fiber miss spike six rail online young attend magnet baby logic';
const Web3 = require("web3");
const provider = new HDWalletProvider(mnemonic, infuraUrl);
const web3 = new Web3(provider);
const altAbiString = fs.readFileSync('./bin/ethereum/contracts/SimpleMintContract.abi')
const altAbi = JSON.parse(altAbiString)
console.log(altAbi)
const json = require("./bin/ethereum/contracts/SimpleMintContract.json");
const abi = altAbi
const bytecodeBuffer = fs.readFileSync('./bin/ethereum/contracts/SimpleMintContract.bin')//compilerOutput.evm.bytecode.object;
const bytecode = bytecodeBuffer.toString()

async function deploy() {
  const accounts = await web3.eth.getAccounts();
  console.log("deploying from", accounts[0]);
  const contract = await new web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
    })
    .send({
      from: accounts[0],
      gas: "5000000",
    });
  provider.engine.stop();
  console.log("deployed to", contract.options.address);
}

deploy();