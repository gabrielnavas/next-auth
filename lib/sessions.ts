import {getServerSession} from 'next-auth'
import { authOptions } from './auth';

type User = {
  name: string 
  email: string 
  image: string
}

export async function getCurrentUser(): Promise<User | null> {
  const session = await getServerSession(authOptions);
  
  if(session === null || session.user === null) {
    return null
  }

  return session.user as User;
}
