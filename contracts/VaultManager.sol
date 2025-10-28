// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title VaultManager
 * @notice Manages Bitcoin collateral and MUSD loan issuance
 * @dev Core contract for MezoBank Vaults - handles deposits, borrows, and liquidations
 */
contract VaultManager {
    // State Variables
    address public musdToken;
    address public owner;
    
    uint256 public constant MIN_COLLATERAL_RATIO = 150; // 150%
    uint256 public constant LIQUIDATION_THRESHOLD = 125; // 125%
    uint256 public constant FIXED_INTEREST_RATE = 350; // 3.5% (basis points)
    
    struct Position {
        uint256 collateral;      // BTC collateral amount
        uint256 borrowed;        // MUSD borrowed
        uint256 interestOwed;    // Interest accrued
        uint256 lastUpdate;      // Timestamp of last update
        uint256 btcPrice;        // BTC price at last update
    }
    
    mapping(address => Position) public positions;
    address[] public positionOwners;
    
    // Events
    event CollateralDeposited(address indexed user, uint256 amount);
    event CollateralWithdrawn(address indexed user, uint256 amount);
    event MUSDBorrowed(address indexed user, uint256 amount);
    event LoanRepaid(address indexed user, uint256 amount);
    event PositionLiquidated(address indexed user, address indexed liquidator);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    modifier validPosition(address user) {
        require(positions[user].collateral > 0 || positions[user].borrowed > 0, "No position");
        _;
    }
    
    // Constructor
    constructor(address _musdToken) {
        musdToken = _musdToken;
        owner = msg.sender;
    }
    
    /**
     * @notice Deposit BTC collateral
     * @param btcAmount Amount of BTC to deposit
     * @param btcPrice Current BTC price in USD
     */
    function depositCollateral(uint256 btcAmount, uint256 btcPrice) external payable {
        require(btcAmount > 0, "Amount must be > 0");
        require(btcPrice > 0, "Invalid BTC price");
        
        // In a real implementation, you'd lock actual BTC here
        // For now, we simulate with native ETH or ERC20
        
        if (positions[msg.sender].collateral == 0) {
            positionOwners.push(msg.sender);
        }
        
        positions[msg.sender].collateral += btcAmount;
        positions[msg.sender].btcPrice = btcPrice;
        positions[msg.sender].lastUpdate = block.timestamp;
        
        emit CollateralDeposited(msg.sender, btcAmount);
    }
    
    /**
     * @notice Borrow MUSD against collateral
     * @param amount Amount of MUSD to borrow
     * @param btcPrice Current BTC price
     */
    function borrowMUSD(uint256 amount, uint256 btcPrice) external {
        require(amount > 0, "Amount must be > 0");
        
        updateInterest(msg.sender, btcPrice);
        
        uint256 collateralValue = (positions[msg.sender].collateral * btcPrice) / 1e8;
        uint256 totalDebt = positions[msg.sender].borrowed + positions[msg.sender].interestOwed;
        uint256 newDebt = totalDebt + amount;
        
        // Check collateral ratio
        require(
            collateralValue * 100 >= newDebt * MIN_COLLATERAL_RATIO,
            "Insufficient collateral"
        );
        
        positions[msg.sender].borrowed += amount;
        positions[msg.sender].btcPrice = btcPrice;
        positions[msg.sender].lastUpdate = block.timestamp;
        
        // Mint MUSD (in real implementation, call MUSD contract)
        // IMUSD(musdToken).mint(msg.sender, amount);
        
        emit MUSDBorrowed(msg.sender, amount);
    }
    
    /**
     * @notice Repay MUSD loan
     * @param amount Amount to repay
     */
    function repayLoan(uint256 amount) external validPosition(msg.sender) {
        require(amount > 0, "Amount must be > 0");
        
        uint256 debt = positions[msg.sender].borrowed + positions[msg.sender].interestOwed;
        require(amount <= debt, "Amount exceeds debt");
        
        // In real implementation, burn MUSD
        // IMUSD(musdToken).burnFrom(msg.sender, amount);
        
        // Pay interest first, then principal
        if (amount >= positions[msg.sender].interestOwed) {
            amount -= positions[msg.sender].interestOwed;
            positions[msg.sender].interestOwed = 0;
            positions[msg.sender].borrowed -= amount;
        } else {
            positions[msg.sender].interestOwed -= amount;
        }
        
        positions[msg.sender].lastUpdate = block.timestamp;
        
        emit LoanRepaid(msg.sender, amount);
    }
    
    /**
     * @notice Withdraw collateral (if safe)
     * @param amount Amount to withdraw
     * @param btcPrice Current BTC price
     */
    function withdrawCollateral(uint256 amount, uint256 btcPrice) external validPosition(msg.sender) {
        require(amount > 0 && amount <= positions[msg.sender].collateral, "Invalid amount");
        
        updateInterest(msg.sender, btcPrice);
        
        uint256 remainingCollateral = positions[msg.sender].collateral - amount;
        uint256 collateralValue = (remainingCollateral * btcPrice) / 1e8;
        uint256 totalDebt = positions[msg.sender].borrowed + positions[msg.sender].interestOwed;
        
        // Ensure collateral ratio is maintained
        require(
            totalDebt == 0 || collateralValue * 100 >= totalDebt * MIN_COLLATERAL_RATIO,
            "Cannot withdraw - ratio would be too low"
        );
        
        positions[msg.sender].collateral = remainingCollateral;
        positions[msg.sender].btcPrice = btcPrice;
        positions[msg.sender].lastUpdate = block.timestamp;
        
        // In real implementation, unlock and transfer BTC
        // payable(msg.sender).transfer(amount);
        
        emit CollateralWithdrawn(msg.sender, amount);
    }
    
    /**
     * @notice Liquidate undercollateralized position
     * @param user Address of position to liquidate
     * @param btcPrice Current BTC price
     */
    function liquidatePosition(address user, uint256 btcPrice) external validPosition(user) {
        uint256 collateralValue = (positions[user].collateral * btcPrice) / 1e8;
        uint256 totalDebt = positions[user].borrowed + positions[user].interestOwed;
        
        require(
            collateralValue * 100 < totalDebt * LIQUIDATION_THRESHOLD,
            "Position is healthy"
        );
        
        // Liquidator pays debt and receives collateral
        // In real implementation:
        // 1. Liquidator repays debt in MUSD
        // 2. Liquidator receives collateral + liquidation bonus
        // 3. Owner receives liquidation penalty
        
        delete positions[user];
        
        // Remove from position owners array
        for (uint256 i = 0; i < positionOwners.length; i++) {
            if (positionOwners[i] == user) {
                positionOwners[i] = positionOwners[positionOwners.length - 1];
                positionOwners.pop();
                break;
            }
        }
        
        emit PositionLiquidated(user, msg.sender);
    }
    
    /**
     * @notice Update interest for a position
     * @param user User address
     * @param btcPrice Current BTC price
     */
    function updateInterest(address user, uint256 btcPrice) internal validPosition(user) {
        uint256 timeElapsed = block.timestamp - positions[user].lastUpdate;
        uint256 yearsElapsed = timeElapsed / 365 days;
        
        if (positions[user].borrowed > 0) {
            uint256 interest = (positions[user].borrowed * FIXED_INTEREST_RATE * yearsElapsed) / 10000;
            positions[user].interestOwed += interest;
        }
        
        positions[user].btcPrice = btcPrice;
        positions[user].lastUpdate = block.timestamp;
    }
    
    /**
     * @notice Get collateral ratio for a position
     * @param user User address
     * @param btcPrice Current BTC price
     */
    function getCollateralRatio(address user, uint256 btcPrice) external view returns (uint256) {
        if (positions[user].borrowed == 0) return type(uint256).max;
        
        uint256 collateralValue = (positions[user].collateral * btcPrice) / 1e8;
        uint256 totalDebt = positions[user].borrowed + positions[user].interestOwed;
        
        return (collateralValue * 100) / totalDebt;
    }
    
    /**
     * @notice Get user's position details
     * @param user User address
     */
    function getPosition(address user) external view returns (Position memory) {
        return positions[user];
    }
    
    /**
     * @notice Get total number of positions
     */
    function getPositionCount() external view returns (uint256) {
        return positionOwners.length;
    }
    
    // Owner functions
    function updateOwner(address newOwner) external onlyOwner {
        owner = newOwner;
    }
    
    function updateMUSDToken(address newToken) external onlyOwner {
        musdToken = newToken;
    }
}

