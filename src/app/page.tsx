"use client"; // This directive tells Next.js that this file is for client-side rendering

// Importing components and hooks from other files or libraries
import { Fireworks } from "@/components/fireworks"; // Custom fireworks component
import { MintNFTButton } from "@/components/mint-nft-button"; // Button to mint NFT
import { SignInAuthButton } from "@/components/signin-auth-button"; // Button for signing in with authentication
import { Typography } from "@/components/typography"; // Custom typography component
import Link from "next/link"; // Next.js Link component for navigation
import { useState } from "react"; // React hook for managing state

// Importing useWallet hook from the Crossmint SDK for wallet management
import { useWallet } from "@crossmint/client-sdk-react-ui";

// Main component for handling the primary action (minting NFT or signing in)
function HomePrimaryAction() {
  const { status: walletStatus } = useWallet(); // Destructuring wallet status from the useWallet hook
  const [nftSuccessfullyMinted, setNftSuccessfullyMinted] = useState(false); // State to track if NFT has been minted successfully

  // If wallet is not loaded (user not signed in), show the sign-in button
  if (walletStatus !== "loaded") {
    return <SignInAuthButton />; // Button for signing in with a wallet
  } else {
    return (
      <>
        <Fireworks /> {/* Custom fireworks animation upon successful mint */}
        <div className="flex gap-2 items-center self-center min-h-[52px]">
          <Link
            href="/wallet" // Link to navigate to the wallet page
            className="underline text-secondary-foreground text-lg font-semibold underline-offset-4"
          >
            Collections
          </Link>
        </div>
      </>
    );
  }
}

// Main Home component to render the page
export default function Home() {
  return (
    <div className="flex h-full w-full items-center md:p-4 justify-center">
      {/* Main container div, centered horizontally and vertically */}
      <div className="flex flex-col pb-12 items-center max-w-[538px] p-4">
        {/* Content container for the entire page */}
        <div className="flex flex-col gap-2 text-center pb-8">
          {/* Title and description section */}
          <Typography
            style={{
              background: "linear-gradient(to right, #602C1B, #FCB69F)", // Gradient background for text
              WebkitBackgroundClip: "text", // Ensures the gradient is clipped to the text
              color: "transparent", // Makes the text itself transparent to show the gradient
            }}
            variant={"h1"} // Variant for the Typography component (heading level 1)
          >
            LagunnaGames
          </Typography>
          {/* Subtitle or description */}
          <Typography className="text-primary-foreground text-center">
            Create a wallet and mint a token, just using Face ID. No passphrase,
            transaction prompts, or gas fees required
          </Typography>
        </div>

        {/* Main content with NFT details and primary action buttons */}
        <div className="flex flex-col w-full md:max-w-[340px] gap-10">
          {/* NFT Information Card */}
          <div className="bg-card flex flex-col p-5 rounded-3xl shadow-dropdown">
            {/* NFT image with styling */}
            <img
              className="rounded-xl rounded-bl-none rounded-br-none"
              src={"/emoji-nft.png"} // Path to the NFT image
              alt="nft" // Alt text for accessibility
            />
            <div className="py-4">
              {/* NFT Title */}
              <Typography className="text-secondary-foreground" variant="h3">
                Letterpress Pebble
              </Typography>
              {/* NFT Creator */}
              <Typography className="text-muted-foreground" variant="h5">
                by Crypto Angel
              </Typography>
            </div>
          </div>
          {/* Render the HomePrimaryAction component to handle the wallet and minting logic */}
          <HomePrimaryAction />
        </div>
      </div>
    </div>
  );
}
