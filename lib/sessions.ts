import {getServerSession} from 'next-auth'
import { authOptions } from './auth';

export async function getCurrentUser(): Promise<any> {
  const session = await getServerSession(authOptions);
  
  if(session === null || session.user === null) {
    return null
  }

  return session.user;
}
