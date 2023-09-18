const hre = require("hardhat");
const { getAddress, REEF_ADDRESS } = require("./util");

async function main() {
    const deployer = await hre.reef.getSignerByName("account1");
    console.log(`\n=====> Start creation of ReefSwap pools on ${hre.network.name} with account ${deployer._substrateAddress} <=====`);

    const factoryAddress = getAddress("ReefswapV2Factory");
    const factory = await hre.reef.getContractAt("ReefswapV2Factory", factoryAddress, deployer);

    const tokenNames = ["Dolphin", "Shark", "Jellyfish", "Turtle", "FreeMint"];
    for (const tokenName of tokenNames) {
        const tokenAddress = getAddress(tokenName);
        const token = await hre.reef.getContractAt(tokenName, tokenAddress, deployer);
        const tx = await factory.createPair(REEF_ADDRESS, token.address);
        const receipt = await tx.wait();
        console.log(`REEF-${tokenName} pair created at ${receipt.logs[0].address}`);
    };
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
