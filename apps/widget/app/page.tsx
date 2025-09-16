"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";

/**
 * Client React page component that displays users and provides a button to add one.
 *
 * Fetches the list of users via a query and renders the JSON result. Renders an "Add" button
 * that invokes the add-user mutation when clicked. This component does not implement explicit
 * loading or error states for the query/mutation.
 *
 * @returns The page's JSX element.
 */
export default function Page() {
  const user = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);

  return (
    <div className="flex items-center justify-center min-h-svh">
      <p>APPS/WIDGET</p>
      <Button onClick={()=>addUser()}>Add</Button>
      {JSON.stringify(user)}
    </div>
  )
}
