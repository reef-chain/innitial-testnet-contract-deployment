const hre = require("hardhat");
const { addAddress } = require("./util");

async function main() {
    const deployer = await hre.reef.getSignerByName("account1");
    console.log(`\n=====> Start deployment of Sqwid on ${hre.network.name} with account ${deployer._substrateAddress} <=====`);

    // Deploy SqwidERC1155
    console.log("Deploying SqwidERC1155...");
    const NFT = await hre.reef.getContractFactory("SqwidERC1155", deployer);
    const nft = await NFT.deploy();
    console.log(`SqwidERC1155 deployed to ${nft.address}`);
    addAddress("SqwidERC1155", nft.address);
    if (process.env.SKIP_VERIFICATION != "true") {
        console.log("Verifying SqwidERC1155...");
        await hre.reef.verifyContract(nft.address, "SqwidERC1155", [], {
            compilerVersion: "v0.8.4+commit.c7e474f2",
            optimization: true,
            runs: 200,
        });
    }

    // Deploy SqwidMarketplace
    console.log("Deploying SqwidMarketplace...");
    const Marketplace = await hre.reef.getContractFactory("SqwidMarketplace", deployer);
    const marketFee = 250; // 2.5%
    const marketplace = await Marketplace.deploy(marketFee, nft.address);
    console.log(`SqwidMarketplace deployed in ${marketplace.address}`);
    addAddress("SqwidMarketplace", marketplace.address);
    if (process.env.SKIP_VERIFICATION != "true") {
        console.log("Verifying SqwidMarketplace...");
        await hre.reef.verifyContract(marketplace.address, "SqwidMarketplace", [marketFee, nft.address], {
            compilerVersion: "v0.8.4+commit.c7e474f2",
            optimization: true,
            runs: 200,
        });
    }

    // Deploy SqwidMarketplaceUtil
    console.log("Deploying SqwidMarketplaceUtil...");
    const MarketUtil = await hre.reef.getContractFactory("SqwidMarketplaceUtil", deployer);
    const marketUtil = await MarketUtil.deploy(marketplace.address);
    console.log(`SqwidMarketplaceUtil deployed in ${marketUtil.address}`);
    addAddress("SqwidMarketplaceUtil", marketUtil.address);
    if (process.env.SKIP_VERIFICATION != "true") {
        console.log("Verifying SqwidMarketplaceUtil...");
        await hre.reef.verifyContract(marketUtil.address, "SqwidMarketplaceUtil", [marketplace.address], {
            compilerVersion: "v0.8.4+commit.c7e474f2",
            optimization: true,
            runs: 200,
        });
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
