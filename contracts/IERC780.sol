// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC780 {
  // create or update claims
  function setClaim(
    address subject,
    bytes32 key,
    bytes32 value
  ) external;

  function setSelfClaim(bytes32 key, bytes32 value) external;

  function getClaim(
    address issuer,
    address subject,
    bytes32 key
  ) external view returns (bytes32);

  function removeClaim(
    address issuer,
    address subject,
    bytes32 key
  ) external;

  event ClaimSet(
    address indexed issuer,
    address indexed subject,
    bytes32 indexed key,
    bytes32 value,
    uint256 updatedAt
  );
  event ClaimRemoved(
    address indexed issuer,
    address indexed subject,
    bytes32 indexed key,
    uint256 removedAt
  );
}
