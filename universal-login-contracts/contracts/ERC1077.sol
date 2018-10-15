pragma solidity ^0.4.24;


contract ERC1077 {
    enum ExecutionType {MANAGEMENT, ACTION}
    enum OperationType {CALL, DELEGATECALL, CREATE}

    event ExecutedSigned(bytes32 signHash, uint nonce, bool success);

    function lastNonce() public view returns (uint nonce);

    function requiredSignatures(ExecutionType executionType) public view returns (uint);

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
        bytes messageSignatures) public;
}
