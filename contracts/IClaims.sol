// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IClaims {
  // create or update claims
  function setClaim(
    uint256 tokenId,
    address issuer,
    bytes32 key,
    bytes32 value
  ) external;

  function setSelfClaim(
    uint256 tokenId,
    bytes32 key,
    bytes32 value
  ) external;

  function getClaim(
    uint256 tokenId,
    address issuer,
    bytes32 key
  ) external view returns (bytes32);

  function removeClaim(
    uint256 tokenId,
    address issuer,
    bytes32 key
  ) external;

  event ClaimSet(
    address indexed issuer,
    uint256 indexed tokenId,
    bytes32 indexed key,
    bytes32 value,
    uint256 updatedAt
  );
  event ClaimRemoved(
    address indexed issuer,
    uint256 indexed tokenId,
    bytes32 indexed key,
    uint256 removedAt
  );
}
