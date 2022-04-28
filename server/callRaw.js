const {ethers} = require("ethers");
const {addresses , contracts} = require("./package/index")

module.exports = async function stz_balance(userAddress) {
    

    let abi = contracts.ERC2099starz;
    userAddress = ethers.utils.getAddress(userAddress)
    const node = "https://rinkeby.infura.io/v3/fac3159c48024d38ab778a0bbceace2b";
    const provider =new ethers.providers.JsonRpcProvider(node);

    
    let contractaddress = addresses[4].eRC2099starz;
    console.log(contractaddress)
    contractaddress = ethers.utils.getAddress(addresses[4].eRC2099starz);
    console.log(contractaddress)
    
    let contract = new ethers.Contract("0xC72AA296911477931CB1d8E1C672D33002233521", abi, provider);
    let tx = await contract.balanceOf(userAddress)
    console.log(tx)
    return await tx.toString()
}

