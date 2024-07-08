// import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
// import { IAuthUser, IGuests } from "./schemas";
// import { createGuest, getGuest } from "./data-service";

// const authConfig = {
//   providers: [
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET,
//     }),
//   ],
//   callbacks: {
//     authorized({
//       auth,
//     }: // request,
//     {
//       auth: { user: IAuthUser };
//       // request: Request;
//     }) {
//       console.log("Auth: ", auth);

//       return !!auth?.user;
//     },
//     async signIn({
//       user,
//     }: // account,
//     // profile,
//     {
//       user: IAuthUser;
//       // account: any;
//       // profile: any;
//     }) {
//       try {
//         console.log(user);

//         const existingGuest = await getGuest(user?.email || "");

//         if (!existingGuest)
//           await createGuest({
//             email: user?.email,
//             fullName: user?.name,
//           } as IGuests);

//         return true;
//       } catch {
//         return false;
//       }
//     },
//     async session({
//       session,
//     }: // user,
//     {
//       session: { user: IAuthUser };
//       // user: IAuthUser;
//     }) {
//       const guest = await getGuest(session?.user?.email || "");
//       if (guest) session.user.id = guest.id;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
// };

// export const {
//   auth,
//   signIn,
//   signOut,
//   handlers: { GET, POST },
// } = NextAuth(authConfig);

import NextAuth, {
  // DefaultSession,
  type NextAuthOptions,
  User,
  Account,
  Profile,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { IAuthUser, IGuests } from "./schemas";
import { createGuest, getGuest } from "./data-service";

const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User;
      account: Account | null;
      profile?: Profile | undefined;
      email?: { verificationRequest?: boolean } | undefined;
      credentials?: Record<string, any> | undefined;
    }) {
      try {
        // console.log(user);

        // Map User to IAuthUser
        const authUser: IAuthUser = {
          name: user.name,
          email: user.email!,
          image: user.image,
        };

        const existingGuest = await getGuest(user?.email || "");

        if (!existingGuest) {
          await createGuest({
            email: user?.email,
            fullName: user?.name,
          } as IGuests);
        }

        return true;
      } catch {
        return false;
      }
    },
    async session({
      session,
    }: // token,
    // user,
    {
      session: any;
      // token: any;
      // user: IAuthUser;
    }) {
      const guest = await getGuest(session?.user?.email || "");
      if (guest) session.user.id = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  // handlers: { GET, POST },
} = NextAuth(authConfig);

export default authConfig;

// / <reference types="next" />
// / <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//     } & DefaultSession["user"];
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     sub: string;
//   }
// }
