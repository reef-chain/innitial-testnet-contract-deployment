const hre = require("hardhat");
const { getAddress, toWei } = require("./util");

async function main() {
    const deployer = await hre.reef.getSignerByName("account1");
    const deployerAddress = await deployer.getAddress();
    console.log(`\n=====> Start verification of ReefSwap on ${hre.network.name} <=====`);

    // Verify Factory
    const factoryArgs = [deployerAddress];
    const factoryAddress = getAddress("ReefswapV2Factory");
    console.log("Verifying factory...");
    await hre.reef.verifyContract(
      factoryAddress,
      "ReefswapV2Factory",
      factoryArgs,
      { compilerVersion: "v0.5.16+commit.9c3226ce" }
    );
  
    // Verify Router
    const routerArgs = [factoryAddress, REEF_ADDRESS];
    const routerAddress = getAddress("ReefswapV2Router02");
    console.log("Verifying router...");
    await hre.reef.verifyContract(
      routerAddress,
      "ReefswapV2Router02",
      routerArgs,
      { compilerVersion: "v0.6.6+commit.6c089d02" }
    );

    // Verify tokens
    const tokenNames = ["Dolphin", "Shark", "Jellyfish", "Turtle", "FreeMint"];
    for (const tokenName of tokenNames) {
        const tokenArgs = [toWei(1e9)];
        const tokenAddress = getAddress(tokenName);
        console.log(`Verifying ${tokenName}...`);
        await hre.reef.verifyContract(tokenAddress, tokenName, tokenArgs, {
            compilerVersion: "v0.7.3+commit.9bfce1f6",
        });
    };
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
