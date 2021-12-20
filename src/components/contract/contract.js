import contractabi from "./contractabi.js";

let contractAddress = "0x1606c11Aa7d5eE9278256151E075055f120160F5";


function getContract(web3) {
    return new web3.eth.Contract(contractabi, contractAddress);
}
// let contract = new library.eth.Contract(contractabi, contractAddress);

export default getContract;