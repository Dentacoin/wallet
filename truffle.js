const fullPathBuildDirectory = `${__dirname}/public/assets/jsons`;
module.exports = {
    contracts_build_directory: fullPathBuildDirectory,
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*",
            from: "0x1984afef258aa360a3a29c4d528c79dc9b05d073"
        },
        rinkeby: {
            host: "localhost", // Connect to geth on the specified
            port: 8545,
            from: "0x80481B5E38AF5A8d516c76f9146DE5FEb5781449", // default address to use for any transaction Truffle makes during migrations
            network_id: 4,
            gas: 4000000 // Gas limit used for deploys
        }
    }
};