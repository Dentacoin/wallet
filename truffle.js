const fullPathBuildDirectory = `${__dirname}/public/assets/jsons`;
module.exports = {
    contracts_build_directory: fullPathBuildDirectory,
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: 3250
        }
    }
};