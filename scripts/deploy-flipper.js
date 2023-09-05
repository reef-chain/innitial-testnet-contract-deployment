const hre = require("hardhat");
const { addAddress } = require("./util");

async function main() {
    const deployer = await hre.reef.getSignerByName("account1");
    console.log(`\n=====> Start deployment of Flipper on ${hre.network.name} with account ${deployer._substrateAddress} <=====`);

    // Deploy Flipper
    console.log("Deploying Flipper...");
    const Flipper = await hre.reef.getContractFactory("Flipper", deployer);
    const flipper = await Flipper.deploy();
    console.log(`Flipper deployed to ${flipper.address}`);
    addAddress("Flipper", flipper.address);
    if (process.env.SKIP_VERIFICATION != "true") {
        console.log("Verifying Flipper...");
        await hre.reef.verifyContract(flipper.address, "Flipper", [], {
            compilerVersion: "v0.8.10+commit.fc410830",
        });
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
