const hre = require("hardhat");
const { getAddress } = require("./util");

async function main() {
    console.log(`\n=====> Start verification of Flipper on ${hre.network.name} <=====`);

    const flipperAddress = getAddress("Flipper");
    console.log("Verifying Flipper...");
    await hre.reef.verifyContract(flipperAddress, "Flipper", [], {
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
