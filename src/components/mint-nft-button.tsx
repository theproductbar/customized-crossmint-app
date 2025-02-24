"use client"; // Indicates that this component is a client component in Next.js

import { Passkey } from "@/icons/passkey"; // Importing the Passkey icon component
import { Spinner } from "@/icons/spinner"; // Importing a Spinner icon for loading state
import { mintNFT } from "@/utils/mint-api"; // Importing the function to handle NFT minting
import { useState } from "react"; // Importing useState for managing component state

import { useWallet } from "@crossmint/client-sdk-react-ui"; // Hook to manage wallet state

import { Button } from "./button"; // Importing a Button component
import { Typography } from "./typography"; // Importing a Typography component for consistent text styling
import { useToast } from "./use-toast"; // Hook for displaying toast notifications

// Component for the Mint NFT button
export const MintNFTButton = ({ setNftSuccessfullyMinted }: { setNftSuccessfullyMinted: (a: boolean) => void }) => {
    const { wallet } = useWallet(); // Get the current wallet from the useWallet hook
    const [isLoadingMint, setIsLoadingMint] = useState(false); // State to indicate if minting is in progress
    const { toast } = useToast(); // Get the toast function for notifications

    // If minting is in progress, show a loading state
    if (isLoadingMint) {
        return (
            <div className="flex gap-2 items-center self-center min-h-[52px]" role="status">
                <Spinner /> {/* Show loading spinner */}
                <Typography className="text-primary-foreground" variant={"h4"}>
                    Minting your NFT... {/* Loading message */}
                </Typography>
            </div>
        );
    }

    // Function to handle the minting process
    const mint = async () => {
        setIsLoadingMint(true); // Set loading state to true
        try {
            // Check if the wallet is available
            if (!wallet) {
                toast({ title: "Error occurred during wallet creation" }); // Show error if wallet is not found
                return;
            }
            await mintNFT(wallet); // Call the mintNFT function with the wallet
            setNftSuccessfullyMinted(true); // Update state to indicate successful minting
        } catch (error) {
            console.error("Error minting NFT:", error); // Log the error to the console
            toast({ title: "Error occurred during minting" }); // Show error toast
        } finally {
            setIsLoadingMint(false); // Reset loading state
        }
    };

    // Render the button to mint the NFT
    return (
        <Button
            className="bg-background rounded-full text-secondary-foreground font-semibold text-[17px] gap-2 shadow-primary border border-color-secondary-foreground"
            onClick={mint} // Call the mint function on button click
            disabled={isLoadingMint} // Disable button while loading
        >
            <div
                style={{
                    display: "flex", // Flexbox for aligning items
                    gap: 8, // Space between items
                    background: "linear-gradient(to right, #602C1B, #eb987d)", // Gradient background for text
                    WebkitBackgroundClip: "text", // Clipping for gradient text
                    color: "transparent", // Make text transparent to show gradient
                }}
            >
                <Passkey /> {/* Icon for minting */}
                <Typography className="text-[17px] pt-[0.5px]">Mint NFT</Typography> {/* Button label */}
            </div>
        </Button>
    );
};