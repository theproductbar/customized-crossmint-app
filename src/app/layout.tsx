import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";

import { cn } from "../lib/utils";
import "./globals.css";

// Metadata for the application
export const metadata: Metadata = {
  title: "Tekora Wallet",
  description: "The Tekora Wallet is your exclusive hub for rare Tekora digital collectibles, giving you access to limited-edition NFTs, exclusive rewards, and in-game perks.",
};

// Load Inter font with custom settings
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Load Raleway font with custom settings
const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

// Root layout component for the application
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      // Add font variables so they'll be available for Tailwind CSS
      className={cn(inter.variable, raleway.variable)}
    >
      <body className="font-body min-h-screen">
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
