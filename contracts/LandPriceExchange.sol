// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./LandPriceOracle.sol";

uint256 constant PRICE_EXPIRATION = 3600;
uint256 constant BUY_FEE = 30;
uint256 constant BORROW_INTEREST = 100;
uint256 constant BORROW_RATIO = 8000;

// Assume we have unlimited liquidity
contract LandPriceExchange is ERC1155("") {
  LandPriceOracle public immutable oracle;
  IERC20 public immutable baseAsset;

  struct BorrowPosition {
    address borrower;
    uint256 landId;
    uint256 asset;
    uint256 share;
  }

  BorrowPosition[] public borrowPositions;

  constructor(LandPriceOracle _oracle, IERC20 _baseAsset) {
    oracle = _oracle;
    baseAsset = _baseAsset;
  }

  // TODO: How to do BAND Protocol???
  function THBUSD() public view returns(uint256) {
    return 0.028 ether;
  }

  function priceExpiration(uint256 landId) public view returns(uint256) {
    return oracle.latestFulfill(landId) + PRICE_EXPIRATION;
  }

  function isPriceExpired(uint256 landId) public view returns(bool) {
    return block.timestamp > priceExpiration(landId);
  }

  function price(uint256 landId) public view returns(uint256) {
    require(!isPriceExpired(landId), "Price Expired");
    return oracle.price(landId);
  }

  event Buy(address indexed buyer, uint256 indexed landId, uint256 baseAmount, uint256 landShare);
  function buy(uint256 landId, uint256 baseAmount) public {
    uint256 landPrice = price(landId) * THBUSD() / 1 ether;
    uint256 landShare = baseAmount * 1 ether / landPrice;

    // Apply fee
    landShare = landShare * (10000 - BUY_FEE) / 10000;

    _mint(msg.sender, landId, landShare, "");
    baseAsset.transferFrom(msg.sender, address(this), baseAmount);

    emit Buy(msg.sender, landId, baseAmount, landShare);
  }

  event Sell(address indexed buyer, uint256 indexed landId, uint256 baseAmount, uint256 landShare);
  function sell(uint256 landId, uint256 landShare) public {
    uint256 landPrice = price(landId) * THBUSD() / 1 ether;
    uint256 baseAmount = landShare * landPrice / 1 ether;

    // Apply fee
    baseAmount = baseAmount * (10000 - BUY_FEE) / 10000;

    _burn(msg.sender, landId, landShare);
    baseAsset.transfer(msg.sender, baseAmount);

    emit Sell(msg.sender, landId, baseAmount, landShare);
  }

  event Borrow(address indexed buyer, uint256 indexed landId, uint256 indexed borrowId, uint256 baseAmount, uint256 borrowAmount);
  function borrow(uint256 landId, uint256 baseAmount, uint256 borrowAmount) public returns(uint256 borrowId) {
    uint256 landPrice = price(landId) * THBUSD() / 1 ether;
    uint256 landShare = baseAmount * 1 ether / landPrice;

    require(borrowAmount <= landShare * BORROW_RATIO / 10000, "Over borrow ratio");

    _mint(msg.sender, landId, borrowAmount, "");
    baseAsset.transferFrom(msg.sender, address(this), baseAmount);

    borrowId = borrowPositions.length;

    borrowPositions.push(
      BorrowPosition({
        borrower: msg.sender,
        landId: landId,
        asset: baseAmount,
        share: borrowAmount
      })
    );

    emit Borrow(msg.sender, landId, borrowId, baseAmount, borrowAmount);
  }

  function borrowAndSell(uint256 landId, uint256 baseAmount, uint256 borrowAmount) public returns(uint256 borrowId) {
    borrowId = borrow(landId, baseAmount, borrowAmount);
    sell(landId, borrowAmount);
  }

  function redeem(uint256 borrowId) public {
    BorrowPosition memory position = borrowPositions[borrowId];

    require(msg.sender == position.borrower, "Not Borrower");

    _burn(msg.sender, position.landId, position.share);
    baseAsset.transfer(msg.sender, position.asset - position.asset * BORROW_INTEREST / 10000);
  }
}