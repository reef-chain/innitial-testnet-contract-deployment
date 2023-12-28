const hre = require("hardhat");
const { getAddress } = require("./util");

async function main() {
    console.log(`\n=====> Start verification of utils on ${hre.network.name} <=====`);

    // Verify BalanceHelper
    const balanceHelperAddress = getAddress("BalanceHelper");
    console.log("Verifying BalanceHelper...");
    await hre.reef.verifyContract(balanceHelperAddress, "BalanceHelper", [], {
        compilerVersion: "v0.8.10+commit.fc410830",
        optimization: true,
        runs: 999999,
    });

    // Verify Multicall3
    const multicallAddress = getAddress("Multicall3");
    console.log("Verifying Multicall...");
    await hre.reef.verifyContract(multicallAddress, "Multicall3", [], {
        compilerVersion: "v0.8.10+commit.fc410830",
        optimization: true,
        runs: 999999,
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
