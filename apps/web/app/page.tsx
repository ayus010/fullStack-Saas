"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import {useMutation, useQuery, Authenticated, Unauthenticated } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const user = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);

  return (
    <>
      <Authenticated>
        <div className="flex items-center justify-center min-h-svh">
          <p>APPS/WEB</p>
          <UserButton />
          <Button onClick={()=>addUser()}>Add</Button>
          {JSON.stringify(user)}
        </div>
      </Authenticated>
      <Unauthenticated>
        <p>Must be signed In</p>
        <SignInButton>SignIn</SignInButton>
      </Unauthenticated>
    </>
  )
}
