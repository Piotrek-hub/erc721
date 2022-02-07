const Web3 = require('web3');
import variables from './variables';


export function getWeb3() {
    if (window.ethereum) {
        return new Web3(window.ethereum);
    } else if (window.web3) {
        return new Web3(window.web3.currentProvider);
    } else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        return false;
    }
}

export async function fetchContractMetadata() {
    const web3 = getWeb3()
    const contract = new web3.eth.Contract(variables.abi, variables.contractAddress)

    const [NAME, SYMBOL, SUPPLY] = [
        await contract.methods.name().call(),
        await contract.methods.symbol().call(),
        await contract.methods.supply().call()
    ]

    return [NAME, SYMBOL, SUPPLY]
}

export async function mint(address, URI) {
    const web3 = getWeb3()
    const contract = new web3.eth.Contract(variables.abi, variables.contractAddress)

    const estimatedGas = await contract.methods.mintNft(URI).estimateGas();
    console.log(address)
    contract.methods.mintNft(URI).send({
        from: address,
        gas: estimatedGas,
    }).then(result => {
        console.log(result)
    })
}

export async function fetchNFTS() {
    const web3 = getWeb3()
    const contract = new web3.eth.Contract(variables.abi, variables.contractAddress);

    const links = (await contract.getPastEvents('minted', { fromBlock: 0, toBlock: 'latest' }))
        .map((event) => (event.returnValues.URI))


    const owners = []
    for (let i = 1; i < links.length + 1; i++) {
        owners.push(await contract.methods.ownerOf(i).call())
    }

    const result = []
    for (let i = 0; i < links.length; i++) {
        result.push({
            owner: owners[i],
            link: links[i],
        })
    }

    return result;
}