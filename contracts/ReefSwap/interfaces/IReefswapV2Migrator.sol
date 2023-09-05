pragma solidity >=0.5.0 <0.6.0;

interface IReefswapV2Migrator {
    function migrate(
        address token,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external;
}