"use client";

import { Skeleton } from "@/components/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useWallet, useAuth } from "@crossmint/client-sdk-react-ui";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

type NFT = {
  chain: string;
  contractAddress: string;
  tokenId: string;
  metadata: {
    attributes: Array<any>;
    collection: Record<string, any>;
    description: string;
    image: string;
    animation_url: string | null;
    name: string;
  };
  locator: string;
  tokenStandard: string;
};

const SkeletonLoader = () => {
  return (
    <div className="p-6">
      <div className="flex flex-col gap-4">
        <Skeleton className="w-full aspect-square rounded-xl" />
        <div className="flex flex-col gap-6">
          <Skeleton className="h-8 w-32 rounded" />
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">
              <Skeleton className="h-24 w-full rounded" />
            </p>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Attributes</h2>
            <div className="grid grid-cols-3 gap-3">
              <Skeleton className="h-12 rounded w-full" />
              <Skeleton className="h-12 rounded w-full" />
              <Skeleton className="h-12 rounded w-full" />
              <Skeleton className="h-12 rounded w-full" />
              <Skeleton className="h-12 rounded w-full" />
              <Skeleton className="h-12 rounded w-full" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Details</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <span className="text-gray-700">Contract Address</span>
                <Skeleton className="h-8 w-full rounded" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span className="text-gray-700">Token ID</span>
                <Skeleton className="h-8  w-full rounded" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span className="text-gray-700">Blockchain</span>
                <Skeleton className="h-8  w-full rounded" />
              </div>
              <Skeleton className="h-8  w-full rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
interface AttributeProps {
  value: number;
  label: string;
}
const Attribute = ({ value, label }: AttributeProps) => (
  <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center">
    <div className="font-bold text-lg">{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);

export default function Index({ params }: { params: { locator: string } }) {
  const { status: walletStatus } = useWallet();
  const [nft, setNft] = useState<NFT>();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const chain = "polygon";
  const fetchNFTs = async (user: any) => {
    try {
      const walletLocator = encodeURIComponent(`email:${user?.email}:${chain}`);
      const response = await fetch(
        `https://www.crossmint.com/api/2022-06-09/wallets/${walletLocator}/nfts?page=1&perPage=20`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": `${
              process.env
                .NEXT_PUBLIC_CROSSMINT_AUTH_SMART_WALLET_SERVER_API_KEY ?? ""
            }`,
          },
        }
      );
      const nfts = await response.json();
      const nft = nfts.find(
        (n) => n.locator === decodeURIComponent(params.locator)
      );
      console.log(
        "n.locator === decodeURIComponent(params.locator)",
        decodeURIComponent(params.locator)
      );
      setLoading(false);
      setNft(nft);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchNFTs(user);
  }, []);

  if (walletStatus === "in-progress" || loading) {
    return <SkeletonLoader />;
  }
  return (
    <div className="p-6">
      <div className="mb-4">
        <Link
          href="/wallet"
          className="flex items-center text-xl text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>My Collection</span>
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {/* NFT Image */}
        <img src={nft?.metadata?.image} alt="image" className="rounded-xl" />
        {/* NFT Details */}
        <div className="flex flex-col gap-6">
          <div className="text-3xl font-bold">{nft?.metadata?.name}</div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">
              {nft?.metadata?.description}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Attributes</h2>
            <div className="grid grid-cols-3 gap-3">
              {nft?.metadata?.attributes?.map((attr, Index) => {
                return (
                  <Attribute
                    key={Index}
                    value={attr.value}
                    label={attr.trait_type}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Details</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <span className="text-gray-700">Contract Address</span>
                <span className="text-gray-900 font-mono w-40 sm:w-96 truncate sm:text-clip">
                  {nft?.contractAddress}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span className="text-gray-700">Token ID</span>
                <span className="text-gray-900">{nft?.tokenId}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span className="text-gray-700">Blockchain</span>
                <span className="text-gray-900">{nft?.chain}</span>
              </div>
              <div className="pt-8">
                <a
                  href={`https://polygonscan.com/token/${nft?.contractAddress}?a=${nft?.tokenId}`}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on explorer
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
