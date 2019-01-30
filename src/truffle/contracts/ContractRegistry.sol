pragma solidity ^0.4.21;

contract ContractRegistry {
    address public owner;
    mapping (bytes32 => address) public contracts;

    constructor(address _owner) public {
        owner = _owner;
    }

    function set(bytes32 node, address instance) mustOwn public {
        contracts[node] = instance;
    }

    function get(bytes32 node) public view returns(address) {
        return contracts[node];
    }

    modifier mustOwn {
        require(msg.sender == owner);
        _;
    }
}
