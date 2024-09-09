"use client";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "./icons";

export default function AuthButton({ page }: { page: string }) {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <>
      {!isAuthenticated ? (
        <Link
          href={page === "register" ? "/login" : "/register"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          {page === "register" ? (
            <span className="flex align-middle gap-1">
              <Icons.LogIn size={17} className="me-2 " />
              Login
            </span>
          ) :
            (
              <span className="flex align-middle gap-1">
                <Icons.ArrowUpFromLine size={17} className="me-2" />
                <span>Register</span>
              </span>
            )}
        </Link>
      ) : (
        <Button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Logout
        </Button>
      )}
    </>
  );
}