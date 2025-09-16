// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    token: string;
  }

  interface Session {
    user: User & {
      token: string;
      id: string; // Assuming id is also part of the user object in session
    };
  }

  interface JWT {
    id: string;
    user: User;
  }
}
