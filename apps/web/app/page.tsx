"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";

/**
 * Client page component that displays users and offers a button to add one.
 *
 * Renders a centered view containing a static label, an "Add" button that invokes the `api.users.add` mutation, and the current result of `api.users.getMany` serialized as JSON. Uses Convex React hooks (`useQuery` and `useMutation`) to fetch and mutate user data.
 *
 * @returns A React element for the page.
 */
export default function Page() {
  const user = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);

  return (
    <div className="flex items-center justify-center min-h-svh">
      <p>APPS/WEB</p>
      <Button onClick={()=>addUser()}>Add</Button>
      {JSON.stringify(user)}
    </div>
  )
}
