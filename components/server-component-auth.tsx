import { FC } from "react";

import { getCurrentUser } from "@/lib/sessions";

const ServerComponentAuth: FC = async () => {
  const user = await getCurrentUser();
  
  return (
    <>
      {user && (
        <div className="bg-slate-50 border gap-2 h-60 max-w-md overflow-scroll ">
          <h2>Server Component</h2>
          {JSON.stringify(user)}
        </div>
      )}

    </>
  );
}

export default ServerComponentAuth;