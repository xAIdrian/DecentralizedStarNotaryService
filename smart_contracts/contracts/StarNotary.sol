pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract StarNotary is ERC721 { 

    struct Star { 
        string name; 
        string story;

        string dec;
        string mag;
        string cent;

    }

    mapping(uint256 => Star) public tokenIdToStarInfo; 
    mapping(uint256 => uint256) public starsForSale;
    mapping(bytes32 => uint256) public coordsToTokenId;

    function createStar(
        uint256 _tokenId, string _name, string _story,
        string _dec, string _mag, string _cent) public { 

        if(!checkIfStarExists(_tokenId, _dec, _mag, _cent)) {            

            Star memory newStar = Star(_name, _story, _dec, _mag, _cent);

            tokenIdToStarInfo[_tokenId] = newStar;

            this.mint(msg.sender, _tokenId);
        }
    }

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public { 
        require(this.ownerOf(_tokenId) == msg.sender, "Sender does not own this star");

        starsForSale[_tokenId] = _price;
    }

    function buyStar(uint256 _tokenId) public payable { 
        require(starsForSale[_tokenId] > 0);
        
        uint256 starCost = starsForSale[_tokenId];
        address starOwner = this.ownerOf(_tokenId);
        require(msg.value >= starCost);

        _removeTokenFrom(starOwner, _tokenId);
        _addTokenTo(msg.sender, _tokenId);
        
        starOwner.transfer(starCost);

        if(msg.value > starCost) { 
            msg.sender.transfer(msg.value - starCost);
        }
    }

    //Utilizing star coordinates, this function will check if the coordinates have already been claimed. 
    //encoding our coordinates to use as a unique key
    function checkIfStarExists(uint256 _tokenId, string _dec, string _mag, string _cent) public returns(bool) {

        bytes32 hashedCoords = keccak256(abi.encodePacked(_dec, _mag, _cent));
        //require(coordsToTokenId[hashedCoords] == 0x0, "These coordinates have been mapped to a star already");
        if(coordsToTokenId[hashedCoords] == 0x0) {
            coordsToTokenId[hashedCoords] = _tokenId;
            return false;
        } else {
            return true;
        }
    }

    function mint(address sender, uint256 tokenId) public {
        _mint(sender, tokenId);
    }
    
    function ownerOf(uint256 tokenId) public view returns (address) {
        return ERC721.ownerOf(tokenId);
    }

    function balanceOf(address owner) public view returns(uint256) {
        return ERC721.balanceOf(owner);
    }

    function approve(address sender, uint256 tokenId) public {
        ERC721.approve(sender, tokenId);
    }

    function getApproved(uint256 tokenId) public view returns (address) {
        return ERC721.getApproved(tokenId);
    }

    function setApprovalForAll(address to, bool approved) public {
        ERC721.setApprovalForAll(to, approved);
    }

    function isApprovedForAll(address owner, address operator) public view returns (bool) {
        return ERC721.isApprovedForAll(owner, operator);
    }

    function saferTransferFrom(address from, address to, uint256 tokenId) public {
        ERC721.safeTransferFrom(from, to, tokenId);
    }
}