"use client"

import { cn } from "@/lib/utils";

import React, { FC, useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "./icons";

import { signIn } from 'next-auth/react'
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "./ui/toast";
import { useRouter } from "next/navigation";

interface IUserLoginAuthProps extends React.HTMLAttributes<HTMLDivElement> { }

interface IUser {
  email: string;
  password: string;
}

const defaultData: IUser = {
  email: "",
  password: "",
}

export const UserLoginAuth: FC<IUserLoginAuthProps> = ({
  className,
  ...props
}: IUserLoginAuthProps) => {

  const [data, setData] = useState<IUser>({ ...defaultData })
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const { toast } = useToast()
  const route = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn<'credentials'>('credentials', {
        ...data,
        redirect: false,
      })
      if (!result?.ok) {
        if (result?.error) {
          setMessage(result?.error)
        }
        toast({
          title: "Ooops!",
          description: "A problem occurred!",
          variant: 'destructive',
          action: (
            <ToastAction altText="Try again">Try again</ToastAction>
          )
        })
      } else {
        toast({
          title: "Welcome!",
          description: "Enjoy!!",
        })
        setData({ ...defaultData })
        setMessage('')
        route.push("/")
      }
    } catch (err) {
      if (err) {
        setMessage('Ooops! Call the admin!')
      }
      toast({
        title: "Ooops!",
        description: "A problem occurred!",
        variant: 'destructive',
        action: (
          <ToastAction altText="Try again">Try again</ToastAction>
        )
      })
      alert(err)
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLoginWithGithub() {
    await signIn('github', {redirect: false, callbackUrl: '/'})
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setData(prev => {
      return {
        ...prev,
        [event.target.name]: event.target.value
      }
    })
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="mb-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="mary@email.com"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              name="email"
              value={data.email}
              onChange={handleChange} />
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="******"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              name="password"
              value={data.password}
              onChange={handleChange} />
          </div>
          {message.length > 0 && (
            <div className="mb-2 text-red-500 text-bold font-sm bg-red-100 p-2 rounded-md">
              {message}
            </div>
          )}
        </div>
        <div>
          <Button
            disabled={isLoading}
            className="w-[100%]">
            {isLoading && (
              <Icons.LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            <Icons.LogIn size={15} className="me-2" />
            Login
          </Button>
        </div>
      </form>
      <div className="flex items-center justify-center">
        <div className="border-t border-gray-300 my-1 w-[25%]"></div>
        <span className="text-xs mx-2 text-gray-500">{' '}OR CONTINUE WITH{' '}</span>
        <div className="border-t border-gray-300 my-1 w-[25%]"></div>
      </div>
      <Button
        variant="outline"
        onClick={handleLoginWithGithub}
        disabled={isLoading}
        className="w-[100%]">
        {isLoading && (
          <Icons.LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        )}
        <Icons.GitBranch size={15} className="me-2" />
        Github
      </Button>
    </div>
  );
}
