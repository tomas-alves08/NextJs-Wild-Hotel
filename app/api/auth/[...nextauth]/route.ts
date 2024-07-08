import NextAuth from "next-auth";
import authConfig from "@/app/_services/auth";

const { GET, POST } = NextAuth(authConfig);

export { GET, POST };
