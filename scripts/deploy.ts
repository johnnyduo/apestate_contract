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

  await (await oracle.mockPrice(1, ethers.parseEther("4000"), { gasLimit: 1000000 })).wait()
  await wait(3000)

  await (await oracle.mockPrice(2, ethers.parseEther("3000"), { gasLimit: 1000000 })).wait()
  await wait(3000)

  await (await oracle.mockPrice(3, ethers.parseEther("2200"), { gasLimit: 1000000 })).wait()
  await wait(3000)

  await (await oracle.mockPrice(4, ethers.parseEther("1600"), { gasLimit: 1000000 })).wait()
  await wait(3000)

  await (await oracle.mockPrice(5, ethers.parseEther("1400"), { gasLimit: 1000000 })).wait()
  await wait(3000)

  await (await oracle.mockPrice(6, ethers.parseEther("1200"), { gasLimit: 1000000 })).wait()
  await wait(3000)

  await (await oracle.mockPrice(7, ethers.parseEther("1800"), { gasLimit: 1000000 })).wait()
  await wait(3000)

  await (await oracle.mockPrice(8, ethers.parseEther("1000"), { gasLimit: 1000000 })).wait()
  await wait(3000)

  await (await oracle.mockPrice(9, ethers.parseEther("800"), { gasLimit: 1000000 })).wait()
  await wait(3000)

  await (await oracle.mockPrice(10, ethers.parseEther("700"), { gasLimit: 1000000 })).wait()
  await wait(3000)

  await (await oracle.mockPrice(11, ethers.parseEther("600"), { gasLimit: 1000000 })).wait()
  await wait(3000)

  await (await oracle.mockPrice(12, ethers.parseEther("500"), { gasLimit: 1000000 })).wait()
  await wait(3000)

  await (await oracle.mockPrice(13, ethers.parseEther("400"), { gasLimit: 1000000 })).wait()
  await wait(3000)

  await (await oracle.mockPrice(14, ethers.parseEther("200"), { gasLimit: 1000000 })).wait()
  await wait(3000)

  await (await oracle.mockPrice(15, ethers.parseEther("1100"), { gasLimit: 1000000 })).wait()
  await wait(3000)

  await (await oracle.mockPrice(16, ethers.parseEther("600"), { gasLimit: 1000000 })).wait()
  await wait(3000)

  await (await oracle.mockPrice(17, ethers.parseEther("500"), { gasLimit: 1000000 })).wait()
  await wait(3000)

  await (await oracle.mockPrice(18, ethers.parseEther("1300"), { gasLimit: 1000000 })).wait()
  await wait(3000)

  await (await oracle.mockPrice(19, ethers.parseEther("800"), { gasLimit: 1000000 })).wait()
  await wait(3000)

  await (await oracle.mockPrice(20, ethers.parseEther("900"), { gasLimit: 1000000 })).wait()
  await wait(3000)

  await (await oracle.mockPrice(21, ethers.parseEther("1000"), { gasLimit: 1000000 })).wait()
  await wait(3000)

  await (await oracle.mockPrice(22, ethers.parseEther("300"), { gasLimit: 1000000 })).wait()
  await wait(3000)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
