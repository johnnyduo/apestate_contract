import { ethers } from "hardhat";

const CHAINLINK_TOKEN = "0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06"
const CHAINLINK_ORACLE = "0xCC79157eb46F5624204f47AB42b3906cAA40eaB7"

async function main() {
  const usdc = await ethers.deployContract("FakeUSDC");
  await usdc.waitForDeployment();

  console.log("FakeUSDC", await usdc.getAddress())

  const oracle = await ethers.deployContract("LandPriceOracle");
  await oracle.waitForDeployment();

  console.log("LandPriceOracle", await oracle.getAddress())
  
  const exchange = await ethers.deployContract("LandPriceExchange", [
    await oracle.getAddress(),
    await usdc.getAddress(),
  ]);
  await exchange.waitForDeployment();

  console.log("LandPriceExchange", await exchange.getAddress())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
