const hre = require("hardhat");
const { addAddress } = require("./util");

async function main() {
    const deployer = await hre.reef.getSignerByName("account1");
    console.log(`\n=====> Start deployment of utils on ${hre.network.name} with account ${deployer._substrateAddress} <=====`);

    // Deploy BalanceHelper
    console.log("Deploying BalanceHelper...");
    const BalanceHelper = await hre.reef.getContractFactory("BalanceHelper", deployer);
    const balanceHelper = await BalanceHelper.deploy();
    console.log(`BalanceHelper deployed to ${balanceHelper.address}`);
    addAddress("BalanceHelper", balanceHelper.address);
    if (process.env.SKIP_VERIFICATION != "true") {
        console.log("Verifying BalanceHelper...");
        await hre.reef.verifyContract(balanceHelper.address, "BalanceHelper", [], {
            compilerVersion: "v0.8.10+commit.fc410830",
        });
    }

    // Deploy Multicall3
    console.log("Deploying Multicall...");
    const Multicall = await hre.reef.getContractFactory("Multicall3", deployer);
    const multicall = await Multicall.deploy();
    console.log(`Multicall deployed to ${multicall.address}`);
    addAddress("Multicall3", multicall.address);
    if (process.env.SKIP_VERIFICATION != "true") {
        console.log("Verifying Multicall...");
        await hre.reef.verifyContract(multicall.address, "Multicall3", [], {
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
