"use client"; // This directive tells Next.js that this file is to be client-side rendered

// Importing various components, icons, and hooks
import { Logo, MobileLogo } from "@/icons/logo"; // Logo components (custom icons)
import { LogoutIcon } from "@/icons/logout"; // Logout icon
import { Copy, Image, Globe, User,LogOut, WalletMinimal } from "lucide-react"; // Importing icons from the lucide-react library
import Link from "next/link"; // Next.js Link component for navigation
import { useRouter } from "next/navigation"; // Router hook to programmatically navigate

// Importing client-side hooks and context
import {
  type EVMSmartWallet,
  useAuth,
  useWallet,
} from "@crossmint/client-sdk-react-ui"; // Auth and Wallet hooks
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"; // Avatar components for user profile picture
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu"; // Dropdown menu components
import { Typography } from "./typography"; // Typography component for consistent text styling
import { useToast } from "./use-toast"; // Custom hook for showing toast notifications

// Function to format the wallet address (e.g., "0x123...abcd")
function formatWalletAddress(
  address: string,
  startLength: number,
  endLength: number
): string {
  return `${address.substring(0, startLength)}...${address.substring(
    address.length - endLength
  )}`;
}

// Main Header component
export const Header: React.FC = () => {
  const { logout } = useAuth(); // Extracting logout function from the useAuth hook
  const { wallet, status: walletStatus } = useWallet(); // Extracting wallet details and status from the useWallet hook
  const router = useRouter(); // Getting the router object for navigation
  const { toast } = useToast(); // Getting the toast function for showing notifications

  // Handle logout and redirect the user to the homepage
  const handleLogout = () => {
    logout(); // Perform logout action
    router.push("/"); // Redirect to the homepage after logout
  };

  // Handle copying the wallet address to the clipboard
  const handleCopyAddress = async () => {
    if (wallet?.address) {
      await navigator.clipboard.writeText(wallet.address); // Copy the wallet address to clipboard
      toast({ title: "Address copied to clipboard", duration: 5000 }); // Show toast notification
    }
  };

  return (
    <div className="flex justify-between p-4 items-center">
      {/* Render the logo */}
      <HeaderLogo />
      {/* Render the user menu if the wallet is loaded or in progress */}
      {(walletStatus === "loaded" || walletStatus === "in-progress") && (
        <UserMenu
          wallet={wallet}
          walletStatus={walletStatus}
          onLogout={handleLogout}
          onCopyAddress={handleCopyAddress}
        />
      )}
    </div>
  );
};

// Header logo component
const HeaderLogo: React.FC = () => (
  <Link href="/" className="justify-center items-center flex">
    <div className="w-44 sm:w-64">
      <img
        className=""
        src={
          "https://playtekora.com/wp-content/uploads/2025/03/tekora-wallet-logo.png"
        } // Path to the NFT image
        alt="nft" // Alt text for accessibility
      />
    </div>
  </Link>
);

// User menu component with wallet-related options
const UserMenu: React.FC<{
  wallet: EVMSmartWallet | undefined;
  walletStatus: string;
  onLogout: () => void;
  onCopyAddress: () => void;
}> = ({ wallet, walletStatus, onLogout, onCopyAddress }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild disabled={walletStatus !== "loaded"}>
      {/* Trigger for the dropdown, disabled if wallet is not loaded */}
      <div className="flex items-center gap-5 cursor-pointer">
        {/* Display wallet address and avatar */}
        <WalletDisplay
          address={wallet?.address}
          isLoading={walletStatus !== "loaded"}
        />
        <Avatar className="h-9 w-9">
          <AvatarImage alt="User Avatar" src="" />{" "}
          {/* Empty source here, can be replaced with actual user image */}
          <AvatarFallback className="bg-skeleton">
            <User className="h-5 w-5" /> {/* Default user icon */}
          </AvatarFallback>
        </Avatar>
      </div>
    </DropdownMenuTrigger>
    {/* Dropdown content with options */}
    <DropdownMenuContent
      align="end"
      className="w-56 overflow-y-auto max-h-[80vh]"
    >
      <div className="flex flex-col gap-2">
        {/* Copy wallet address to clipboard */}
        <div
          className="flex gap-3 text-muted items-center cursor-pointer py-2"
          onClick={onCopyAddress}
        >
          <Typography>
            {wallet ? formatWalletAddress(wallet.address, 14, 6) : ""}
          </Typography>
          <Copy className="h-5 w-5" /> {/* Copy icon */}
        </div>
        {/* Link to Collection page */}
        <Link
          href="/wallet"
          prefetch={false}
          className="flex gap-3 py-2 items-center"
        >
          <Image size={32} /> {/* Image icon for Collection */}
          <Typography>Collection</Typography>
        </Link>
         {/* Go to */}
        <Link href="https://playtekora.com" passHref>
          <div className="flex gap-3 py-2 items-center">
            <Globe size={32} />
            <Typography>Go To</Typography>
          </div>
        </Link>
        {/* Logout option */}
        <div
          className="flex gap-3 py-2 items-center"
          onClick={onLogout}
        >
             <LogOut size={32} /> {/* Logout icon */}
             <Typography>Sign Out</Typography>
        </div>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
);

// Wallet display component to show wallet address and a loading state
const WalletDisplay: React.FC<{
  address: string | undefined;
  isLoading: boolean;
}> = ({ address, isLoading }) => (
  <div className="flex items-center min-w-[150px] bg-skeleton rounded-full px-4 py-2 gap-2 text-secondary-foreground">
    <WalletMinimal className="h-4 w-4" /> {/* Wallet icon */}
    <Typography>
      {isLoading
        ? "Loading..."
        : address
        ? formatWalletAddress(address, 6, 3)
        : ""}
    </Typography>
  </div>
);
