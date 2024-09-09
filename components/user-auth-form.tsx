"use client"

import { cn } from "@/lib/utils";

import { FC, useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "./icons";

interface IUserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

interface IUser {
  email: string;
  password: string;
}

const defaultData: IUser = {
  email: "",
  password: "",
}

export const UserAuthForm: FC<IUserAuthFormProps> = ({
  className,
  ...props
}: IUserAuthFormProps) => {

  const [data, setData] = useState<IUser>({ ...defaultData })

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      console.log(data);
      setData({ ...defaultData })
      setIsLoading(false);
    }, 2500)
    // console.log(data);
    // setData({...defaultData})
    // setIsLoading(false);
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
        </div>
        <div>
          <Button
            disabled={isLoading}
            className="w-[100%]">
            {isLoading && (
              <Icons.LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
