const hre = require("hardhat");
const { addAddress, toWei, REEF_ADDRESS } = require("./util");

async function main() {
    const deployer = await hre.reef.getSignerByName("account1");
    const deployerAddress = await deployer.getAddress();
    console.log(`\n=====> Start deployment of ReefSwap on ${hre.network.name} with account ${deployer._substrateAddress} <=====`);

    // Deploy Factory
    console.log("Deploying factory...");
    const ReefswapV2Factory = await hre.reef.getContractFactory(
        "ReefswapV2Factory",
        deployer
    );
    const factoryArgs = [deployerAddress];
    const factory = await ReefswapV2Factory.deploy(...factoryArgs);
    console.log(`Factory deployed to ${factory.address}`);
    addAddress("ReefswapV2Factory", factory.address);
    if (process.env.SKIP_VERIFICATION != "true") {
        console.log("Verifying factory...");
        await hre.reef.verifyContract(
            factory.address,
            "ReefswapV2Factory",
            factoryArgs,
            { compilerVersion: "v0.5.16+commit.9c3226ce" }
        );
    }
  
    // Deploy Router
    console.log("Deploying router...");
    const ReefswapV2Router = await hre.reef.getContractFactory(
        "ReefswapV2Router02",
        deployer
    );
    const routerArgs = [factory.address, REEF_ADDRESS];
    const router = await ReefswapV2Router.deploy(...routerArgs);
    console.log(`Router deployed to ${router.address}`);
    addAddress("ReefswapV2Router02", router.address);
    if (process.env.SKIP_VERIFICATION != "true") {
        console.log("Verifying router...");
        await hre.reef.verifyContract(
            router.address,
            "ReefswapV2Router02",
            routerArgs,
            { compilerVersion: "v0.6.6+commit.6c089d02" }
        );
    }

    // Deploy tokens and create REEF pairs
    const tokenNames = ["Dolphin", "Shark", "Jellyfish", "Turtle", "FreeMint"];
    for (const tokenName of tokenNames) {
        // Create token
        console.log(`Deploying ${tokenName}...`);
        const Token = await hre.reef.getContractFactory(tokenName, deployer);
        const tokenArgs = [toWei(1e9)];
        const token = await Token.deploy(...tokenArgs);
        console.log(`${tokenName} deployed to ${token.address}`);
        addAddress(tokenName, token.address);
        if (process.env.SKIP_VERIFICATION != "true") {
            console.log(`Verifying ${tokenName}...`);
            await hre.reef.verifyContract(token.address, tokenName, tokenArgs, {
                compilerVersion: "v0.7.3+commit.9bfce1f6",
            });
        }

        // Create pair
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
