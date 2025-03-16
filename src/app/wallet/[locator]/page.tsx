"use client";

import { CrossmintNFTDetail } from "@crossmint/client-sdk-react-ui";
import { CircleArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
export default function Index({ params }: { params: { locator: string } }) {
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Ensure only body scrolls
  }, []);
  const nftData = params.locator?.split("%3A");
  return (
    <div className="h-[800px] p-4 flex flex-col">
      <Link className="flex" href="/wallet">
        <div className="flex gap-2 p-2 mb-4 rounded-xl hover:bg-gray-100 hover:text-red-500">
          <CircleArrowLeft /> My Collection
        </div>
      </Link>
      <CrossmintNFTDetail
        nft={{
          chain: nftData[0] as "polygon",
          contractAddress: nftData[1],
          tokenId: nftData[2],
        }}
      />
    </div>
  );
}
