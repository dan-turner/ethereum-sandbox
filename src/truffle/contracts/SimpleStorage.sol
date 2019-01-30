pragma solidity ^0.4.0;
pragma experimental ABIEncoderV2;

contract SimpleStorage {
    SimpleStruct storedData;

    struct SimpleStruct {
        uint number;
    }

    constructor(uint initial) public {
        storedData = SimpleStruct(initial);
    }

    function set(SimpleStruct x) public {
        storedData = x;
    }

    function get() public view returns(uint) {
        return storedData.number;
    }
}
