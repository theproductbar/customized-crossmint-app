"use client";

import { Header } from "@/components/header";
import { Toaster } from "@/components/toaster";
import type { ReactNode } from "react";

import { Providers } from "./_lib/providers";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <Providers>
      {/* <Header /> */}
      <Toaster />
      {children}
    </Providers>
  );
}
