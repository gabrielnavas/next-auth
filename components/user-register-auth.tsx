"use client"

import { cn } from "@/lib/utils";

import { FC, useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "./icons";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { describe } from "node:test";
import { ToastAction } from "./ui/toast";

interface IUserRegisterAuthProps extends React.HTMLAttributes<HTMLDivElement> { }

interface IUser {
  name: string;
  email: string;
  password: string;
}

const defaultData: IUser = {
  name: "",
  email: "",
  password: "",
}

export const UserRegisterAuth: FC<IUserRegisterAuthProps> = ({
  className,
  ...props
}: IUserRegisterAuthProps) => {

  const [data, setData] = useState<IUser>({ ...defaultData })

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const route = useRouter()
  const { toast } = useToast()


  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();


    setIsLoading(true);

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const body = await response.json();

    if (response.ok) {
      setData({ ...defaultData })
      setMessage('');
   
      toast({
        title: 'User created!',
        description: 'You have an account now!'
      })

      route.push('/login');
    } else {
      if (body.message) {
        toast({
          title: "Ooops!",
          description: "A problem occurred!",
          variant: 'destructive',
          action: (
            <ToastAction altText="Try again">Try again</ToastAction>
          )
        })
        setMessage(body.message);
      }
    }

    setIsLoading(false);
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
            <Label htmlFor="email">Name</Label>
            <Input
              id="name"
              type="name"
              placeholder="Mary"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              name="name"
              value={data.name}
              onChange={handleChange} />
          </div>
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
          <div className="mb-1">
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
            <Icons.ArrowUpFromLine size={15} className="me-2" />
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}
