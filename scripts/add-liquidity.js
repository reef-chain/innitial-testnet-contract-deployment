const hre = require("hardhat");
const { getAddress, REEF_ADDRESS } = require("./util");

const otherTokenName = "Shark";

async function main() {
    const account = await hre.reef.getSignerByName("account1");
    console.log(`\n=====> Start add liquidity to ReefSwap pool on ${hre.network.name} with account ${account._substrateAddress} <=====`);

    const accountAddress = await account.getAddress();

    const routerAddress = getAddress("ReefswapV2Router02");
    const router = await hre.reef.getContractAt("ReefswapV2Router02", routerAddress, account);

    const reefToken = await hre.reef.getContractAt("Token", REEF_ADDRESS, account);

    const otherTokenAddress = getAddress(otherTokenName);
    const otherToken = await hre.reef.getContractAt(otherTokenName, otherTokenAddress, account);

    const amount1 = ethers.utils.parseEther("100");
    const amount2 = ethers.utils.parseEther("100");

    await reefToken.approve(router.address, amount1);
    await otherToken.approve(router.address, amount2);

    const reefBalBefore = await reefToken.balanceOf(accountAddress);
    const otherBalBefore = await otherToken.balanceOf(accountAddress);
    console.log(`REEF balance before: ${reefBalBefore.toString()}`);
    console.log(`${otherTokenName} balance before: ${otherBalBefore.toString()}`);

    const tx = await router.addLiquidity(
        REEF_ADDRESS,
        otherTokenAddress,
        amount1,
        amount2,
        0,
        0,
        accountAddress,
        10000000000
      );
    const receipt = await tx.wait();
    console.log(receipt.events);

    const reefBalAfter = await reefToken.balanceOf(accountAddress);
    const otherBalAfter = await otherToken.balanceOf(accountAddress);
    console.log(`REEF balance after: ${reefBalAfter.toString()}`);
    console.log(`${otherTokenName} balance after: ${otherBalAfter.toString()}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
