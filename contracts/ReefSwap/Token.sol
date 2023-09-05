pragma solidity 0.7.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 initialBalance
    ) ERC20(_name, _symbol) {
        _mint(msg.sender, initialBalance);
    }
}

contract Dolphin is ERC20 {
    constructor(uint256 initialBalance) ERC20("Dolphin", "DOLPHIN") {
        _mint(msg.sender, initialBalance);
    }
}

contract Shark is ERC20 {
    constructor(uint256 initialBalance) ERC20("Shark", "SHARK") {
        _mint(msg.sender, initialBalance);
    }
}

contract Jellyfish is ERC20 {
    constructor(uint256 initialBalance) ERC20("Jellyfish", "JELLY") {
        _mint(msg.sender, initialBalance);
    }
}

contract Turtle is ERC20 {
    constructor(uint256 initialBalance) ERC20("Turtle", "TURTLE") {
        _mint(msg.sender, initialBalance);
    }
}

contract FreeMint is ERC20 {
    constructor(uint256 initialBalance) ERC20("Free mint", "FREE") {
        _mint(msg.sender, initialBalance);
    }

    function mint(address to, uint256 amount) public {
        require(amount <= 1e32, "FreeMint: Max minting amount is 1e32");
        _mint(to, amount);
    }
}
