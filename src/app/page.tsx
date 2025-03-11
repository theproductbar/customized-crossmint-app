"use client";

import { SignInAuthButton } from "@/components/signin-auth-button";
import { Typography } from "@/components/typography";
import { useRouter } from "next/navigation";
import { useWallet } from "@crossmint/client-sdk-react-ui";
export default function Home() {
  const router = useRouter();
  const { status: walletStatus } = useWallet();
  if (walletStatus === "loaded") {
    router.push("/wallet");
  }
  return (
    <div className="flex h-full w-full items-center md:p-4 justify-center">
      <div className="flex flex-col pb-12 items-center max-w-[538px] p-4">
        <div className="flex flex-col gap-2 text-center pb-8">
          <Typography variant={"h1"}>TEKORA CLUB</Typography>
          <Typography className="text-center">
            The Tekora Wallet is your secure hub for storing, managing, and
            trading exclusive Tekora NFTs. Unlock limited-edition digital cards,
            rare collectibles, and exclusive in-game perks available only to
            members. Take control of your collection, shape the future, and
            master the world of Tekora.
          </Typography>
          <Typography className="text-center" variant={"h6"}>
            For the best experience, use a mobile browser.
          </Typography>
        </div>

        <div className="flex flex-col w-full md:max-w-[340px] gap-10">
          <div className="bg-card flex flex-col p-5 rounded-3xl shadow-dropdown">
            <img
              className="rounded-xl rounded-bl-none rounded-br-none"
              src={
                "https://playtekora.com/wp-content/uploads/2025/03/Wallet-Front-.png"
              }
              alt="nft"
            />
          </div>
          <SignInAuthButton />
        </div>
      </div>
    </div>
  );
}
