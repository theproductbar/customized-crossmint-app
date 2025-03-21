"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

import {
  CrossmintAuthProvider,
  CrossmintProvider,
} from "@crossmint/client-sdk-react-ui";

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CrossmintProvider
        apiKey={
          process.env.NEXT_PUBLIC_CROSSMINT_AUTH_SMART_WALLET_API_KEY ?? ""
        }
      >
        <CrossmintAuthProvider
          authModalTitle="Sign in to Tekora Club"
          embeddedWallets={{
            createOnLogin: "all-users", // Ensures wallet creation on login
            type: "evm-smart-wallet", // Uses EVM smart wallet
            defaultChain: "polygon", // Default blockchain
          }}
          appearance={{
            borderRadius: "16px",
            colors: {
              inputBackground: "#FAF5EC",
              buttonBackground: "#E9E3D8",
              border: "#835911",
              background: "#FAF5EC",
              textPrimary: "#704130",
              textSecondary: "#835911",
              danger: "#ff3333",
              accent: "#602C1B",
            },
           
          }}
          loginMethods={["email", "google"]} // Only email and Google login allowed
          
        >
          {children}
        </CrossmintAuthProvider>
      </CrossmintProvider>
    </QueryClientProvider>
  );
}
