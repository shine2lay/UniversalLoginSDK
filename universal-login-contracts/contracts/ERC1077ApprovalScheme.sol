pragma solidity ^0.4.24;

import "./KeyHolder.sol";
import "./ERC1077.sol";

contract ERC1077ApprovalScheme is KeyHolder, ERC1077 {
    event ExecutedSigned(bytes32 signHash, uint nonce, bool success);

    uint _lastNonce;

    mapping(uint => uint8) _requiredSignatures;

    constructor(bytes32 _key) KeyHolder(_key) public {
        _requiredSignatures[uint(ExecutionType.MANAGEMENT)] = 1;
        _requiredSignatures[uint(ERC1077.ExecutionType.ACTION)] = 1;
    }

    function lastNonce() public view returns (uint) {
        return _lastNonce;
    }

    function requiredSignatures(ExecutionType executionType) public view returns (uint) {
        return _requiredSignatures[uint(executionType)];
    }

    function executeSigned(
        address to,
        uint256 value,
        bytes data,
        uint nonce,
        uint gasPrice,
        uint gasLimit,
        address gasToken,
        OperationType operationType,
        bytes32 extraHash,
        bytes messageSignatures) public
    {
        require(nonce == _lastNonce, "Invalid nonce");
        bool success = to.call.value(value)(data);
        _lastNonce++;
    }
}