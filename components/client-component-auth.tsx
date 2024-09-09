'use client'

import { FC } from "react";

import { useSession } from 'next-auth/react'

const ClientComponentAuth: FC = () => {
  const session = useSession()

  return (
    <>
      {session.data?.user && (
        <div className="bg-slate-100 border gap-2 h-60 max-w-md overflow-scroll p-4">
          <h2 className="font-bold">Client Component</h2>
          {JSON.stringify(session)}
        </div>
      )}

    </>
  );
}

export default ClientComponentAuth;