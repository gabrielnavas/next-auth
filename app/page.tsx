import { getCurrentUser } from "@/lib/sessions";

export default async function Home() {
  const user = await getCurrentUser()
  console.log(user);
  
  return (
    <div>
      {JSON.stringify(user)}
    </div>
  )
}
