const hre = require("hardhat");

async function main() {
  let NFT = await hre.ethers.getContractFactory("NFT");
  NFT = await NFT.deploy();

  await NFT.deployed();

  console.log("NFT deployed to:", NFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
