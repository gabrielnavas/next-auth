"use client"

import { FC, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

interface ILogoutProps { };

const Logout: FC<ILogoutProps> = (props) => {
  const { data, status } = useSession();

  const route = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      route.push('/login')
    }
  }, [route, status])

  return (
    <div className="w-full h-dvh flex flex-col justify-center align-middle">
      <div className="flex justify-center  text-black-800 text-2xl text-bold mb-2 ">
        {status === 'loading' && 'Waiting...'}
        {data && data.user && (
          `${data?.user?.name}, are you sure you want to leave?'`
        )}
      </div>
      <div className="flex justify-center gap-2">
        <Button className="w-[17%]" onClick={() => signOut()}>Yes</Button>
        <Button className="w-[40%]" variant='outline' onClick={() => route.back()}>No</Button>
      </div>
    </div>
  );
}

export default Logout;