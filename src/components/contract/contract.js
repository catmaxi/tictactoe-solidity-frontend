import contractabi from "./contractabi.js";

let contractAddress = "0x29De50164DeCd3EE6d0c6a886024990538c8d47D";


function getContract(web3) {
    return new web3.eth.Contract(contractabi, contractAddress);
}
// let contract = new library.eth.Contract(contractabi, contractAddress);

export default getContract;