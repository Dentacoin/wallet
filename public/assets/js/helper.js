const Web3 = require("../../../node_modules/web3"); // import web3 v1.0 constructor

// use globally injected web3 to find the currentProvider and wrap with web3 v1.0
const getWeb3 = (provider) => {
    if(provider === undefined)  {
        provider = null;
    }
    const myWeb3 = new Web3(provider);
    return myWeb3;
};

// assumes passed-in web3 is v1.0 and creates a function to receive contract name
const getContractInstance = (web3) => (contractName, address) => {
    const instance = new web3.eth.Contract(contractName.abi, address);
    return instance;
};

module.exports = {getWeb3, getContractInstance};