var DCNWallet = artifacts.require("./DCNWallet.sol");

module.exports = function(deployer) {
    //deploying contract with 100 ether balance
    //deployer.deploy(Ballot, {value : 100});
    deployer.deploy(DCNWallet);
};