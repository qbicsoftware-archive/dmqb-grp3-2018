pragma solidity ^0.4.17;

contract BuyGenomicData{
    address[16] public buyers;

    // Buy genomic data file
    function buy(uint genomicDataId) public returns (uint) {
        require(genomicDataId >= 0 && genomicDataId <= 15);
        buyers[genomicDataId] = msg.sender;

        return genomicDataId;
    }

    // Returns an array that contains all the addresses that bought some genomic data files
    function getBuyers() public view returns (address[16]) {
        return buyers;
    }
}
