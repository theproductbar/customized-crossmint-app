"use client"; // This directive tells Next.js that this file is for client-side rendering

// Importing components and types
import { Header } from "@/components/header"; // Custom Header component
import { Toaster } from "@/components/toaster"; // Custom Toaster component (used for notifications or messages)
import type { ReactNode } from "react"; // Importing type for ReactNode to type the 'children' prop

// Importing Providers from a local library to wrap the app in necessary contexts or providers
import { Providers } from "./_lib/providers"; 

/**
 * Template component that wraps the application layout.
 * It is used as a workaround to force a re-render of components during navigation.
 * This issue arises when combining Server Components, Client Providers, and Tailwind CSS.
 * The workaround ensures that components re-render properly, avoiding server hangs.
 * 
 * For more details on the issue, refer to the GitHub discussion: 
 * https://github.com/vercel/next.js/issues/69682
 * 
 * This component receives children as a prop and renders them inside the layout.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    // Wrapping the children with Providers to ensure that necessary context is provided to the app
    <Providers>
      {/* Header component, typically used to display the website's navigation bar or title */}
      <Header />
      {/* Toaster component, probably used to display toast notifications to the user */}
      <Toaster />
      {/* Rendering children (the actual content passed to this Template) */}
      {children}
    </Providers>
  );
}
