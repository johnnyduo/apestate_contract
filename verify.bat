call npx hardhat verify %1 --network bsc_testnet
call npx hardhat verify %2 0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06 0xCC79157eb46F5624204f47AB42b3906cAA40eaB7 --network bsc_testnet
call npx hardhat verify %3 %2 %1 --network bsc_testnet