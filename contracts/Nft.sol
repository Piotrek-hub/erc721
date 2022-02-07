// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    event minted(string URI);

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256 public counter = 0;

    constructor() ERC721("NFT", "NFT") {}

    function mintNft(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        counter += 1;

        emit minted(tokenURI);

        return newItemId;
    }

    function supply() public view returns (uint256) {
        return counter;
    }
}
