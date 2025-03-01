import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";

import { cn } from "../lib/utils";
import "./globals.css";

// Metadata for the application
export const metadata: Metadata = {
  title: "Crossmint Smart Wallet Nextjs Demo",
  description: "Crossmint Smart Wallet Nextjs Demo",
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
      <body className="font-body text-foreground min-h-screen">
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
