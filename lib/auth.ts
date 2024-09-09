import { NextAuthOptions } from "next-auth";

import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

import {PrismaAdapter} from '@auth/prisma-adapter'
import { db as prisma } from "./db";

import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  // @ts-ignore
  adapter: PrismaAdapter(prisma as any),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENTID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "********" },
        username: { label: "Username", type: "Username" },
      },
      async authorize(credentials, req): Promise<any> {
        if(!credentials?.email || !credentials.password || credentials.username) {
          throw new Error('missing email, password or username');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          }
        })

        if(!user || !user.hashedPassword) {
          throw new Error('E-mail/Password is incorrect');
        }

        const matchPasswords = await bcrypt.compareSync(credentials.password, user.hashedPassword);
        if(!matchPasswords) {
          throw new Error('E-mail/Password is incorrect');
        }

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