// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 */

/**
 * THIS IS AN EXAMPLE CONTRACT WHICH USES HARDCODED VALUES FOR CLARITY.
 * THIS EXAMPLE USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

contract LandPriceOracle is Ownable {
    using Strings for uint256;

    mapping(bytes32 => uint256) internal request2LandId;
    mapping(uint256 => uint256) public latestFulfill;
    mapping(uint256 => uint256) public price;

    event RequestPrice(bytes32 indexed requestId, uint256 indexed landId, uint256 price);

    function mockPrice(uint256 _landId, uint256 _price) public onlyOwner {
        price[_landId] = _price;
        latestFulfill[_landId] = block.timestamp;

        emit RequestPrice(0, _landId, _price);
    }
}