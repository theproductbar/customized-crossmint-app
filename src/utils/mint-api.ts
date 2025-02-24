import type { Address } from "viem"; // Importing Address type from the 'viem' library for type safety

import type { EVMSmartWallet } from "@crossmint/client-sdk-react-ui"; // Importing EVMSmartWallet type from Crossmint SDK

import { CollectionABI } from "./collection-abi"; // Importing the ABI (Application Binary Interface) for the NFT collection contract

// Defining the address of the AMOY contract as a constant
const AMOY_CONTRACT: Address = "0x5c030a01e9d2c4bb78212d06f88b7724b494b755";

// Function to mint an NFT using the provided wallet
export const mintNFT = async (wallet: EVMSmartWallet) => {
    // Check if the wallet is provided
    if (!wallet) {
        throw new Error("Wallet is not provided"); // Throw an error if no wallet is passed
    }

    // Log the wallet address to the console for debugging purposes
    console.log("Minting NFT", wallet.address);

    // Execute the contract function to mint the NFT
    const transactionHash = await wallet.executeContract({
        address: AMOY_CONTRACT, // The address of the NFT contract
        abi: CollectionABI, // The ABI of the contract to interact with
        functionName: "mintTo", // The function name to call on the contract
        args: [wallet.address], // Arguments for the function call (the wallet address to mint the NFT to)
    });

    // Log the transaction hash to the console for reference
    console.log("NFT mint. Tx hash:", transactionHash);
};