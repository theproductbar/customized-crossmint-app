"use client"; // This directive tells Next.js that this file is for client-side rendering

// Importing components and hooks from other files or libraries
import { SignInAuthButton } from "@/components/signin-auth-button"; // Button for signing in with authentication
import { Typography } from "@/components/typography"; // Custom typography component
import Link from "next/link"; // Next.js Link component for navigation
import { useState } from "react"; // React hook for managing state

// Importing useWallet hook from the Crossmint SDK for wallet management
import { useWallet } from "@crossmint/client-sdk-react-ui";
import { Button } from "@/components/button";

// Main component for handling the primary action (minting NFT or signing in)
function HomePrimaryAction() {
  const { status: walletStatus } = useWallet(); // Destructuring wallet status from the useWallet hook

  // If wallet is not loaded (user not signed in), show the sign-in button
  if (walletStatus !== "loaded") {
    return <SignInAuthButton />; // Button for signing in with a wallet
  } else {
    return (
      <Button
        className="bg-card gap-[10px] shadow-light rounded-xl py-3" // Styling for the button
      >
        <Link href="/wallet">
          <Typography className="text-[#00150D] font-semibold text-[17px]">
            Collection
          </Typography>
        </Link>
      </Button>
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
            variant={"h1"} // Variant for the Typography component (heading level 1)
          >
            TEKORA WALLET
          </Typography>
          {/* Subtitle or description */}
          <Typography className="text-center">
            The Tekora Wallet is your secure hub for storing, managing, and
            trading exclusive Tekora NFTs. Unlock limited-edition digital cards,
            rare collectibles, and exclusive in-game perks available only to
            members. Take control of your collection, shape the future, and
            master the world of Tekora.
          </Typography>
          <Typography
            className="text-center"
            variant={"h6"} // Variant for the Typography component (heading level 1)
          >
            For the best experience, use a mobile browser.
          </Typography>
        </div>

        {/* Main content with NFT details and primary action buttons */}
        <div className="flex flex-col w-full md:max-w-[340px] gap-10">
          {/* NFT Information Card */}
          <div className="bg-card flex flex-col p-5 rounded-3xl shadow-dropdown">
            {/* NFT image with styling */}
            <img
              className="rounded-xl rounded-bl-none rounded-br-none"
              src={
                "https://playtekora.com/wp-content/uploads/2025/03/Wallet-Front-.png"
              } // Path to the NFT image
              alt="nft" // Alt text for accessibility
            />
          </div>
          {/* Render the HomePrimaryAction component to handle the wallet and minting logic */}
          <HomePrimaryAction />
        </div>
      </div>
    </div>
  );
}
