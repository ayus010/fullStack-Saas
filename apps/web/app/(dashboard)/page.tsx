"use client";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import {useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const user = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);

  return (
    <>

        <div className="flex items-center justify-center min-h-svh">
          <p>APPS/WEB</p>
          <UserButton />
          <OrganizationSwitcher />
          <Button onClick={()=>addUser()}>Add</Button>
          <div className="max-w-sm w-full mx-auto">
            {JSON.stringify(user, null, 2)}
          </div>
        </div>

    </>
  )
}
