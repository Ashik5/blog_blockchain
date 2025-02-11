import { ethers } from "ethers";

import contractABI from "../ContactABI";

const contractAddress = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";

// Connect to MetaMask
async function connectWallet() {
    console.log("Ethereum object:", window.ethereum);

    if (typeof window.ethereum === "undefined") {
        console.error("MetaMask is not installed.");
        alert("MetaMask is not installed. Please install it to continue.");
        throw new Error("MetaMask is not available.");
    }

    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        console.log("Provider initialized:", provider);

        await provider.send("eth_requestAccounts", []);
        console.log("Wallet connected!");

        const signer = provider.getSigner();
        console.log("Signer initialized:", signer);

        return { provider, signer };
    } catch (error) {
        console.error("Error connecting to wallet:", error);
        throw error;
    }
}


// Create a blog post
async function createPost(title, contentHash) {
    try {
        const { signer } = await connectWallet(); // Ensure this line succeeds
        console.log("Signer received in createPost:", signer);

        const blogContract = new ethers.Contract(contractAddress, contractABI, signer);
        const tx = await blogContract.createPost(title, contentHash);
        await tx.wait();

        console.log("Blog created successfully:", tx.hash);
    } catch (error) {
        console.error("Error creating blog post:", error.message);
        throw error;
    }
}


// Fetch all blog posts
async function getPosts() {
    try {
        const { provider } = await connectWallet(); // Ensure connectWallet provides the provider
        const blogContract = new ethers.Contract(contractAddress, contractABI, provider);
        const posts = await blogContract.getAllPosts();
        console.log("Fetched posts:", posts);
        return posts; // Return posts if needed in the UI
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        throw error; // Handle this error in the UI
    }
}

export { connectWallet, createPost, getPosts };
