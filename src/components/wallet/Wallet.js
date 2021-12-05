import Web3Modal from "web3modal";

async function getWallet(
  providerOptions = {},
  network = "rinkeby",
  cacheProvider = true
) {
  const web3Modal = new Web3Modal({
    network: network, // optional
    cacheProvider: true, // optional
    providerOptions, // required
  });
  // Get network provider and web3 instance.
  const provider = await web3Modal.connect();
  return provider;
}

export default getWallet;
