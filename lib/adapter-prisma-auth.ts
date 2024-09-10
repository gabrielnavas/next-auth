import { PrismaClient } from "@prisma/client";
import { Adapter, AdapterAccount, AdapterSession, AdapterUser, VerificationToken } from "next-auth/adapters";

export function AdapterPrismaAuth(prisma: PrismaClient): Adapter {
  return {
    async createUser(data: Omit<AdapterUser, "id">): Promise<AdapterUser> {
      return prisma.user.create({ data })
    },
    getUser: (id: string) => prisma.user.findUnique({ where: { id } }),
    getUserByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),
    async getUserByAccount(provider_providerAccountId: {
      provider: string, 
      providerAccountId: string
    }) {
      const account = await prisma.account.findUnique({
        where: { provider_providerAccountId },
        select: { user: true },
      })
      return (account?.user as AdapterUser) ?? null
    },
    updateUser: ({ id, ...data }: any) =>
      prisma.user.update({ where: { id }, data }) as Promise<AdapterUser>,
    deleteUser: (id: string) =>
      prisma.user.delete({ where: { id } }) as Promise<AdapterUser>,
    linkAccount: (data: any) =>
      prisma.account.create({ data }) as unknown as AdapterAccount,
    unlinkAccount: (provider_providerAccountId: {
      provider: string, 
      providerAccountId: string
    }) =>
      prisma.account.delete({
        where: { provider_providerAccountId },
      }) as unknown as AdapterAccount,

    async createSession(session: AdapterSession): Promise<AdapterSession> {
      return {} as AdapterSession;
    },
    async getSessionAndUser(sessionToken: string): Promise<{ session: AdapterSession; user: AdapterUser; } | null> {
      return null;
    },
    async updateSession(session: Partial<AdapterSession>): Promise<AdapterSession> {
      return {} as AdapterSession;
    },
    async deleteSession(sessionToken: string): Promise<void> {    },
    async createVerificationToken(verificationToken: VerificationToken): Promise<VerificationToken> {
      return {} as VerificationToken;
    },
    async useVerificationToken({ identifier, token }: { identifier: string; token: string; }): Promise<VerificationToken | null> {
      return null;
    },
  };
}
