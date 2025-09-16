"use client"

import * as React from "react"
import { ConvexProvider, ConvexReactClient } from "convex/react"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");

/**
 * Supplies a Convex client to descendant React components.
 *
 * Wraps `children` with a ConvexProvider that uses the `convex` client (initialized from
 * NEXT_PUBLIC_CONVEX_URL). Use this at the root of a client-side component tree to make
 * the Convex client available via context to nested components.
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
