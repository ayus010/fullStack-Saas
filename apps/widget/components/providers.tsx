"use client"

import * as React from "react"
import { ConvexProvider, ConvexReactClient } from "convex/react"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");

/**
 * Wraps its children with a ConvexProvider configured with the app's Convex client.
 *
 * Use this at the root of the client component tree to provide Convex access to descendants.
 *
 * @param children - React nodes to render inside the ConvexProvider
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProvider client={convex}>
      {children}
    </ConvexProvider>
  )
}
