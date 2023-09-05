const hre = require("hardhat");
const { getAddress } = require("./util");

async function main() {
    console.log(`\n=====> Start verification of Sqwid on ${hre.network.name} <=====`);

    // Verify SqwidERC1155
    const nftAddress = getAddress("SqwidERC1155");
    console.log("Verifying SqwidERC1155...");
    await hre.reef.verifyContract(nftAddress, "SqwidERC1155", [], {
        compilerVersion: "v0.8.4+commit.c7e474f2",
        optimization: true,
        runs: 200,
    });

    // Verify SqwidMarketplace
    const marketFee = 250; // 2.5%
    const marketplaceAddress = getAddress("SqwidMarketplace");
    console.log("Verifying SqwidMarketplace...");
    await hre.reef.verifyContract(marketplaceAddress, "SqwidMarketplace", [marketFee, nftAddress], {
        compilerVersion: "v0.8.4+commit.c7e474f2",
        optimization: true,
        runs: 200,
    });

    // Deploy SqwidMarketplaceUtil
    const marketUtilAddress = getAddress("SqwidMarketplaceUtil");
    console.log("Verifying SqwidMarketplaceUtil...");
    await hre.reef.verifyContract(marketUtilAddress, "SqwidMarketplaceUtil", [marketplaceAddress], {
        compilerVersion: "v0.8.4+commit.c7e474f2",
        optimization: true,
        runs: 200,
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
