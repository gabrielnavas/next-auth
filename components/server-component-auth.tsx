import { FC } from "react";

import { getCurrentUser } from "@/lib/sessions";

const ServerComponentAuth: FC = async () => {
  const user = await getCurrentUser();
  
  return (
    <>
      {user && (
        <div className="bg-slate-700 border gap-2 h-60 max-w-md overflow-scroll text-white p-4">
          <h2 className="font-bold">Server Component</h2>
          {JSON.stringify(user)}
        </div>
      )}

    </>
  );
}

export default ServerComponentAuth;