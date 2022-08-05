// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IClaims.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

enum Sex {
  Male,
  Female
}

struct Dog {
  string name;
  uint256 dob;
  bytes32 microchip;
  uint256 dam;
  uint256 sire;
  Sex sex;
  uint256 timestamp;
  address owner;
}

contract DogERC721 is ERC721, IClaims, Ownable {
  mapping(address => bool) private _writers;
  mapping(bytes32 => Dog) private _dogs;

  Dog[] public pack;
  mapping(uint256 => mapping(address => mapping(bytes32 => bytes32)))
    public registry;

  string private _name;
  string private _symbol;
  mapping(uint256 => string) private _tokenURIs;
  uint256 private _count;

  bytes4 private constant _INTERFACE_ID_ERC721_METADATA = 0x5b5e139f;

  constructor() ERC721("BEAGLES", "DD") {
    //_name = "BEAGLES";
    //_symbol = "DD";
    // register the supported interfaces to conform to ERC721 via ERC165
    // _registerInterface(_INTERFACE_ID_ERC721_METADATA);
  }

  function count() public view returns (uint256) {
    return _count;
  }

  function addLitter(
    uint256 dob,
    uint256 dam,
    uint256 sire,
    uint256 males,
    uint256 females,
    address owner
  ) external onlyOwner {
    for (uint256 i = 0; i < males; i++) {
      _addPuppy("", dob, 0x00, Sex.Male, dam, sire, owner);
    }

    for (uint256 i = 0; i < females; i++) {
      _addPuppy("", dob, 0x00, Sex.Female, dam, sire, owner);
    }
  }

  function addOwnPuppy(
    string calldata name,
    uint256 dob,
    bytes32 microchip,
    Sex sex,
    uint256 dam,
    uint256 sire
  ) external onlyOwner {
    _addPuppy(name, dob, microchip, sex, dam, sire, msg.sender);
  }

  function addPuppy(
    string calldata name,
    uint256 dob,
    bytes32 microchip,
    Sex sex,
    uint256 dam,
    uint256 sire,
    address owner
  ) external onlyOwner {
    _addPuppy(name, dob, microchip, sex, dam, sire, owner);
  }

  function _addPuppy(
    string memory name,
    uint256 dob,
    bytes32 microchip,
    Sex sex,
    uint256 dam,
    uint256 sire,
    address owner
  ) internal {
    uint256 id = pack.length;
    pack.push(
      Dog(name, dob, microchip, dam, sire, sex, block.timestamp, owner)
    );

    _count += 1;
    _safeMint(owner, id);

    emit Transfer(owner, owner, id);
    emit PuppyAdded(id);
  }

  function getPuppy(uint256 tokenId)
    external
    view
    returns (
      string memory,
      uint256,
      Sex,
      uint256,
      uint256
    )
  {
    return (
      pack[tokenId].name,
      pack[tokenId].dob,
      pack[tokenId].sex,
      pack[tokenId].dam,
      pack[tokenId].sire
    );
  }

  function removePuppy(uint256 tokenId) external onlyOwner {
    delete pack[tokenId];
    _count -= 1;
    emit PuppyRemoved(tokenId);
  }

  function updateDam(uint256 tokenId, uint256 dam)
    external
    onlyDogOwner(tokenId)
  {
    pack[tokenId].dam = dam;
  }

  function updateSire(uint256 tokenId, uint256 sire)
    external
    onlyDogOwner(tokenId)
  {
    pack[tokenId].sire = sire;
  }

  function updateTitle(uint256 tokenId, string calldata name)
    external
    onlyOwner
  {
    pack[tokenId].name = name;
  }

  function updateMicrochip(uint256 tokenId, bytes32 microchip)
    external
    onlyOwner
  {
    pack[tokenId].microchip = microchip;
    _setClaim(tokenId, msg.sender, "MICROCHIP_NO", microchip);
  }

  // create or update claims
  function setClaim(
    uint256 tokenId,
    address issuer,
    bytes32 key,
    bytes32 value
  ) external override onlyOwner {
    _setClaim(tokenId, issuer, key, value);
  }

  function setSelfClaim(
    uint256 tokenId,
    bytes32 key,
    bytes32 value
  ) external override onlyDogOwner(tokenId) {
    _setClaim(tokenId, msg.sender, key, value);
  }

  function getClaim(
    uint256 tokenId,
    address issuer,
    bytes32 key
  ) external view override returns (bytes32) {
    return registry[tokenId][issuer][key];
  }

  function removeClaim(
    uint256 tokenId,
    address issuer,
    bytes32 key
  ) external override {
    require(msg.sender == issuer, "Only issuer");
    delete registry[tokenId][issuer][key];
    emit ClaimRemoved(msg.sender, tokenId, key, block.timestamp);
  }

  function _setClaim(
    uint256 tokenId,
    address issuer,
    bytes32 key,
    bytes32 value
  ) private {
    registry[tokenId][issuer][key] = value;
    emit ClaimSet(msg.sender, tokenId, key, value, block.timestamp);
  }

  event PuppyAdded(uint256 tokenId);
  event PuppyRemoved(uint256 tokenId);

  modifier onlyDogOwner(uint256 tokenId) {
    require(
      pack[tokenId].owner == msg.sender,
      "Only puppy owner can perform this function"
    );
    _;
  }
}
