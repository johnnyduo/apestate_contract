import { ethers } from "hardhat";

const CHAINLINK_TOKEN = "0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06"
const CHAINLINK_ORACLE = "0xCC79157eb46F5624204f47AB42b3906cAA40eaB7"

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function main() {
  const usdc = await ethers.deployContract("FakeUSDC", { gasLimit: 10000000 });
  await usdc.waitForDeployment();

  console.log("FakeUSDC", await usdc.getAddress())

  await wait(3000)

  const oracle = await ethers.deployContract("LandPriceOracle", { gasLimit: 10000000 });
  await oracle.waitForDeployment();

  console.log("LandPriceOracle", await oracle.getAddress())

  await wait(3000)
  
  const exchange = await ethers.deployContract("LandPriceExchange", [
    await oracle.getAddress(),
    await usdc.getAddress(),
  ], { gasLimit: 10000000 });
  await exchange.waitForDeployment();

  console.log("LandPriceExchange", await exchange.getAddress())

  await wait(3000)

  await (await oracle.mockPrice(1, ethers.parseEther("5000"), { gasLimit: 1000000 })).wait()
  await wait(3000)

  await (await oracle.mockPrice(2, ethers.parseEther("15000"), { gasLimit: 1000000 })).wait()
  await wait(3000)

  await (await oracle.mockPrice(3, ethers.parseEther("1500"), { gasLimit: 1000000 })).wait()
  await wait(3000)

  await (await oracle.mockPrice(4, ethers.parseEther("2400"), { gasLimit: 1000000 })).wait()
  await wait(3000)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
