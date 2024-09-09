import { NextAuthOptions } from "next-auth";

import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

import {PrismaAdapter} from '@auth/prisma-adapter'
import { db } from "./db";

export const authOptions: NextAuthOptions = {
  // @ts-ignore
  adapter: PrismaAdapter(db as any),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENTID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentails',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "********" },
        username: { label: "Username", type: "Username" },
      },
      async authorize(credentials, req): Promise<any> {
        const user = { email: 'test@email.com', password: '12345678', name: 'testname' ,username: 'test' };
        console.log("authorized method", credentials);
        
        return user;
      },
    })
  ],
  session: {
    strategy: 'jwt'
  },
  secret: process.env.JWT_SECRET,  
  debug: process.env.NODE_ENV === 'development',
};